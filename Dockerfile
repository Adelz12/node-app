FROM node:22-bullseye-slim AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start-dev"]

FROM base AS production
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
