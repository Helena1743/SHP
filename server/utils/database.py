import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# Load environment variables
load_dotenv()

# Read the DATABASE_URL directly from .env
# Example format:
# postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL is missing. Please add it to your .env.")

# Create SQLAlchemy engine for Postgres
engine = create_engine(DATABASE_URL)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Provide a database session for request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
