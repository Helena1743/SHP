import os
from dotenv import load_dotenv

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# Load environment variables
load_dotenv()

# ⛔ DO NOT put your full URL inside getenv()
# ✅ You must put only the VARIABLE NAME
DATABASE_URL = os.getenv("postgresql+psycopg://shp_database_user:S9cC2qpSLoz09XyKH9hN2pOvcvdtlb8M@dpg-d4ft1lqdbo4c739qdqj0-a/shp_database
")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is missing")

# Create the database connection manager
engine = create_engine(DATABASE_URL)
session_local = sessionmaker(autocommit=False, bind=engine)

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()
