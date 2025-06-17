# EduGuard 🎓🔒

**AI-Powered LMS with Real-Time Cheating Detection**

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/HassanAbdelhamed22/EduGuard-Monorepo?style=social)](https://github.com/HassanAbdelhamed22/EduGuard-Monorepo)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/HassanAbdelhamed22/EduGuard-Monorepo/pulls)

> **EduGuard** is a smart, AI-driven Learning Management System (LMS) that ensures academic integrity during online assessments.  
> Blending a modern LMS with real-time cheating detection using computer vision, EduGuard offers a seamless and secure experience for both students and instructors.

---

## 📸 Demo

[🎬 **Watch Full Demo Video**](https://drive.google.com/file/d/1EwZKf_VV6rn2qdm_OYfcB5s6CKc4S-bS/view?usp=sharing)

---

## 🚀 Features

### 👤 Admin

- Create user accounts (Admin, Professor, Student)
- Assign roles to users
- View all users’ details
- Assign courses to professors

### 👨‍🏫 Professor

- Create and manage courses
- Upload course materials (PDFs, videos, notes)
- Set quizzes (add questions, set duration, set quiz details)
- Block students if necessary
- View registered students
- Access and review cheating reports
- Receive cheating notifications
- Receive and send notifications (e.g., quiz reminders, material uploads)

### 👨‍🎓 Student

- Register for courses
- Access course materials
- Identity verification (face recognition, open camera, capture images)
- Start and take quizzes (with proctoring)
- Receive suspicious behavior alerts in real-time
- Submit answers
- View quiz results
- Edit profile (name, email, phone, address)
- Password reset and logout

### 🤖 AI & Notification System

- Detect cheating and suspicious behavior using ML models
- Send alerts and notifications (cheating alerts, quiz reminders, material updates)
- Receive images for face recognition and convert to embeddings

### 🧠 AI-Powered Cheating Detection

- **Face Detection** – Ensures a face is visible during the quiz
- **Face Recognition Login** – Verifies the quiz taker’s identity before starting
- **Eye/Gaze Tracking** – Detects if a student is looking away
- **Head Pose Estimation** – Flags suspicious head movements
- **Object Detection** – Identifies unauthorized objects like phones or other people

---

## 🛠️ Tech Stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Frontend   | React.js, Tailwind CSS                     |
| Backend    | Laravel (PHP)                              |
| AI Models  | Python, OpenCV, Dlib, TensorFlow, and etc. |
| ML Serving | FastAPI (Python)                           |
| Database   | MySQL                                      |

---

## 🏗️ System Architecture

[![System Architecture](https://drive.google.com/uc?id=10z5Cy2EvV-cyiGN44EdYkEEzevvxrabz)](https://drive.google.com/file/d/10z5Cy2EvV-cyiGN44EdYkEEzevvxrabz/view?usp=sharing)

---

## 🔐 Why EduGuard?

- ✅ Ensures academic integrity
- 🌐 Supports remote and hybrid learning
- 🧩 Combines LMS + AI proctoring in one platform
- 🧪 Real-time cheating detection
- 📈 Instructor productivity and engagement analytics

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/EduGuard.git
cd EduGuard
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### 4. Setup AI Server

1. **Install Python dependencies**  
   Make sure you have Python 3.8+ and `pip` installed.  
   Install required packages:

   ```bash
   pip install -r requirements.txt
   ```

2. **Set environment variables**  
   Create a `.env` file in the `ml-server` directory and add any required environment variables (such as database credentials, API keys, etc.).

3. **Run the AI Server**  
   In the `ml-server` directory, start the FastAPI server with:
   ```bash
   uvicorn ML_APIs:app --host 0.0.0.0 --port 8001
   ```

---

## 📊 Future Improvements

- Add voice detection and screen capture
- Integrate with Zoom/Google Meet
- Mobile app version
- Better cheating score and report analytics

---

## 👥 Team

**Hassan Abdelhamed**  
Frontend & Backend & ML Integration  
Computer & AI Engineering, Helwan University  
[GitHub](https://github.com/HassanAbdelhamed22) | [LinkedIn](https://www.linkedin.com/in/hassanabdelhamedh22/)

**Youssef Ahmed**  
Backend & ML Integration
Computer & AI Engineering, Helwan University  
[GitHub](https://github.com/Youssef-Ahmed-k) | [LinkedIn](https://www.linkedin.com/in/youssef-ahmed-541471342/)

**Omar Sayed**  
Frontend  
Computer & AI Engineering, Helwan University 
[GitHub](https://github.com/Omar-Sayed-22) 

---
