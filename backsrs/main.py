from fastapi import FastAPI, UploadFile, File
from typing import List
from models import get_HF_embeddings, cosine
import pdfplumber

app = FastAPI()
@app.post("/compare")
async def compare_resume_to_jd(jd_text: str, files: List[UploadFile] = File(...)):
    # Get the embeddings of the job descriptio
    jd_embedding = get_HF_embeddings(jd_text)

    # Extract text from each file and get its embeddin

    file_embeddings = []
    for file in files:
        with pdfplumber.open(file.file) as pdf:
            pages = pdf.pages
            text = ""
            for page in pages:
                text += page.extract_text()
        file_embedding = get_HF_embeddings(text)
        file_embeddings.append(file_embedding)

    # Compute the cosine similarity between the job description and each file's embedding
    similarities = cosine(file_embeddings, jd_embedding)

    # Sort the similarities in descending order and get the indices of the top three files
    top_three_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:1]

    # Get the filenames and similarities of the top three files
    top_one_filenames = [files[i].filename for i in top_three_indices]
    top_one_similarities = [similarities[i] for i in top_three_indices]

    return {'top_one': top_one_filenames, 'top_one_similarity': top_one_similarities}