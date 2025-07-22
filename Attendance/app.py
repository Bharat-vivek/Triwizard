import cv2
import numpy as np
import face_recognition
import os
import requests
from datetime import datetime
import time
from flask import Flask, request
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
    dir_path = "/Users/gopalagarwal/Development /Python/Attendence_TIET/images"
    encodings = np.load("encodings/encodings.npy")
    names = np.load("encodings/names.npy")
    

    cap = cv2.VideoCapture(0)

    allStudents = []

    while True:
        success, img = cap.read()
        imgc = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        imgc = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

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

            # y1, x2, y2, x1 = faceloc

            # cv2.rectangle(img, (x1, y1), (x2, y2), (0, 0, 255), 2)
            # cv2.putText(
            #     img,
            #     name + " Present",
            #     (x1 + 10, y2 - 10),
            #     cv2.FONT_HERSHEY_SIMPLEX,
            #     1,
            #     (0, 0, 255),
            #     2,
            # )

        time.sleep(5)
        print(allStudents)
        break

    cap.release()
    cv2.destroyAllWindows()
    return allStudents


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
