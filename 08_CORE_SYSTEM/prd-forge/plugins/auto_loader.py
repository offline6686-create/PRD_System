import importlib
import pkgutil
from pathlib import Path
from core.logger import get_system_logger

logger = get_system_logger("AutoLoader")

class AutoLoader:
    """
    Detecta y carga dinámicamente plugins almacenados en la carpeta plugins/.
    """

    def __init__(self, plugins_dir=None):
        if plugins_dir is None:
            plugins_dir = Path(__file__).resolve().parent
        self.plugins_dir = Path(plugins_dir)

    def discover_and_load(self):
        loaded_plugins = {}
        if not self.plugins_dir.exists():
            return loaded_plugins

        for file in self.plugins_dir.glob("*.py"):
            if file.name.startswith("_"):
                continue
            module_name = f"plugins.{file.stem}"
            try:
                mod = importlib.import_module(module_name)
                loaded_plugins[file.stem] = mod
                logger.info(f"Plugin cargado exitosamente: {file.stem}")
            except Exception as e:
                logger.error(f"Error cargando plugin {file.stem}: {e}")

        return loaded_plugins