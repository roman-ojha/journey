FROM python:3.10.5

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8008 

# CMD ["python","manage.py","runserver"]
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:8008"]