from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import argparse
import os

parser = argparse.ArgumentParser(
    description="Vehicle Recommendation Service")
# Adding an optional argument
parser.add_argument('--env', type=str,
                    help="Environment to run the service in. Value: 'dev' or 'prod'")
args = parser.parse_args()

if args.env != 'dev' and args.env != 'prod':
    raise ValueError(
        "Please specify an environment --env flag to run the server")
elif args.env == 'dev':
    load_dotenv(os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env.dev'))


class Settings(BaseSettings):
    # APP_PORT: int = os.environ.get(
    #     "VEHICLE_RECOMMENDATION_SERVICE_PORT")
    APP_PORT: int = 8009
    CORS_ORIGIN: list = ["*"]
    MERCHANT_V_AND_T_SERVICE_DB_URL: str = os.environ.get(
        "MERCHANT_V_AND_T_SERVICE_DATABASE_URL")
    APP_ENVIRONMENT: str = args.env


settings = Settings()
