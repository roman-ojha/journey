from fastapi import FastAPI
import uvicorn
# from config.setup import settings
from config.settings import settings
from fastapi.middleware.cors import CORSMiddleware
from routes.index import router


app = FastAPI()
app.include_router(router)

# # Cors middleware
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
        uvicorn.run("main:app", port=settings.APP_PORT,
                    reload=True)
    else:
        uvicorn.run("main:app", port=settings.APP_PORT,
                    host="0.0.0.0", reload=True)
