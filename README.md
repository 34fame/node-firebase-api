# Node Firebase API

## Install

1. Clone this repository

1. Run `npm` or `yarn`

1. Create a service account JSON file from the Firebase console. By default save it as `/functions/service-account.json`.

1. You need to have firebase-tools installed `npm i -g firebase-tools@8.4.1` (8.4.2 has problems)

1. Run `firebase init` and select Functions and Emulators. Install the Function emulator.

## Getting Started

1. Launch locally using `firebase serve`

1. Deploy using `firebase deploy`

## Endpoints

A "collection" is any object collection (e.g. Users, Projects, etc.). The term collection is taken from Firestore terminology.

### Get all items in a collection

```http request
GET /:collection
```

### Get a collection item by ID

```http request
GET /:collection/:collectionId
```

### Create a collection item

By default, there is no schema defined or required. The object can contain any valid JSON.

```http request
POST /:collection
Content-Type: application/json

{
   "name": "Something"
}
```

### Update a collection item

```http request
PUT /:collection/:collectionId
Content-Type: application/json

{
   "archive": true
}
```

### Delete a collection item

```http request
DELETE /:collection/:collectionId
```

## Examples

Request

```http request
GET {{baseUrl}}/projects
Accept: application/json
Cache-Control: no-cache
```

Response

```json
[
  {
    "id": "lpstt3v",
    "category": "34 Fame",
    "name": "Documentation Site",
    "icon": "fas fa-book",
    "status": "On-Hold"
  }
]
```

---

Request

```http request
POST {{baseUrl}}/projects
Accept: application/json
Content-Type: application/json
Cache-Control: no-cache

{
   "category": "34 Fame",
   "name": "Documentation Site",
   "icon": "fas fa-book",
   "status": "On-Hold"
}
```

Response

```json
{
  "id": "lpstt3v",
  "category": "34 Fame",
  "name": "Documentation Site",
  "icon": "fas fa-book",
  "status": "On-Hold"
}
```

---

Request

```http request
PUT {{baseUrl}}/projects/lpstt3v
Accept: application/json
Content-Type: application/json
Cache-Control: no-cache

{
   "status": "Open"
}

```

Response

```json
{
  "id": "lpstt3v",
  "category": "34 Fame",
  "name": "Documentation Site",
  "icon": "fas fa-book",
  "status": "Open"
}
```

---

```http request
DELETE {{baseUrl}}/projects/lpstt3v
Accept: */*
Cache-Control: no-cache

```
