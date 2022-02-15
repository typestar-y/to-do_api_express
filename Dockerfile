FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -q
COPY . ./
RUN npm run build


FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache tzdata~=2021e-r0 && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata
COPY package*.json ./
RUN npm install -q --only=production
COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]