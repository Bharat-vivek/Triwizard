import cv2
import numpy as np
import face_recognition
import os
import requests
from datetime import datetime
import time
from flask import Flask, request, jsonify
import random

app = Flask(__name__)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
class_name = "Cyber Security"

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def takeAttendance(name):
    with open("attendance/attendance.csv", "r+") as f:
        mypeople_list = f.readlines()
        nameList = []
        for line in mypeople_list:
            entry = line.split(",")
            nameList.append(entry[0])
        if name not in nameList:
            now = datetime.now()
            datestring = now.strftime("%H:%M:%S")
            f.writelines(f"\n{name}, {datestring}, {class_name} ")

@app.route("/test")
def start_webcam():
    # Adjust the directory path to your environment
    dir_path = r"C:\Users\ASUS\OneDrive\Documents\GitHub\HW5-Team72\images"
    encodings = np.load(r"C:\Users\ASUS\OneDrive\Documents\GitHub\HW5-Team72\encodings\encodings.npy")
    names = np.load(r"C:\Users\ASUS\OneDrive\Documents\GitHub\HW5-Team72\encodings\names.npy")

    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        raise Exception("Could not open webcam.")

    allStudents = []

    while True:
        success, img = cap.read()
        if not success:
            break
        
        imgc = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        imgc = cv2.cvtColor(imgc, cv2.COLOR_BGR2RGB)

        fasescurrent = face_recognition.face_locations(imgc)
        encode_fasescurrent = face_recognition.face_encodings(imgc, fasescurrent)

        for encodeFace, faceloc in zip(encode_fasescurrent, fasescurrent):
            matches = face_recognition.compare_faces(encodings, encodeFace)
            name = "Unknown"

            if True in matches:
                roll = [102203223, 12203232, 12323323, 122300223, 102233231]
                first_match_index = matches.index(True)
                name = names[first_match_index]
                takeAttendance(name)
                details = {
                    "name": name,
                    "time": datetime.now().strftime("%H:%M:%S"),
                    "roll_no": str(roll[random.randint(0, 4)]),
                }

                allStudents.append(details)

        time.sleep(5)
        break

    cap.release()
    cv2.destroyAllWindows()
    return jsonify(allStudents)

if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
