FROM node:latest

WORKDIR /app

COPY cronfile /etc/cron.d/cronfile

COPY app.js app.js

# Updating packages and installing cron
RUN apt-get update && apt-get install cron -y 

# Giving permission to crontab file
RUN chmod 0644 /etc/cron.d/cronfile

# Registering file to crontab
RUN crontab /etc/cron.d/cronfile

ENTRYPOINT [ "cron", "-f" ]