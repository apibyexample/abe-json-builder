abe-json-builder
================

Strips ABE spec files to JSON files containing response body only, for example:

File ``sample-post.json``
```js
{
    "description": "Sample for ABE implementations",
    "url": "/",
    "method": "POST",
    "examples": {
        "OK": {
            "description": "Sample successful POST",
            "request": {
                "queryParams": { "verbose": "0" },
                "headers": { "Content-type": "application/json" },
                "body": { "payload": "Sample" }
            },
            "response": {
                "status": 201,
                "headers": { "Content-type": "application/json" },
                "body": { "id": 1, "payload": "Sample" }
            }
        },
        "OK_2": {
            "description": "Sample successful POST",
            "request": {
                "queryParams": { "verbose": "0" },
                "headers": { "Content-type": "application/json" },
                "body": { "payload": "Another Sample" }
            },
            "response": {
                "status": 201,
                "headers": { "Content-type": "application/json" },
                "body": { "id": 2, "payload": "Another Sample" }
            }
        }
    }
}
```

Would be converted into two different files (using the file name and the example
    key to generate the new file):

    - sample-post-OK.json
    - sample-post-OK_2.json

``sample-post-OK.json``

```js
{
    "id": 1,
    "payload": "Sample"
}
```

``sample-post-OK_2.json``

```js
{
    "id": 2,
    "payload": "Another Sample"
}
```
