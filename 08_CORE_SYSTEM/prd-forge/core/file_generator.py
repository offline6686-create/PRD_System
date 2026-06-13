from pathlib import Path


class FileGenerator:

    def __init__(self, base_dir="generated"):
        self.base_dir = Path(base_dir)

    def create_project(self, project_name):

        project_root = self.base_dir / project_name

        folders = [
            "backend",
            "frontend",
            "config",
            "logs"
        ]

        for folder in folders:
            (project_root / folder).mkdir(
                parents=True,
                exist_ok=True
            )

        return project_root
