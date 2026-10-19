# Typescript With Hexagonal Architecture

---
Boilerplate for TS backend service using hexagonal concept (port - adapter).
---

## Project Structure

```text
script/
|-- run.pm2.sh
|-- run.docker.sh
src/
|-- main.ts
|-- bootstrap.ts
|-- adapter/
|   |-- api/
|   |   |-- handler/
|   |   |   |-- user/
|   |   |   |   |-- dto.ts
|   |   |   |   |-- handler.ts
|   |   |   |-- server.ts
|   |-- repository
|   |   |-- user.ts
|   |-- shared
|   |   |-- pino.logger.ts
|   |   |-- uuid.ts
|-- domain
|   |-- user
|   |   |-- entity.ts
|   |   |-- port.ts
|   |   |-- error.ts
|   |   |-- services.ts
|-- infrastructure
|   |-- config
|   |   |-- database.ts
|   |   |-- types.ts
|   |-- kysely
|   |   |-- connection.ts
|   |   |-- schema.ts
|   |-- util
|   |   |-- common.helper.ts
```

## Execution Flow

The application enters through `./src/main.ts`, which invokes `./src/bootstrap.ts` as a factory function to instantiate and register all concrete dependency implementations.

Once initialized, incoming requests carrying this provider container are dispatched to `./src/adapter/api/server.ts`, where they are routed to their respective handlers. Each handler then executes the business logic by calling the associated service from the provider.

## Deployment
You can use Makefile to start deployment. This allowed you to deploy with Docker or PM2. Run `Make deploy-docker` for docker deployment, and `Make deploy-pm2` for PM2 deployment. Please read `./script/<related file>.sh` for git branch condition. To run with development mode just type `npm run dev`. It'll run with `tsx` locally.
