# Todo App

## Development

### Prerequisite

- git
- yarn 1.22
- node 12+
- direnv
- docker

### Environment Variables

```
# .envrc
export SITE=http://localhost:3000
export SECRET=test
export JWT_SECRET=test
export GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
export GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
export DATABASE_URL=<YOUR_DATABASE_URL>
```

### Installation

```sh
$ yarn install
```

### Build

```sh
$ docker-compose up
$ yarn dev
```
