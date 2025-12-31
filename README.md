# 🏛️ Drishti – AI-Powered Governance Intelligence Platform

**Drishti** is a full-stack web application designed to help citizens register grievances and enable authorities to track, analyze, and respond to issues efficiently.  
The project demonstrates a **modern governance-tech architecture** using a React frontend and a FastAPI backend.

This repository contains **both frontend and backend** code in a single project structure for easy submission and evaluation.

---

## 🎯 Problem Statement

Government grievance systems often suffer from:
- Manual and delayed complaint handling
- Lack of transparency for citizens
- No easy way to track complaint status
- Poor data organization for analysis

**Drishti solves this by providing a digital, structured, and scalable grievance platform.**

---

## 💡 Solution Overview

Drishti allows users to:
- Log in using a simple username
- Register grievances under predefined categories
- Automatically generate a unique complaint ID
- Track the status of previously submitted complaints
- Store and retrieve data persistently using MongoDB

The system is built to be **scalable**, **clean**, and **future-ready for AI integration**.

---

## 🧱 Tech Stack

### Frontend
- **React.js (Create React App)**
- Context API for state management
- CSS-based UI (Indian tricolour inspired)
- Responsive and clean dashboard design

### Backend
- **FastAPI (Python)**
- RESTful APIs
- MongoDB (Atlas) for persistent storage
- Uvicorn ASGI server

### Database
- **MongoDB**
- Stores complaint records with user isolation

---

## 📁 Project Structure (As-Is)


DRISHTIPROJECT/
└── drishti/
├── drishti-frontend/
│ ├── src/
│ │ ├── auth/
│ │ ├── Components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── styles/
│ ├── public/
│ ├── package.json
│ └── package-lock.json
│
├── drishti-backend/
│ ├── main.py
│ └── requirements.txt
│
├── .gitignore
└── README.md

> ⚠️ Note:  
> `node_modules` and `venv` are excluded using `.gitignore` and are not part of the repository.

---

## 🔄 Application Workflow (Step-by-Step)

1. User opens the application
2. User logs in using a **username only**
3. Dashboard is displayed with options:
   - Register Grievance
   - Track Complaint
4. User submits a grievance with:
   - Category
   - Description
   - Address
5. Backend generates a **unique Complaint ID**
6. Complaint is stored in MongoDB
7. User can track complaint status anytime using the same username

---

## 🔁 Flowchart (Judges-Friendly)

[ User ]
|
v
[ Login Page ]
|
v
[ Dashboard ]
|
+--> Register Complaint
| |
| v
| [ Backend API ]
| |
| [ MongoDB ]
|
+--> Track Complaint
|
v
[ Backend API ]
|
[ MongoDB ]



---

## 📊 Complaint Data Model

Each complaint is stored in the following structure:

```json
{
  "id": "DRS-123456",
  "username": "user1",
  "category": "Water",
  "description": "No water supply for 3 days",
  "address": "Ward 12",
  "status": "Submitted",
  "created_at": "2025-12-31T10:30:00"
}


🔐 Key Features

User-based data isolation

Persistent storage (data remains after logout)

Unique complaint ID generation

Clean and intuitive UI

Modular frontend & backend

Easy to scale for AI/ML analytics

🚀 How to Run Locally (For Evaluation)
Backend
cd drishti/drishti-backend
pip install -r requirements.txt
uvicorn main:app --reload
backend runs at --> http://127.0.0.1:8000
  
API Docs (Swagger):http://127.0.0.1:8000/docs

FRONTEND

cd drishti/drishti-frontend
npm install
npm start

FRONTEND RUNS AT :
http://localhost:3000


🔮 Future Enhancements

AI-based complaint classification

Sentiment analysis of grievances

Admin dashboard for authorities

Heatmap & analytics visualization

Predictive governance insights

🏆 Why This Project Stands Out

Real-world governance relevance

Clean full-stack architecture

Easy to explain in viva/demo

Scalable and modular design

Aligns with Digital India & Smart Governance


Aditya Karnatak

GitHub: https://github.com/ADITYAKARNATAK


