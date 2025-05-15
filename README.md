# Emotion Detection Project Setup Guide  without any external APIs

## Project Overview

This project provides a unified system for emotion detection from both text and audio reviews.  
- The **frontend** is built with React.js for submitting text reviews and uploading audio files.  
- The **backend** is built with Python (Flask or FastAPI) to handle audio transcription using Whisper and sentiment analysis using Hugging Face models.

---

## Features

- Text review input with real-time sentiment prediction.  
- Audio review upload with automatic transcription and sentiment analysis.  
- Storage of reviews with sentiment scores.  
- Responsive UI with recent reviews display.

---

## Requirements

- Python 3.8+  
- Node.js and npm  
- React.js  
- Flask or FastAPI  
- OpenAI Whisper (local) 
- Hugging Face Transformers  
- Additional Python packages (see `requirements.txt`)  

---

## Installation and Setup

### 1. Clone the repository

git clone https://github.com/Mahimatestgithub/Task5-Emotion-Detection.git

cd Task5-Emotion-Detection

### 2. Set up the backend

- Create and activate a Python virtual environment:

python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate


### Install backend dependencies:
pip install -r requirements.txt


Make sure you have ffmpeg installed on your system (required for audio processing).

Configure any necessary environment variables (like your OpenAI API key).

Run the backend server:
flask run

### 3. Set up the frontend
Navigate to the frontend folder (if applicable):
cd frontend


Install frontend dependencies:

npm install

Start the React development server:

npm start

Open http://localhost:3000 in your browser to view the app.

### 4. Usage

Submit text reviews and get instant sentiment feedback.

Upload audio files (mp3, wav, etc.) to transcribe and analyze sentiment.

View recent reviews with sentiment and emojis.

Use the Sign Out button to clear saved reviews.



