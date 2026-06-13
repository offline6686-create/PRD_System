import yaml


class SystemConfig:

    def __init__(self, path):

        self.path = path

        self.data = self.load()

    def load(self):

        with open(self.path, "r") as file:

            return yaml.safe_load(file)