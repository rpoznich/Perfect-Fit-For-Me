from sys import platform
import unittest
import requests
from unittest import TestCase
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

if platform == "linux" or platform == "linux2":
    driver = webdriver.Chrome('./drivers/chromedriver_linux64')
elif platform == "darwin": # macOS
    driver=webdriver.Chrome('./drivers/chromedriver_mac64')
elif platform == "win32":
    driver=webdriver.Chrome('./drivers/chromedriver.exe')

driver.set_page_load_timeout(30)
driver.get("https://www.perfectfitfor.me/")
# driver.maximize_window()
driver.implicitly_wait(10)

class MyUnitTests (TestCase):

    # Testing nav bar onClicks
    def Test1(self):
        elements = driver.find_elements_by_class_name('nav-link')
        if not elements:
            self.fail("No nav bar elements found")
        for ele in elements:
            try:
                ele.click()
                pass
            except Exception as e:
                print(e)
                self.fail("This nav bar element is not clickable")

    # Testing Home nav bar element
    def Test2(self):
        driver.get("https://www.perfectfitfor.me/")
        try:
            driver.find_element_by_class_name("navbar-brand").click()
            pass
        except NoSuchElementException:
            self.fail("The element does not exist")