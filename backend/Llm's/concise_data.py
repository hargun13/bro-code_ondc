# from PyPDF2 import PdfReader
# from dotenv import load_dotenv
# import google.generativeai as genai
# import os
# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import firestore
# import requests


# load_dotenv()  # load all our environment variables
# filepath="The Semiconductor Integrated Circuits Layout-Design Act, 2000.pdf"
# # reader = PdfReader(filepath)
# # number_of_pages = len(reader.pages)
# # page = reader.pages[0]
# # text=""
# # for page in reader.pages:
# #     text+=page.extract_text()
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# def get_gemini_response(question):
#     model = genai.GenerativeModel('gemini-pro')
#     response = model.generate_content(question)
#     return response.text

# prompt=f"{filepath} and You are content writer and you are working for my website so please extract Title, Description in detail, Category in which it falls, amendment date and the penalty if present in json format"
# response_text = get_gemini_response(prompt)
# print(response_text)

from PyPDF2 import PdfReader
from dotenv import load_dotenv
import google.generativeai as genai
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import requests
import json

# Initialize Firebase Admin SDK
cred = credentials.Certificate("ondcproject-b8d10-firebase-adminsdk-kt8cw-457fd65bc5.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
load_dotenv()
generation_config={
    "temperature":0.7,
}
safety_settings = [
    {
        "category": "HARM_CATEGORY_DANGEROUS",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(question):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(question, safety_settings=safety_settings)
    return response.text


def extract_data_and_update_firestore(doc):
    doc_data = doc.to_dict()
    pdf_title = doc_data.get('title')

    # Process extracted text using Google GenAI
    prompt = f"{pdf_title} is a law of India. You are a content writer working for a website. Please provide the Title, Description, and penalties (if present) in JSON format."
    print(pdf_title)
    response_text = get_gemini_response(prompt)

    # Extract JSON portion from response text
    start_index = response_text.find("{")
    end_index = response_text.rfind("}")
    if start_index == -1 or end_index == -1:
        print(f"Error extracting JSON from response for {pdf_title}: JSON braces not found")
        return

    json_text = response_text[start_index:end_index+1]

    # Parse the extracted JSON
    try:
        parsed_data = json.loads(json_text)
        # print(parsed_data)
    except json.JSONDecodeError:
        print(f"Error decoding JSON response for {pdf_title}: {json_text}")
        return

    # Update Firestore document with extracted data
    doc_ref = db.collection('agriculture').document(doc.id)
    doc_ref.update({
        'name': parsed_data.get('Title'),
        'description': parsed_data.get('Description'),
        'penalty': parsed_data.get('Penalties')
    })

# Fetch documents from Firestore collection
doc_ref = db.collection('agriculture')
docs = doc_ref.get()
for doc in docs:
    extract_data_and_update_firestore(doc)

