import React, { useState } from "react";
import "../CenterContainer/Container.css";

const Container = () => {
const [selectedFiles, setSelectedFiles] = useState([]);
const [selectedJobDescription, setSelectedJobDescription] = useState(null);
const [results, setResults] = useState(null); // nouveau état pour stocker les résultats

const handleFileChange = (event) => {
const files = event.target.files;
if (files.length > 0) {
const file = files[0];
setSelectedJobDescription(file);
}
};

const handleCompareClick = async () => {
console.log("handleCompareClick called");


const formData = new FormData();
if (selectedJobDescription) {
  formData.append("jd_text", selectedJobDescription);
}
for (let i = 0; i < selectedFiles.length; i++) {
  formData.append("files", selectedFiles[i]);
}

const response = await fetch("http://localhost:8000/compare", {
  method: "POST",
  body: formData,
});
const data = await response.json();
console.log(data);
setResults(data); // Mettre à jour les résultats dans l'état
};

const handleClick = () => {
console.log("Button clicked");
};

return (
<div className="container">
<div className="button-container">
<label htmlFor="job-description">Job Description (PDF only):</label>
<input type="file" id="job-description" onChange={handleFileChange} accept=".pdf" />
<input type="file" multiple onChange={(event) => setSelectedFiles(event.target.files)} accept=".pdf" />
<button className="button" onClick={handleCompareClick}>
Compare
</button>
</div>
<div>
<h2>Selected files:</h2>
<ul>
{Array.from(selectedFiles).map((file) => (
<li key={file.name}>{file.name}</li>
))}
</ul>
</div>
{results && ( // afficher les résultats si l'état est défini
<div>
<h2>Results:</h2>
<ul>
{results.top_one.map((filename, index) => (
<li key={filename}>
{filename} - similarity: {results.top_one_similarity[index]}
</li>
))}
</ul>
</div>
)}
</div>
);
};
export default Container;