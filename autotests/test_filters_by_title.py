from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest


class TestSum(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')
        self.driver.set_page_load_timeout(10000)

    def tearDown(self):
        self.driver.quit()
        

    def test_posts_filter_by_title(self):
        driver = self.driver
        driver.get("https://starlit-rugelach-0e4523.netlify.app/posts")
        # WebDriverWait(driver, 100).until(
        #     EC.presence_of_element_located((By.CSS_SELECTOR, "button"))
        # )
        # switch filter field
        driver.find_element_by_css_selector("[data-ref='filter'] button").click()
        driver.find_element(By.CSS_SELECTOR, ".dropdown-menu > button:last-child").click()

        # input filter expression
        search_bar = driver.find_element_by_css_selector("[data-ref='filter'] input")
        search_bar.clear()
        search_bar.send_keys("aboru")
        # wait for loading indicator
        WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-ref='loading']"))
        )
        WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "table"))
        )
        tbl = driver.find_element_by_css_selector('table')
        rows = tbl.find_elements_by_tag_name('tr')
        self.assertEqual(len(rows), 3, "Should show title and 2 rows")
        # driver.close()
        

    def test_albums_filter_by_title(self):
        driver = self.driver
        driver.get("https://starlit-rugelach-0e4523.netlify.app/albums")
        # WebDriverWait(driver, 100).until(
        #     EC.presence_of_element_located((By.CSS_SELECTOR, "button"))
        # )

        # switch filter field
        driver.find_element_by_css_selector("button").click()
        driver.find_element(By.CSS_SELECTOR, ".dropdown-menu > button:last-child").click()

        # input filter expression
        search_bar = driver.find_element_by_css_selector("input")
        search_bar.clear()
        search_bar.send_keys("aboru")

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".row"))
        )
   
        cards = driver.find_elements_by_tag_name('.card')
        self.assertEqual(len(cards), 3, "Should show 3 albums")
        # driver.close()

if __name__ == '__main__':
    unittest.main()