FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install @angular/cli@15.0.0 -g
RUN npm install pm2 -g

COPY . .

CMD ["ng", "s", "--host", "0.0.0.0"]