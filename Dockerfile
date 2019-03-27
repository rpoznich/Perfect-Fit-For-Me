FROM python:3

RUN apt-get update

RUN apt-get -y install libboost-all-dev
RUN apt-get -y install libgmp-dev
RUN apt-get -y install vim
RUN apt-get -y install curl 

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

RUN apt-get -y install nodejs
RUN apt-get -y install -y build-essential


RUN pip install --upgrade pip
RUN pip --version

RUN pip install black
RUN pip install coverage
RUN pip install mypy
RUN pip install numpy
RUN pip install pylint
RUN pip install Flask 
RUN pip install awscli


CMD bash
