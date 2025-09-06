# TechnoTribe

A React + TypeScript project built with Vite and TailwindCSS.

## 🚀 Getting Started

### Prerequisites
- Install **Node.js (>=18)** and npm.  
  Verify installation:
  ```bash
  node -v
  npm -v


### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd TechnoTrible-Lovable
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📦 Project Structure

* **src/** → React components, pages, and styles
* **public/** → Static assets (favicon, images, robots.txt)
* **package.json** → Dependencies and scripts
* **vite.config.ts** → Vite configuration

---

## 🛠 Tech Stack

* React + TypeScript
* Vite
* TailwindCSS
* ESLint for linting

---

## 🤝 Contributing

Feel free to fork this repo, create a new branch, and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

```
```

# 🛒 Smart Category Predictor (React + Flask)

This project is a simple **image-based category suggestion tool**.
Users can upload an image, and the system will send it to a **Flask backend API** for prediction.
The predicted category is shown along with a confidence score, and users can adjust the final selection via a dropdown.

```
```

## 📂 Project Structure

frontend/
│── src/
│   ├── App.js
│   └── components/
│       └── CategoryPredictor.js
backend/
│── app.py (Flask API for category prediction)
```

* **`App.js`** → Root React component that renders the predictor.
* **`CategoryPredictor.js`** → Handles file upload, API call to Flask, displays prediction & category dropdown.
* **Flask API (`/predict_category`)** → Expects an image file and returns predicted category + confidence score.

```

## 🚀 Features

* Upload an image (e.g., product photo).
* Send image to Flask backend using **Axios**.
* Receive predicted category & confidence.
* Pre-fills dropdown with suggested category.
* User can confirm or override prediction.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/category-predictor.git
cd category-predictor
```

### 2️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Runs on **[http://localhost:3000/](http://localhost:3000/)** by default.

### 3️⃣ Backend Setup (Flask)

```bash
cd backend
pip install flask flask-cors pillow tensorflow torch torchvision  # adjust based on your model
python app.py
```

Runs on **[http://127.0.0.1:5000/](http://127.0.0.1:5000/)**.

---

## 🔗 API Endpoint

**POST** `/predict_category`

* Input: Image file (multipart/form-data, key = `"file"`)
* Output (JSON):

```json
{
  "category": "Electronics",
  "confidence": 0.92
}
```

---

## 🖥️ Usage

1. Open **[http://localhost:3000/](http://localhost:3000/)** in browser.
2. Upload a product image.
3. Click **Predict Category**.
4. View the suggested category & confidence score.
5. Use the dropdown to confirm or choose another category.

---

## 📸 Demo UI

* Upload input field
* Predict button
* Suggested category with confidence %
* Category dropdown for user confirmation

---

## ⚡ Tech Stack

* **Frontend:** React, Axios
* **Backend:** Flask, Python (with ML/DL model for classification)
* **Styling:** Inline CSS (can extend with Bootstrap/Tailwind)

---

## 📝 Future Improvements

* Support multiple categories.
* Save final category to database.
* Improve UI with Bootstrap/Tailwind.
* Add drag-and-drop file upload.
* Deploy Flask + React to cloud (Heroku, Render, Vercel).



