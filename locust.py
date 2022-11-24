import time
from locust import HttpUser, task, between


class WebsiteUser(HttpUser):
    wait_time = between(1, 10)

    # @task
    # def index_page(self):
    #     self.client.get(url="/express_backend")

    @task
    def coffee_page(self):
        self.client.get(url="/search/:coffee")

    @task
    def tea_page(self):
        self.client.get(url="/search/:tea")

    @task
    def hello_page(self):
        self.client.get(url="/hello")
