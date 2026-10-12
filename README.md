# Typescript With Hexagonal Architecture

---
Boilerplate that I use for TS backend service using hexagonal concept (port - adapter).
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
