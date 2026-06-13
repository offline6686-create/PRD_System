from engine.system_engine import SystemEngine

from config.system_config import SystemConfig


def main():

    config = SystemConfig(
        "config/profiles/trading_profile.yaml"
    )

    engine = SystemEngine(config.data)

    engine.build()


if __name__ == "__main__":

    main()