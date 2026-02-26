import urllib.request
import json
import os

os.makedirs('assets', exist_ok=True)

# Download dummy TFLite model from google-coral test data
model_url = "https://github.com/google-coral/test_data/raw/master/mobilenet_v1_1.0_224_quant.tflite"

req = urllib.request.Request(model_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    with open("assets/indian_food.tflite", 'wb') as f:
        f.write(response.read())

# Generate dummy labels
labels = [f"Food {i}" for i in range(1001)]
indian_foods = ["Dal Makhani", "Dhokla", "Paneer Tikka", "Samosa", "Idli", "Dosa", "Gulab Jamun", "Butter Chicken", "Palak Paneer", "Chole Bhature"]

for i in range(len(indian_foods)):
    labels[i] = indian_foods[i]

with open("assets/food_labels.json", "w") as f:
    json.dump(labels, f)

print("Downloaded dummy model and created 1001 dummy labels in assets/")
