FROM node:10.15.3

RUN apt update && apt install -y vim

COPY src /opt/app

CMD ["node", "/opt/app/index.js"]
