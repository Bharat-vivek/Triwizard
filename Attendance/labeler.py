import easyocr

# Create a reader object for the desired languages
reader = easyocr.Reader(['en'])

# Load the image and perform OCR
def scan(image_path):
  # for i in path:
  #   image_path = f
    results = reader.readtext(image_path)

# Extract and print the text
    for result in results:
      return result[1]
    # print(result[1])
