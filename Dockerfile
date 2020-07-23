FROM gcr.io/google-appengine/nodejs

# Bundle app source
COPY . .

EXPOSE 8080

RUN yarn install

CMD [ "yarn", "start" ]
