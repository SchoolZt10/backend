FROM node:18.17.0-alpine as builder

WORKDIR /app

RUN npm i -D ts-node typescript @types/node
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
RUN npm install --os=linux --cpu=x64 sharp

COPY . .

RUN npm run build

FROM node:18.17.0-alpine as production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate


EXPOSE 3000