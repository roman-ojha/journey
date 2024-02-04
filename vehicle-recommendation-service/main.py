from fastapi import FastAPI
import uvicorn
# from config.setup import settings
from config.setup import Settings

app = FastAPI()
settings = Settings()


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", port=settings.APP_PORT, reload=True)
