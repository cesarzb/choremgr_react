# React + Vite

This is React Vite project, which is frontend part
for my Ruby on Rails choremgr backend.
To run it, simply download the code
and build docker container using following commands:

docker build . -t choremgr_react
docker run -d --rm -p 5173:5173 choremgr_react

App will be available on http://localhost:5173
