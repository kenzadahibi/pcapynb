from fastapi import FastAPI, UploadFile, File
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from models import get_HF_embeddings, cosine
import pdfplumber

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

print('helloworld')

@app.post("/compare")
async def compare_resume_to_jd(jd_text: UploadFile, files: List[UploadFile] = File(...)):
    print(f"Received jd_text: {jd_text.filename}")
    print(f"Received files: {[file.filename for file in files]}")

    # Get the embeddings of the job description
    if jd_text.content_type == 'application/pdf':
        # If jd_text is a PDF file, extract its text and get its embedding
        with pdfplumber.open(jd_text.file) as pdf:
            pages = pdf.pages
            text = ""
            for page in pages:
                text += page.extract_text()
        jd_embedding = get_HF_embeddings(text)
    else:
        return {'error': 'Invalid job description file type. Only PDF files are accepted.'}

    # Extract text from each file and get its embedding
    file_embeddings = []
    for file in files:
        if file.content_type == 'application/pdf':
            with pdfplumber.open(file.file) as pdf:
                pages = pdf.pages
                text = ""
                for page in pages:
                    text += page.extract_text()
            file_embedding = get_HF_embeddings(text)
            file_embeddings.append(file_embedding)

    if not file_embeddings:
        return {'error': 'No PDF files were provided.'}

    # Compute the cosine similarity between the job description and each file's embedding
    similarities = cosine(file_embeddings, jd_embedding)

    # Sort the similarities in descending order and get the indices of the top three files
    top_three_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:1]

    # Get the filenames and similarities of the top three files
    top_one_filenames = [files[i].filename for i in top_three_indices]
    top_one_similarities = [similarities[i] for i in top_three_indices]

    return {'top_one': top_one_filenames, 'top_one_similarity': top_one_similarities}