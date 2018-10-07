# Coherent

Zevere web app powered by Angular 6

## Getting Started

1. Run Zevere's GraphQL web API locally in a Docker container
    ```sh
    docker run --detach --publish 5000:80 zevere/webapi-borzoo:edge
    ```
1. Restore dependencies
    ```sh
    npm install
    ```
1. Run the app and navigate to <http://localhost:4200>
    ```sh
    npm start
    ```

Alternatively, you can use the Docker image:

```sh
docker run --tty --publish 8080:4000 zevere/webapp-coherent:edge
```
