# backend/image_upload_processing/app.py

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import time
import shutil
import os

app = FastAPI()

UPLOAD_DIR = "uploads"

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Simulate AI processing time
    time.sleep(30)
    
    # For demonstration, returning a static video URL
    video_url = "https://example.com/generated-video.mp4"
    
    return JSONResponse(content={"url": video_url})
