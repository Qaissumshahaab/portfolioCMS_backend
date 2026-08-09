# syntax=docker/dockerfile:1

FROM node:24-alpine
WORKDIR /app/backend
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node","index.js"]


