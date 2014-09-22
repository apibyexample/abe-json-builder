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

## Usage

It is expected that you are using ABE Spec's for this node module to be used, to
take a look at the Spec's take a look at the repo [here](https://github.com/apibyexample/abe-spec).

``npm install --save-dev abe-json-builder``

You will need to run the JSON Builder prior to running your tests and/or server.

Example usage (file name createfeed.js):

```js
var createFeeds = require('abe-json-builder'),
    options = {
        'verbose': false,
        'location': 'myApp/mocks/**/*',
        'build': 'www/dist/json/'
    };

createFeeds.jsonBuilder(options);

```

To execute you would then need to run

``node createfeed.js``

A suggestion would be to add this to your ``package.json`` as a script command.
