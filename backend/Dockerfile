FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install zod
COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]