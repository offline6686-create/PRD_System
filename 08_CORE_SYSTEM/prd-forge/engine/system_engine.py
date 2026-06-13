from modules.trading_system import TradingModule
from modules.dashboard_system import DashboardModule
from core.file_generator import FileGenerator


class SystemEngine:

    def __init__(self, config):

        self.config = config

        self.modules = []

    def load_modules(self):

        for module in self.config["modules"]:

            if module == "trading":

                self.modules.append(
                    TradingModule()
                )

            elif module == "dashboard":

                self.modules.append(
                    DashboardModule()
                )

    def build(self):

        print("\n[PRD-FORGE] Loading modules...\n")

        project_name = self.config.get(
            "system_name",
            "GeneratedSystem"
        )

        generator = FileGenerator()

        generator.create_project(
            project_name
        )

        self.load_modules()

        for module in self.modules:

            result = module.execute()

            print(result)

        print("\n[PRD-FORGE] SYSTEM GENERATED\n")
