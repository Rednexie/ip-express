
IP API
The IP API is a simple Node.js-based API that allows your clients to retrieve IP address information. It provides different endpoints for retrieving the IP address in various formats. This guide will explain how to use the API in a client-side application.

API Endpoints
The API provides the following endpoints:

"/text": This endpoint returns the IP address as plain text. You can access this endpoint by sending an HTTP GET request to the "/text" path.

"/json": This endpoint returns the IP address as a JSON object. The JSON object contains a single key-value pair where the key is "ip" and the value is the IP address. You can access this endpoint by sending an HTTP GET request to the "/json" path.

"/json/<variable>": This endpoint allows you to customize the variable name in the JSON response. Replace <variable> in the path with your preferred variable name. The response will be a JSON object with your specified variable name as the key and the IP address as the value. You can access this endpoint by sending an HTTP GET request to the "/json/<variable>" path.

I also covered the usage in vanilla javascript, see [usage.js]https://github.com/Rednexie/ip/blob/main/usage.js.
