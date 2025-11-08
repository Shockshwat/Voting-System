from flask import Flask, request, jsonify, render_template, abort
import json
from typing import List, Dict, Any

app = Flask(__name__)

DATA_FILE = "templates/Data/Data.json"  # Keep existing path to avoid breaking frontend


def load_data() -> List[Dict[str, Any]]:
    """Load the voting data JSON."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_data(data: List[Dict[str, Any]]) -> None:
    """Persist the voting data JSON."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


def validate_payload(new_data: Any) -> bool:
    """Basic schema validation for incoming vote data.

    Expected format:
    [
      {
        "post": <string>,
        "candidates": [ {"name": <string>, "votes": <int>}, { ... } ]
      }, ...
    ]
    """
    if not isinstance(new_data, list):
        return False
    for entry in new_data:
        if not isinstance(entry, dict):
            return False
        if "post" not in entry or "candidates" not in entry:
            return False
        if not isinstance(entry["post"], str):
            return False
        candidates = entry["candidates"]
        if not (isinstance(candidates, list) and len(candidates) >= 2):
            return False
        for cand in candidates:
            if not isinstance(cand, dict):
                return False
            if "name" not in cand or "votes" not in cand:
                return False
            if not isinstance(cand["name"], str):
                return False
            if not isinstance(cand["votes"], int) or cand["votes"] < 0:
                return False
    return True


@app.route("/updatejson", methods=["POST"])
def update_json():
    try:
        new_data = request.get_json(force=True, silent=True)
        if not validate_payload(new_data):
            abort(400, description="Invalid payload structure")
        save_data(new_data)
        return jsonify(success=True, message="JSON data updated successfully")
    except Exception as e:
        # Log could be added here
        return jsonify(success=False, message=str(e)), 500


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getjson")
def get_json():
    try:
        return jsonify(load_data())
    except FileNotFoundError:
        return jsonify([])


def compute_results(data: List[Dict[str, Any]]) -> Dict[str, str]:
    """Return a mapping of post -> winner name."""
    winners = {}
    for entry in data:
        candidates = entry.get("candidates", [])
        if candidates:
            top = max(candidates, key=lambda c: c.get("votes", 0))
            winners[entry.get("post", "")] = top.get("name", "")
    return winners


@app.route("/results")
def results():
    data = load_data()
    return jsonify(compute_results(data))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
