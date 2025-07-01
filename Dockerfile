FROM node:18-alpine

WORKDIR /app

# Copy everything first (so schema.prisma is available)
COPY . .

# Install dependencies and generate Prisma client
RUN npm install && npx prisma generate

EXPOSE 3000

CMD ["node", "./bin/www"]
