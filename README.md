# 💬 Microservices with Kafka and Nest.js

This repository contains a microservices project built with Nest.js, utilizing Kafka for event-driven communication between services. 

The project consists of three microservices: `api-gateway`, `billing`, and `auth`. The services collaborate to handle the order creation and billing process, with authentication performed by the `auth` service.

## Folder Structure

```
root
├── api-gateway
│ ├── app.controller.ts
│ ├── app.service.ts
│ ├── app.module.ts
│ ├── main.ts
│ ├── events
│ ├── dtos
│ └── types
├── billing
│ ├── ...
└── auth
│ ├── ...
├── ...
```
- `api-gateway`: Contains the files related to the API gateway microservice.
- `billing`: Contains the files related to the billing microservice.
- `auth`: Contains the files related to the authentication microservice.

## How It Works

1. The `api-gateway` service exposes an endpoint to create an order.
2. Upon receiving the order creation request, the `api-gateway` emits an event indicating the order creation.
3. The `billing` service listens to the order creation event using a Kafka event pattern and handles the order processing.
4. To authenticate the user before billing, the `billing` service sends a message to the `auth` service, requesting user authentication.
5. The `auth` service checks if the user exists and returns the associated Stripe ID if authentication is successful.
6. The `billing` service subscribes to the response from the `auth` service and continues with the billing process.
7. Finally, the billing status or result is returned to the `api-gateway` service, which provides the response to the original order creation request.

## Getting Started

To run the microservices locally, follow these steps:

1. Go to <a href="https://github.com/obsidiandynamics/kafdrop">Kafdrop</a> and run the command
    ```bash
    $ git clone https://github.com/obsidiandynamics/kafdrop.git
    ```

2. Navigate into the directory and start the docker container
    ```
    $ cd docker-compose/kafka-kafdrop
    $ docker-compose up -d
    ```
3. Clone this repository:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

4. Run the command to build and start all 3 microservices:
    ```bash
    docker-compose up -d --build
    ```

5. Ensure that all containers are running properly and that no services are experiencing downtime.

6. Send a `POST` request with the following payload to `localhost:3000`
    ```json
    {
        "userId": "18525",
        "price": 74.99
    }
    ```
7. You should see a response being logged in the billing microservice console. Alternatively you can run:

    ```bash
    docker logs demo-nestjs-kafka-microservices-billing-1
    ```

8. Once done, to stop all containers without removing them, run the command
    ```bash
    docker stop $(docker ps -q)
    ```
## Debugging

Microservices listening to Kafka containers:

> Important: users will need make sure microservices in docker-compose.yml are on the same network as Kafka

Note that if users want to run the microservices locally without Docker, they will need to replace the current broker internal advertised listener `kafka:29092` with the external listener `localhost:9092`.

Setup references:
https://stackoverflow.com/questions/58188820/cant-connect-to-kafka-docker-container-from-another-docker-container