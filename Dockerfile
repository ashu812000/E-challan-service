FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npx prisma generate

COPY . .

EXPOSE 3000

CMD ["node", "./bin/www"]
