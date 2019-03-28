
# Dockerfile - for the back-end

FROM python:3

COPY . /perfect-fit

WORKDIR /perfect-fit

RUN apt-get update

RUN pip install -r requirements.txt

ENTRYPOINT ["python"]

CMD ["back-end.py"]

