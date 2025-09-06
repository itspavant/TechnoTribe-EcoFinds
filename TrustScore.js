import React, { useState } from "react";

function TrustScore() {
  const [price, setPrice] = useState("");
  const [trustScore, setTrustScore] = useState(null);

  const handleCheck = async () => {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(price) })
    });

    const data = await response.json();
    setTrustScore(data.trust_score);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trust Score Checker</h2>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
      />
      <button onClick={handleCheck}>Check</button>

      {trustScore !== null && (
        <p>
          Trust Score: <strong>{trustScore}</strong>
        </p>
      )}
    </div>
  );
}

export default TrustScore;
