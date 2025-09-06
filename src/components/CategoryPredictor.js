import React, { useState } from "react";
import axios from "axios";

function CategoryPredictor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  // send image to Flask API
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/predict_category",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
      setSelectedCategory(res.data.category); // auto-fill suggestion
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Error connecting to Flask API");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "center" }}>
      <h2>🛒 Smart Category Suggestion</h2>

      {/* File upload */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <br />
      <br />

      {/* Predict button */}
      <button onClick={handleSubmit} style={{ padding: "8px 16px", cursor: "pointer" }}>
        Predict Category
      </button>

      {/* Show result */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Suggested Category:</h3>
          <p>
            {result.category} ({(result.confidence * 100).toFixed(2)}% confident)
          </p>

          {/* Dropdown pre-filled with suggestion */}
          <label>
            Choose Category:{" "}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

export default CategoryPredictor;
