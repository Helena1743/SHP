import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

load_dotenv()

# Use psycopg (NOT psycopg2)
DATABASE_URL = os.getenv("postgresql+psycopg://shp_database_user:S9cC2qpSLoz09XyKH9hN2pOvcvdtlb8M@dpg-d4ft1lqdbo4c739qdqj0-a/shp_database
")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()
