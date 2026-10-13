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
|   |   |-- provider.ts
|   |   |-- types.ts
|   |-- kysely
|   |   |-- connection.ts
|   |   |-- schema.ts
|   |-- util
|   |   |-- common.helper.ts
```

## Execution Flow

The application enters through `./src/main.ts`, which invokes `./src/infrastructure/config/provider.ts` as a factory function to instantiate and register all concrete dependency implementations.

Once initialized, incoming requests carrying this provider container are dispatched to `./src/adapter/api/server.ts`, where they are routed to their respective handlers. Each handler then executes the business logic by calling the associated service from the provider.
