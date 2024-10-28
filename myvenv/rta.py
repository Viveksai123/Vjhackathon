from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

class MeesevaScraper:
    def __init__(self, url):
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.url = url
        self.contact_info = []

    def start(self):
        self.driver.get(self.url)
        self.driver.maximize_window()
        WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, 'contactDetails')))
        self.extract_contact_info()
        self.save_to_json('meeseva_contactus.json')
        self.driver.quit()

    def extract_contact_info(self):
        try:
            contact_sections = self.driver.find_elements(By.CLASS_NAME, 'contactDetails')
            for section in contact_sections:
                office_name = section.find_element(By.XPATH, ".//h3").text
                details = section.find_element(By.XPATH, ".//p").text
                phone = ""
                email = ""
                
                # Optional: Split details by lines to categorize phone/email if structured
                lines = details.split("\n")
                for line in lines:
                    if "Phone" in line:
                        phone = line.replace("Phone:", "").strip()
                    elif "Email" in line:
                        email = line.replace("Email:", "").strip()
                    else:
                        address = line.strip()

                contact_data = {
                    "Office Name": office_name,
                    "Address": address,
                    "Phone": phone,
                    "Email": email
                }
                self.contact_info.append(contact_data)
                print(f"Extracted: {contact_data}")

        except Exception as e:
            print(f"An error occurred while extracting contact details: {e}")

    def save_to_json(self, filename):
        try:
            with open(filename, 'w', encoding='utf-8') as json_file:
                json.dump(self.contact_info, json_file, ensure_ascii=False, indent=4)
            print(f"Data saved to {filename}")
        except Exception as e:
            print(f"An error occurred while saving to JSON: {e}")

if __name__ == "__main__":
    url = "https://ts.meeseva.telangana.gov.in/meeseva/ContactUs.html"
    scraper = MeesevaScraper(url)
    scraper.start()
