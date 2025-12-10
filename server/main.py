from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import health_prediction, authentication, users, admin

# -----------------------------------------------------------
# IMPORTANT:
# These origins MUST match exactly the frontend domain.
# Do NOT add trailing slashes.
# -----------------------------------------------------------
ORIGINS = [
    "https://wellai-shp.onrender.com",  # Frontend on Render
    "http://localhost:3000",            # Frontend local dev
    "http://localhost:8000",            # Optional local API testing
]

app = FastAPI()

# -----------------------------------------------------------
# CORS CONFIGURATION
#
# allow_credentials=True is REQUIRED for HTTP-only cookies
# (auth_token cookie from login) to be accepted & sent back.
#
# allow_origins must NOT contain "*" when credentials enabled.
# -----------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------
# ROOT CHECK
# -----------------------------------------------------------
@app.get("/")
async def root():
    return {"message": "Hello World"}

# -----------------------------------------------------------
# ROUTERS
# -----------------------------------------------------------
app.include_router(health_prediction.router)
app.include_router(authentication.router)
app.include_router(users.router)
app.include_router(admin.router)
