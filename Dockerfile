FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .

# EXPOSE 5173

CMD ["node", "src/main.jsx"]

# command to run in terminal
# docker run -d --rm -p 5173:5173 --name react_container choremgr_react_container
# app will be available on http://localhost:5173