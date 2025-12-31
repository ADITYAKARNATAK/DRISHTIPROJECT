from fastapi.middleware.cors import CORSMiddleware


from pymongo import MongoClient
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from datetime import datetime
import uuid

app = FastAPI(title="Drishti Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# ------------------ MongoDB Connection ------------------


MONGODB_URI = "mongodb+srv://Drishti_user:Drishti123@cluster0.i2b1fyo.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGODB_URI)
db = client["drishti_db"]
complaints_collection = db["complaints"]


# ------------------ MODELS ------------------

class LoginRequest(BaseModel):
    username: str


class ComplaintRequest(BaseModel):
    username: str
    category: str
    description: str
    address: str


class Complaint(BaseModel):
    id: str
    username: str
    category: str
    description: str
    address: str
    status: str
    created_at: str


# ------------------ IN-MEMORY STORAGE ------------------
# (Later this will be replaced by MongoDB)

complaints_db: List[Complaint] = []


# ------------------ ROUTES ------------------

@app.get("/")
def root():
    return {"message": "Drishti backend is running 🚀"}


# -------- LOGIN --------

@app.post("/auth/login")
def login(data: LoginRequest):
    username = data.username.strip()

    if not username:
        return {
            "success": False,
            "message": "Username cannot be empty"
        }

    return {
        "success": True,
        "username": username,
        "message": "Login successful"
    }


# -------- SUBMIT COMPLAINT --------

@app.post("/complaints")

def submit_complaint(data: ComplaintRequest):

    sentiment, priority = analyze_complaint(data.description)

    complaint = {
        "id": "DRS-" + uuid.uuid4().hex[:8].upper(),
        "username": data.username,
        "category": data.category,
        "description": data.description,
        "address": data.address,
        "sentiment": sentiment,
        "priority": priority,
        "status": "Submitted",
        "created_at": datetime.now().isoformat()
    }

    complaints_collection.insert_one(complaint)

    return {
        "success": True,
        "complaint_id": complaint["id"],
        "sentiment": sentiment,
        "priority": priority,
        "message": "Complaint submitted successfully"
    }



# -------- GET USER COMPLAINTS --------

@app.get("/complaints/{username}")
def get_user_complaints(username: str):
    user_complaints = [
        c for c in complaints_db if c.username == username
    ]

    return {
        "count": len(user_complaints),
        "complaints": user_complaints
    }

# ------------------ AI ANALYSIS LOGIC ------------------

NEGATIVE_KEYWORDS = [
    "no", "not", "broken", "delay", "dirty",
    "problem", "issue", "bad", "worst", "fail"
]

def analyze_complaint(text: str):
    text = text.lower()

    score = 0
    for word in NEGATIVE_KEYWORDS:
        if word in text:
            score += 1

    if score >= 3:
        sentiment = "Negative"
        priority = "High"
    elif score == 2:
        sentiment = "Negative"
        priority = "Medium"
    else:
        sentiment = "Neutral"
        priority = "Low"

    return sentiment, priority
