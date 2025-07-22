import os
from PIL import Image
import numpy as np

from .attention import get_head_pose
def split_image(image_path, output_prefix):
    # Open the image
    img = Image.open(image_path)

    # Convert image to numpy array
    img_array = np.array(img)

    # Get image dimensions
    height, width, _ = img_array.shape

    # Define the grid (3x3 in this case)
    rows, cols = 2, 3

    # Calculate the height and width of each cell
    cell_height = height // rows
    cell_width = width // cols

    # Split the image into cells
    for i in range(rows):
        for j in range(cols):
            # Calculate the boundaries of the current cell
            top = i * cell_height
            bottom = (i + 1) * cell_height
            left = j * cell_width
            right = (j + 1) * cell_width

            # Extract the cell
            cell = img_array[top:bottom, left:right]

            # Convert back to image and save
            cell_img = Image.fromarray(cell)
            cell_img.save(f"output/{output_prefix}_{i}_{j}.png")
            # for i in os.listdir('output'):




# Usage
# split_image("crop.jpg", "output")