FROM debian
COPY ./public/ /dist/
RUN ls -lha /dist/
ENTRYPOINT rm -rfv /app/ ; cp -rvT /dist/ /app/
