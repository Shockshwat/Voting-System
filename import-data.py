import json
import os
import progressbar
import time
from tkinter.filedialog import askopenfile

# Always work relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)


class Candidate:
    def __init__(self, name):
        self.name = str(name)
        self.votes = 0


class Post:
    def __init__(self, post):
        post = str(post).replace("\n", "").strip()
        Candidate1 = Candidate(
            input(f"Enter the name of first candidate for the post {post}: ")
        )

        Candidate2 = Candidate(
            input(f"Enter the name of second candidate for the post {post}: ")
        )
        print("\n")
        self.post = post

        self.candidates = [
            {"name": Candidate1.name.strip(), "votes": Candidate1.votes},
            {"name": Candidate2.name.strip(), "votes": Candidate2.votes},
        ]

    def get_details(self):
        return {"post": self.post, "candidates": self.candidates}


# Ensure output folder exists and write to the path used by the web app
output_path = os.path.join(BASE_DIR, "templates", "Data")
os.makedirs(output_path, exist_ok=True)
dest_file = os.path.join(output_path, "Data.json")

with askopenfile(mode="r", filetypes=[("Text Files", "*.txt")]) as f:
    with open(dest_file, "w+", encoding="utf-8") as f1:
        list_obj = []
        for line in f.readlines():
            post = Post(f"{line}")
            list_obj.append(post.get_details())
        json.dump(list_obj, f1, indent=2)
print("Data imported successfully, exporting in JSON format...")

for _ in progressbar.progressbar(range(100)):
    time.sleep(0.02)
print("Data exported successfully to templates/Data/Data.json\nPress Enter to Quit...")
input()
