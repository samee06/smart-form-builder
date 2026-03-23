from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import uuid

app = Flask(__name__, static_folder="frontend", static_url_path="")
CORS(app)

FORMS_FILE = "forms.json"
RESPONSES_FILE = "responses.json"


def load_data(file):
    with open(file, "r") as f:
        return json.load(f)


def save_data(file, data):
    with open(file, "w") as f:
        json.dump(data, f, indent=2)


# Create Form
@app.route("/create-form", methods=["POST"])
def create_form():
    data = request.json
    forms = load_data(FORMS_FILE)

    form_id = str(uuid.uuid4())[:6]

    form = {
        "id": form_id,
        "title": data["title"],
        "questions": data["questions"]
    }

    forms.append(form)
    save_data(FORMS_FILE, forms)

    return jsonify({"formId": form_id})


# Get Form
@app.route("/form/<form_id>", methods=["GET"])
def get_form(form_id):
    forms = load_data(FORMS_FILE)

    for form in forms:
        if form["id"] == form_id:
            return jsonify(form)

    return jsonify({"error": "Form not found"}), 404


# Submit Response
@app.route("/submit-response", methods=["POST"])
def submit_response():
    data = request.json
    responses = load_data(RESPONSES_FILE)

    responses.append(data)

    save_data(RESPONSES_FILE, responses)

    return jsonify({"message": "Response saved"})


# Get Responses
@app.route("/responses/<form_id>", methods=["GET"])
def get_responses(form_id):
    responses = load_data(RESPONSES_FILE)

    form_responses = [r for r in responses if r["formId"] == form_id]

    return jsonify(form_responses)
@app.route("/")
def home():
    return app.send_static_file("builder.html")


if __name__ == "__main__":
    app.run(debug=True)
