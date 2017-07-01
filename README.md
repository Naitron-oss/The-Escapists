# Escapist

A simple API that contains real escape game studio informations in Taiwan.

## Public API:

```
GET /api/v1/studios // get studio lists from DB

GET /api/v1/games // get game lists from DB
```

## User Registration and JWT authentication:

```
POST /api/v1/sign_up

{
  email: String,
  password: String
}

POST /api/v1/sign_in

{
  email: String,
  password: String
}

```

## TODO:

- User can vote up / down on games
- Add images to games and studios
