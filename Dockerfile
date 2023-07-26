FROM node:18.12.1

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --omit=dev

RUN npm run build

USER node

CMD [ "npm", "start" ]

EXPOSE 3000
