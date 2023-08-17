from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)


# Define the route for updating JSON data
@app.route("/updatejson", methods=["POST"])
def update_json():
    try:
        new_data = request.json
        with open("templates/Data/Data.json", "w") as json_file:
            json.dump(
                new_data, json_file, indent=4
            )  # Write the new JSON data to the file
        response = jsonify(success=True, message="JSON data updated successfully")
        return response
    except Exception as e:
        return jsonify(success=False, message=str(e))


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getjson")
def get_json():
    with open("templates/Data/Data.json", "r") as json_file:
        json_data = json.load(json_file)
    return jsonify(json_data)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
