# #!/usr/bin/env python
# # coding: utf-8
#
# # In[2]:
#
#
# import cv2
# import numpy as np
# import os
# import easyocr
# import PIL
# # Create a reader object for the desired languages
#
# reader = easyocr.Reader(['en'])
# di = {}
#
#
#
#
#
# # Example usage
#
#
# # In[ ]:
#
#
# video_path = r"C:\Users\spars\Downloads\video1646573752.mp4"
# # output_folder = "output"
#
# # C:\Users\aravc\Documents\Zoom\2024-07-27 20.47.12 A07Arav's Zoom Meeting
#
# # In[ ]:
#
#
# import cv2
# import numpy as np
# import os
#
# x = 0
#
#
# def images_without_border(img):
#     # print(img.dtype)
#     # img = cv2.imread(r"C:\Users\aravc\Documents\Zoom\2024-07-27 20.47.12 A07Arav's Zoom Meeting\output\frame_0300.jpg")
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     _, thresh = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)
#     contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#     cnt = contours[0]
#     x, y, w, h = cv2.boundingRect(cnt)
#     crop = img[y:y + h, x:x + w]
#
#     # img_array = np.array(img)
#
#     # Get image dimensions
#     height, width, _ = crop.shape
#
#     # Define the grid (3x3 in this case)
#     rows, cols = 2, 3
#
#     # Calculate the height and width of each cell
#     cell_height = height // rows
#     cell_width = width // cols
#     image_array = []
#     # Split the image into cells
#     for i in range(rows):
#         for j in range(cols):
#             # Calculate the boundaries of the current cell
#             top = i * cell_height
#             bottom = (i + 1) * cell_height
#             left = j * cell_width
#             right = (j + 1) * cell_width
#
#             # Extract the cell
#             cell = crop[top:bottom, left:right]
#
#             # Convert back to image and save
#             cell_img = Image.fromarray(cell)
#             # cell_img.save(f'output_{i}_{j}')
#             image_array.append(cell_img)
#
#     return image_array
#
#
# # cv2.imwrite(f'cropped{x}.png',crop)
#
#
# # In[ ]:
#
#
# # images_without_border(1)
#
#
# # In[ ]:
#
#
# # from PIL import Image
# # import numpy as np
#
#
# # def split_image(img):
# #     # Open the image
# #     img = Image.open(image_path)
#
# #     # Convert image to numpy array
# #     img_array = np.array(img)
#
# #     # Get image dimensions
# #     height, width, _ = img_array.shape
#
# #     # Define the grid (3x3 in this case)
# #     rows, cols = 2, 3
#
# #     # Calculate the height and width of each cell
# #     cell_height = height // rows
# #     cell_width = width // cols
# #     image_array
# #     # Split the image into cells
# #     for i in range(rows):
# #         for j in range(cols):
# #             # Calculate the boundaries of the current cell
# #             top = i * cell_height
# #             bottom = (i + 1) * cell_height
# #             left = j * cell_width
# #             right = (j + 1) * cell_width
#
# #             # Extract the cell
# #             cell = img_array[top:bottom, left:right]
#
# #             # Convert back to image and save
# #             cell_img = Image.fromarray(cell)
# #             image_array.append(cell_img)
#
# #     return image_array
# # # Usage
# # # split_image("crop.jpg", "output")
#
#
# # In[ ]:
#
#
# def get_head_pose(image):
#     image = cv2.imread(image)
#     # for image in image_arr:
#     image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     results = face_mesh.process(image_rgb)
#
#     if results.multi_face_landmarks:
#         face_landmarks = results.multi_face_landmarks[0]
#
#         nose = face_landmarks.landmark[1]
#         left_ear = face_landmarks.landmark[234]
#         right_ear = face_landmarks.landmark[454]
#
#         nose_x = nose.x
#         left_ear_x = left_ear.x
#         right_ear_x = right_ear.x
#
#         # Determine head position
#         if nose_x + threshold < left_ear_x:
#             # print(nose,left_ear,right_ear)
#             # print("Looking Left")
#             return 0
#         elif nose_x + threshold > right_ear_x:
#             # print("nose:",nose,"Left",left_ear,"right",right_ear)
#             # print("Looking Right")
#             return 0
#         else:
#             # print(nose,left_ear,right_ear)
#             print("Looking Straight")
#             return 1
#
#     return 0
#
#
# # In[ ]:
#
#
# import easyocr
#
# # Create a reader object for the desired languages
# reader = easyocr.Reader(['en'])
#
#
# def perform_ocr(image_arr, r):
#     # Convert the image object to bytes
#     img_byte_arr = io.BytesIO()
#     image.save(img_byte_arr, format=image.format)
#     img_byte_arr.seek(0)  # Move to the start of the BytesIO object
#     # Perform OCR using the file-like object
#     results = reader.readtext(img_byte_arr)
#     di["results"] + r
#
# # In[ ]:
#
#
# # import easyocr
#
# # # Create a reader object for the desired languages
# # reader = easyocr.Reader(['en'])
#
# # # Load the image and perform OCR
# # image_path = 'output_0_.png'
# # results = reader.readtext(image_path)
#
# # # Extract and print the text
# # for result in results:
# #     print(result[1])
#
# def extract_frames(video_path):
#     # Create output folder if it doesn't exist
#     # if not os.path.exists(output_folder):
#     #     os.makedirs(output_folder)
#
#     # Open the video file
#     cap = cv2.VideoCapture(video_path)
#
#     if not cap.isOpened():
#         print("Error: Could not open video.")
#         return
#
#     # Get the frame rate of the video
#     fps = cap.get(cv2.CAP_PROP_FPS)
#
#     # Calculate the interval in frames (assuming 1 frame per second)
#     interval = int(fps)
#
#     frame_count = 0
#     saved_frame_count = 0
#
#     while True:
#       try:
#         ret, frame = cap.read()
#
#         if not ret:
#             break
#
#         if frame_count % interval == 0:
#             img_array = images_without_border(frame)
#             r = []
#             # img2_array=split_image(img)
#             for one_img in img_array:
#                 attn = get_head_pose(one_img)
#                 perform_ocr(one_img, attn)
#             # head_pose=get_head_pose(image)
#             # frame_name = os.path.join(output_folder, f"frame_{saved_frame_count:04d}.jpg")
#             # cv2.imwrite(frame_name, frame)
#             saved_frame_count += 1
#
#         frame_count += 1
#         print(di)
#       except:
#           print('Falese')
#     cap.release()
#     print(f"Extracted {saved_frame_count} frames to '{output_folder}'")
#     # return di
#
# print(extract_frames(video_path))
