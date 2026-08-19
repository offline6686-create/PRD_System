from core.logger import get_system_logger

logger = get_system_logger("ModuleRegistry")

class ModuleRegistry:
    """
    Registro centralizado de módulos generables para PRD Forge.
    """

    def __init__(self):
        self._registry = {}

    def register(self, module_name, module_class):
        self._registry[module_name.lower()] = module_class
        logger.info(f"Módulo registrado: '{module_name}'")

    def get_module(self, module_name):
        return self._registry.get(module_name.lower())

    def list_modules(self):
        return list(self._registry.keys())

# Instancia global del registro
global_registry = ModuleRegistry()