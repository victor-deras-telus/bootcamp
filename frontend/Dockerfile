# BUILDSS
# docker build -t frontend:0.1.0 .
#RUN
# docker run -d -p 3000:3000 frontend:0.1.0


FROM node:16.13.1-alpine as build

ENV REACT_APP_BACKEND_URL=http://34.133.12.103:5000/api/

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "../backend/client"]