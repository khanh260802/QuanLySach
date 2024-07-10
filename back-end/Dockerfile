FROM python:3.9
WORKDIR /app/back-end
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
# CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
