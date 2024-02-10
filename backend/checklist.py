from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()  # load all our environment variables

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def get_gemini_response(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text


@app.route('/get_response', methods=['POST'])
def get_response():
    data = request.get_json()
    prompt = data['prompt']

    response_text = get_gemini_response(prompt)

    # Remove triple backticks from the beginning and end of the response
    if response_text.startswith("```") and response_text.endswith("```"):
        response_text = response_text[3:-3]

    return jsonify({'response': response_text})


if __name__ == '__main__':
    app.run(debug=True)