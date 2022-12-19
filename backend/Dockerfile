# BUILD
# docker build -t backend:0.1.0 .
#RUN
# docker run -d -p 5000:5000 -e DATABASE_URL=postgresql://postgres:mypass@172.17.0.2:5432/postgres backend:0.1.0

FROM node:16.13.1-alpine

ENV DATABASE_URL=postgresql://postgres:mypass@172.17.0.2:5432/postgres

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "run", "prismaRun"]