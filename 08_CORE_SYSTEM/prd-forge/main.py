from engine.system_engine import SystemEngine


def main():

    config = {

        "system_name": "TradingSystem",

        "modules": [
            "trading",
            "dashboard"
        ]
    }

    engine = SystemEngine(config)

    engine.build()


if __name__ == "__main__":
    main()