# backend/app.py
import os
import traceback
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# try import Config/db if present (non-fatal)
try:
    from config import Config
    from db import engine, Base
except Exception:
    Config = type("C", (), {"PORT": 5000, "CORS_ORIGINS": ["http://localhost:5173"]})
    engine = None
    Base = None
    print("Warning: Config/db not importable (continuing).")
    traceback.print_exc()

# Create Flask app and set static_folder to the dist dir
dist_path = os.path.join(os.path.dirname(__file__), "dist")
app = Flask(__name__, static_folder=dist_path, static_url_path="")

# CORS for API routes
CORS(app, resources={r"/api/*": {"origins": Config.CORS_ORIGINS}})

# Register blueprints (safe import)
try:
    from routes.products import bp as products_bp
    app.register_blueprint(products_bp)
    print("Registered blueprint: routes.products.bp")
except Exception:
    print("Warning: could not import/register routes.products")
    traceback.print_exc()

# Try to create DB tables if engine/Base available (non-fatal)
try:
    if engine is not None and Base is not None:
        Base.metadata.create_all(bind=engine)
        print("Base.metadata.create_all() attempted")
except Exception:
    print("Warning: create_all() failed (continuing).")
    traceback.print_exc()

# API health
@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})

# Serve static files from dist automatically (Flask static handler will handle files)
# Fallback route for SPA client-side routing -> serve index.html
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_spa(path):
    # If dist folder exists and file requested exists, let Flask static serve it
    if os.path.isdir(dist_path):
        # if path maps to an actual file, Flask's static handler will serve it via send_from_directory
        file_path = os.path.join(dist_path, path)
        if path != "" and os.path.exists(file_path):
            return send_from_directory(dist_path, path)
        # otherwise serve index.html for SPA routing
        index_file = os.path.join(dist_path, "index.html")
        if os.path.exists(index_file):
            return send_from_directory(dist_path, "index.html")
    # If dist not present, give helpful message
    return jsonify({"message": "Frontend build not found. Build your frontend or run Vite dev server."}), 200

# Print registered routes for debugging
def print_routes():
    print("\n=== Registered Flask routes ===")
    for rule in sorted(app.url_map.iter_rules(), key=lambda r: (r.rule, r.endpoint)):
        methods = ",".join(sorted(rule.methods - {"HEAD", "OPTIONS"}))
        print(f"{rule.rule:40} -> {rule.endpoint:30} [{methods}]")
    print("================================\n")

if __name__ == "__main__":
    print_routes()
    port = getattr(Config, "PORT", 5000)
    app.run(host="127.0.0.1", port=port, debug=True)
