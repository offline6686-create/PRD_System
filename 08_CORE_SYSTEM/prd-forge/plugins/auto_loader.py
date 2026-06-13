import importlib
import pkgutil

import modules


def discover_modules():

    registry = {}

    for _, module_name, _ in pkgutil.iter_modules(
        modules.__path__
    ):

        imported_module = importlib.import_module(
            f"modules.{module_name}"
        )

        for attribute_name in dir(imported_module):

            attribute = getattr(
                imported_module,
                attribute_name
            )

            if isinstance(attribute, type):

                if attribute_name.endswith("Module"):

                    registry[
                        module_name.replace(
                            "_system",
                            ""
                        )
                    ] = attribute

    return registry