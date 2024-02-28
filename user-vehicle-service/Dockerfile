FROM python:3.10.5

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8007

CMD ["sh", "-c", "python main.py --env='prod'"]