FROM node
ARG configuration=staging

WORKDIR /app/
COPY . .

# restore dependencies
RUN npm install

# build client-side(browser) app
RUN npm run build -- --configuration ${configuration}

# build server-side app
RUN npm run build:ssr-only

# remove devDependencies from /app/node_modules/
RUN npm prune --production

CMD npm run serve:ssr
