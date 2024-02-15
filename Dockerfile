FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]

# command to run in terminal
# docker build . -t choremgr_react
# docker run -d --rm -p 5173:5173 choremgr_react
# app will be available on http://localhost:5173