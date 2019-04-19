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

	# Tests the search on the overall site
	def test3(self):
		search_field = self.browser.find_element_by_class_name("mr-sm-2")
		search_field.click()
		search_field.send_keys("austin")

		# might need a time/sleep here
		search_button = self.browser.find_element_by_id("submit_button")
		search_button.click()

		time.sleep(1)

		try:
			self.browser.find_element_by_id('Austin').click()
		except NoSuchElementException:
			self.fail("The element doesn't exist")

	# Tests the filtering for Jobs page
	def test4(self):
		self.browser.find_element_by_link_text('Jobs').click()

		filter_button = self.browser.find_element_by_id("filter_income") # for state
		filter_button.click()

		# might need a time/sleep here
		selection = self.browser.find_element_by_id("$$")
		selection.click()

		# might need a time/sleep here
		try:
			self.browser.find_element_by_id('Featured Jobs - Average Income $30,000 - $50,000').click()
		except NoSuchElementException:
			self.fail("The element doesn't exist")

	# Tests the sorting for the Cities page
	def test5(self):
		self.browser.find_element_by_link_text('Cities').click()

		sort_button = self.browser.find_element_by_id("sort")
		sort_button.click()

		# might need a time/sleep here
		selection = self.browser.find_element_by_id("Name=A-Z")
		selection.click()

		# might need a time/sleep here
		try:
			self.browser.find_element_by_id('Albuquerque').click()
		except NoSuchElementException:
			self.fail("The element doesn't exist")
