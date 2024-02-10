import os
import requests
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin import storage
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from google.cloud import storage

cred = credentials.Certificate("ondcproject-b8d10-firebase-adminsdk-kt8cw-457fd65bc5.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'ondcproject-b8d10.appspot.com'
})

firebase_storage = storage.bucket()
db = firestore.client()
# Replace with the actual path to your Chromedriver
chromedriver_path = r'"C:\Users\rohit\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe"'

# Create a Chrome webdriver instance with the specified Chromedriver path
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

# List to store data for each category
data_list = []

# List of categories
categories = ['grocery', 'electronics', 'food', 'beverage', 'fashion', 'agriculture']

for category in categories:
    # Open the target website with the specific category
    url = f"https://www.indiacode.nic.in/handle/123456789/1362/simple-search?page-token=f54fbec4d82a&page-token-value=a7b2f8913a489da7c1a78e583d011a70&nccharset=781964F7&location=123456789%2F1362&query={category}&rpp=100&sort_by=score&order=desc"
    driver.get(url)

    # Find and click the "View" buttons
    view_buttons = driver.find_elements(By.XPATH, "//td[@headers='t4']/a[contains(text(), 'View...')]")
    for index in range(len(view_buttons)):
        # Re-find the "View" buttons on each iteration
        view_buttons = driver.find_elements(By.XPATH, "//td[@headers='t4']/a[contains(text(), 'View...')]")

        # Capture additional information from the row
        row_data = view_buttons[index].find_element(By.XPATH, "..").find_elements(By.XPATH, "./preceding-sibling::td")
        date = row_data[0].text
        serial_number = row_data[1].text
        title = row_data[2].text
        print(title)
        # Click the "View" button using the index
        view_buttons[index].click()

        # Extract the PDF link from the page
        try:
            pdf_link_element = driver.find_element(By.XPATH, "//a[contains(@href, '.pdf')]")
            pdf_link = pdf_link_element.get_attribute("href")
            response = requests.get(pdf_link)
            
            if response.status_code == 200:
                # Save the PDF temporarily
                with open('temp.pdf', 'wb') as f:
                    f.write(response.content)
           
            # Store data in a dictionary
            lob = firebase_storage.blob(f'{category}/{title}.pdf')
            lob.upload_from_filename('temp.pdf')
            
            category_data = {
                'Category': category,
                'Date': date,
                'Serial Number': serial_number,
                'Title': title,
                'PDF Link': pdf_link
            }
            
            doc_ref = db.collection(category).document()
            doc_ref.set({
                'date': date,
                'serial_number': serial_number,
                'title': title,
                'pdf_link': pdf_link,
                'firebase_storage_url': lob.public_url
            })

            # Append dictionary to the list
            data_list.append(category_data)

        except Exception as e:
            print(f"Error extracting PDF link for {category}: {str(e)}")

        # Go back to the previous page to continue clicking other "View" buttons
        driver.back()

# Close the browser window
driver.quit()

os.remove('temp.pdf')