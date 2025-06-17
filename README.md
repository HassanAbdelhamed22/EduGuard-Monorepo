# EduGuard 🎓🔒

**AI-Powered LMS with Real-Time Cheating Detection**

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/your-username/EduGuard?style=social)](https://github.com/your-username/EduGuard)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/EduGuard/pulls)

> **EduGuard** is a smart, AI-driven Learning Management System (LMS) that ensures academic integrity during online assessments.  
> Blending a modern LMS with real-time cheating detection using computer vision, EduGuard offers a seamless and secure experience for both students and instructors.

---

## 📸 Demo

<!-- Add your demo video link or GIFs/screenshots here -->

![Demo GIF](https://your-demo-gif-link.com)

---

## 🚀 Features

### 🧑‍🏫 For Instructors

- Upload lectures, notes, and resources
- Create and manage quizzes
- Monitor student activity with AI proctoring
- Receive cheating alerts and logs

### 👨‍🎓 For Students

- Login with face recognition
- Attend lectures and access materials
- Take proctored quizzes securely
- Real-time feedback and results

### 🧠 AI-Powered Cheating Detection

- **Face Detection** – Ensures a face is visible during the quiz
- **Face Recognition Login** – Verifies the quiz taker’s identity before starting
- **Eye/Gaze Tracking** – Detects if a student is looking away
- **Head Pose Estimation** – Flags suspicious head movements
- **Object Detection** – Identifies unauthorized objects like phones or other people

---

## 🛠️ Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | React.js, Tailwind CSS                                   |
| Backend    | Laravel (PHP)                                            |
| AI Models  | Python, OpenCV, Dlib, TensorFlow                         |
| ML Serving | FastAPI (Python)                 
| Database   | MySQL                                                    |


---

## 🏗️ System Architecture

```mermaid
graph LR
  A[User] --> B[React Frontend]
  B --> C[Laravel Backend API]
  C --> D[MySQL Database]
  C --> E[AI Model APIs (Python)]
  E --> F[Face Detection, Gaze, Pose, Object Detection]
```

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

```bash
cd ml-server
# Install dependencies
# Run Flask or FastAPI server
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
Frontend & ML Integration  
Computer & AI Engineering, Helwan University  
[GitHub](https://github.com/your-username) | [LinkedIn](https://linkedin.com/in/your-linkedin)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 💬 Acknowledgements

- Thanks to open-source AI libraries and contributors
- Inspired by the need for secure and fair online learning during the pandemic and beyond

---

<!--
Would you like to:
- Add a specific demo GIF or video section?
- Include badges (e.g., GitHub stars, license)?
- Write a short abstract or tagline for GitHub display?
Let me know and I’ll tailor it even more.
-->
