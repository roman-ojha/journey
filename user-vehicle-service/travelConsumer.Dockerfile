# Dockerfile for the consumer service to add newly added vehicle into dataset

FROM python:3.10.5

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["sh", "-c", "python travel_consumer.py --env='prod'"]