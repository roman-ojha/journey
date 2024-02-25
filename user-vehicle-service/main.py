from fastapi import FastAPI
import uvicorn
# from config.setup import settings
from config.settings import settings
from fastapi.middleware.cors import CORSMiddleware
from routes.index import router
from config.messageBroker import setup as setup_message_broker

app = FastAPI()
app.include_router(router)
setup_message_broker()

# Cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGIN,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/")
# async def root():
#     return {"message": "Hello World"}


if __name__ == "__main__":
    if settings.APP_ENVIRONMENT == 'dev':
        uvicorn.run("main:app", port=settings.APP_PORT, reload=True)
    else:
        uvicorn.run("main:app", port=settings.APP_PORT)
    # uvicorn.run("main:app", port=settings.APP_PORT)
