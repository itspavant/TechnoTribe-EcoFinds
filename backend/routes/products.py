# backend/routes/products.py
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import SQLAlchemyError

from db import get_db
from models import Product

bp = Blueprint("products", __name__, url_prefix="/api/products")

def serialize_product(p: Product) -> dict:
    return {
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "price": float(p.price) if p.price is not None else 0.0,
        "image_url": p.image_url,
        "category": p.category,
        "stock": p.stock,
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }

@bp.get("/")
def list_products():
    db = next(get_db())
    try:
        q = db.query(Product)
        search = request.args.get("q")
        if search:
            like = f"%{search}%"
            q = q.filter(Product.title.ilike(like) | Product.description.ilike(like))
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 20))
        items = q.order_by(Product.id.desc()).offset((page-1)*limit).limit(limit).all()
        return jsonify({"items": [serialize_product(i) for i in items], "page": page, "limit": limit}), 200
    finally:
        db.close()

@bp.get("/<int:product_id>")
def get_product(product_id: int):
    db = next(get_db())
    try:
        p = db.get(Product, product_id)
        if not p:
            return jsonify({"message": "Product not found"}), 404
        return jsonify(serialize_product(p)), 200
    finally:
        db.close()

@bp.post("/")
def create_product():
    db = next(get_db())
    try:
        payload = request.get_json(force=True, silent=True) or {}
        if "title" not in payload or "price" not in payload:
            return jsonify({"message": "Missing title or price"}), 400
        p = Product(
            title=str(payload.get("title")).strip(),
            description=payload.get("description"),
            price=payload.get("price", 0),
            image_url=payload.get("image_url"),
            category=payload.get("category"),
            stock=int(payload.get("stock", 0)),
        )
        db.add(p)
        db.commit()
        db.refresh(p)
        return jsonify(serialize_product(p)), 201
    except (ValueError, SQLAlchemyError) as e:
        db.rollback()
        return jsonify({"message": "Failed to create product", "error": str(e)}), 400
    finally:
        db.close()

@bp.put("/<int:product_id>")
def update_product(product_id: int):
    db = next(get_db())
    try:
        p = db.get(Product, product_id)
        if not p:
            return jsonify({"message": "Product not found"}), 404
        payload = request.get_json(force=True, silent=True) or {}
        for key in ["title", "description", "price", "image_url", "category", "stock"]:
            if key in payload:
                setattr(p, key, payload[key])
        db.commit()
        db.refresh(p)
        return jsonify(serialize_product(p)), 200
    except (ValueError, SQLAlchemyError) as e:
        db.rollback()
        return jsonify({"message": "Failed to update product", "error": str(e)}), 400
    finally:
        db.close()

@bp.delete("/<int:product_id>")
def delete_product(product_id: int):
    db = next(get_db())
    try:
        p = db.get(Product, product_id)
        if not p:
            return jsonify({"message": "Product not found"}), 404
        db.delete(p)
        db.commit()
        return jsonify({"message": "Deleted"}), 200
    except SQLAlchemyError as e:
        db.rollback()
        return jsonify({"message": "Failed to delete product", "error": str(e)}), 400
    finally:
        db.close()
