import os
import firebase_admin
from firebase_admin import credentials, storage, firestore
import psycopg2
from transformers import pipeline, AutoTokenizer
import fitz  # PyMuPDF library for PDF text extraction
import requests
# import PyPDF2

# Initialize Firebase Admin SDK
cred = credentials.Certificate("ondcproject-b8d10-firebase-adminsdk-kt8cw-457fd65bc5.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Initialize Firebase Storage
# firebase_storage = storage.bucket()

# Initialize PostgreSQL connection
conn = psycopg2.connect(
    database='compliance_data',
    user='compliance_data_user',
    password='1wKmZBGvyYG3I3LhE1C6p22DxI7JrK6c',
    host='dpg-cmr2civ109ks73ffhk6g-a.oregon-postgres.render.com',
    port=5432  # default port number
)
cursor = conn.cursor()

# Function to generate summary using LLama2 model
def generate_llama_summary(text):
    model_name = 'meta-llama/Llama-2-7b-chat-hf'
    model = pipeline('text-generation', model=model_name, token='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')
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)
    summary = model.generate(**inputs)
    decoded_summary = tokenizer.decode(summary[0], skip_special_tokens=True)
    return decoded_summary

# Function to extract text from PDF using PyMuPDF
def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with fitz.open(pdf_path) as pdf_document:
            for page_number in range(pdf_document.page_count):
                page = pdf_document[page_number]
                text += page.get_text()
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
    return text

# Function to fetch and extract PDF content from Firestore
def fetch_and_extract_pdf_content(collection_name):
    try:
        # Get a reference to the collection
        collection_ref = db.collection(collection_name)

        # Fetch all documents from the collection
        docs = collection_ref.stream()

        # Iterate through documents
        for doc in docs:
            data = doc.to_dict()
            print(data)
            pdf_link = data.get('firebase_storage_url')
            if pdf_link:
                # Download the PDF file
                response = requests.get(pdf_link)
                if response.status_code == 200:
                    print("Downloaded PDF successfully.")

                    # Save the PDF file locally
                    with open('temp.pdf', 'wb') as f:
                        f.write(response.content)

                    # Extract text from the PDF
                    pdf_content = extract_text_from_pdf('temp.pdf')

                    # Pass PDF content through LLama2 model to generate summary
                    pdf_summary = generate_llama_summary(pdf_content)

                    # Store data in PostgreSQL database
                    insert_query = """
                    INSERT INTO pdf_data (category, title, pdf_link, summary)
                    VALUES (%s, %s, %s, %s)
                    """
                    cursor.execute(insert_query, (collection_name, doc.id, pdf_link, pdf_summary))
                    conn.commit()

                    print(f"Processed PDF for {collection_name}/{doc.id}")

                else:
                    print(f"Failed to download PDF from {pdf_link}")
            else:
                print(f"No PDF link found for document {doc.id}")

    except Exception as e:
        print(f'Error fetching and extracting PDF content: {str(e)}')

# Function to process all PDFs in all categories
def process_all_categories():
    categories = ['grocery', 'electronics', 'food', 'beverage', 'fashion', 'agriculture']

    for category in categories:
        fetch_and_extract_pdf_content(category)

# Example usage:
process_all_categories()

# Close PostgreSQL connection
cursor.close()
conn.close()
