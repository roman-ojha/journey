FROM python:3.10.5

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8004

CMD ["sh", "-c", "python manage.py migrate --database=administrator && python manage.py runserver 0.0.0.0:8004"]