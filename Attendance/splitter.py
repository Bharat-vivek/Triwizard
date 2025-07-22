import cv2
import os


def extract_frames(video_path, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open the video file
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    # Get the frame rate of the video
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Calculate the interval in frames (assuming 1 frame per second)
    interval = int(fps)

    frame_count = 0
    saved_frame_count = 0

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        if frame_count % interval == 0:
            frame_name = os.path.join(output_folder, f"frame_{saved_frame_count:04d}.jpg")
            cv2.imwrite(frame_name, frame)
            saved_frame_count += 1

        frame_count += 1

    cap.release()
    print(f"Extracted {saved_frame_count} frames to '{output_folder}'")


# Example usage
video_path = r"C:\Users\spars\Downloads\video1646573752.mp4"

output_folder = 'frames'

# C:\Users\aravc\Documents\Zoom\2024-07-27 20.47.12 A07Arav's Zoom Meeting
extract_frames(video_path, output_folder)