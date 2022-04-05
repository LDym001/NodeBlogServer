FROM node

WORKDIR /vueproject/blogproject/blogserver

COPY package.json ./
COPY src ./src
COPY utls ./utls
COPY database ./database
COPY mongo ./mongo
COPY static ./static

RUN npm install

EXPOSE 3000

CMD ["node","src"]