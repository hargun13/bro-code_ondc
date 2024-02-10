from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from flask_cors import CORS
import requests
from io import BytesIO
from langchain.memory import ConversationBufferMemory

app = Flask(__name__)

pdf_url = None
conversation = None
CORS(app)


def get_pdf_text(pdf_url):
    # Fetch the PDF from the URL
    response = requests.get(pdf_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch PDF from URL")

    # Read PDF content
    pdf_content = BytesIO(response.content)

    # Extract text from the PDF
    pdf_reader = PdfReader(pdf_content)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def save_pdf_url(pdf_url):
    with open('pdf_url.txt', 'w') as f:
        f.write(pdf_url)

def load_pdf_url():
    with open('pdf_url.txt', 'r') as f:
        return f.read().strip()


def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks


def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore


def get_conversation_chain(vectorstore):
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory  # You can add memory if needed
    )
    return conversation_chain



@app.route('/upload_pdf_url', methods=['POST'])
def upload_pdf_url():
    global pdf_url
    pdf_url = request.json.get('pdf_url')
    save_pdf_url(pdf_url)
    print(pdf_url)
    return jsonify({'message': 'PDF URL received successfully'})


@app.route('/start_conversation', methods=['GET'])
def start_conversation():
    global pdf_url, conversation
    pdf_url = load_pdf_url()
    if pdf_url is None:
        return jsonify({'error': 'PDF URL not provided'}), 400

    raw_text = get_pdf_text(pdf_url)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)
    conversation = get_conversation_chain(vectorstore)

    return jsonify({'message': 'Conversation chain started successfully'})


@app.route('/chat', methods=['POST'])
def chat():
    global conversation
    if conversation is None:
        return jsonify({'error': 'Conversation chain not initialized'}), 400

    user_question = request.json.get('question')
    response = conversation({'question': user_question})

    # Extract content from AIMessage if present
    print(response['answer'])


    return jsonify({'response': response['answer']})


if __name__ == "__main__":
    app.run(debug=True)





# def get_pdf_text(pdf_url):
#     # You might want to use a library like requests to fetch the PDF from the URL
#     # For simplicity, assuming the PDF is already fetched
#     pdf_reader = PdfReader(pdf_url)
#     text = ""
#     for page in pdf_reader.pages:
#         text += page.extract_text()
#     return text
    

    # @app.route('/chat', methods=['POST'])
# def chat():
#     global conversation
#     if conversation is None:
#         return jsonify({'error': 'Conversation chain not initialized'}), 400
#
#     user_question = request.json.get('question')
#     response = conversation({'question': user_question})
#     chat_history = response['chat_history']
#
#     return jsonify({'response': chat_history})
    

    # def upload_pdf_url():
#     global pdf_url
#     pdf_url = request.json.get('pdf_url')
#     print(pdf_url)
#     return jsonify({'message': 'PDF URL received successfully'})


# @app.route('/start_conversation', methods=['GET'])
# def start_conversation():
#     global pdf_url, conversation
#     if pdf_url is None:
#         return jsonify({'error': 'PDF URL not provided'}), 400
#
#     raw_text = get_pdf_text(pdf_url)
#     text_chunks = get_text_chunks(raw_text)
#     vectorstore = get_vectorstore(text_chunks)
#     conversation = get_conversation_chain(vectorstore)
#
#     return jsonify({'message': 'Conversation chain started successfully'})