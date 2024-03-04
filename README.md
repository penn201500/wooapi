# wooapi

Official link: https://vipdocs.woo.org/?python#general-information

## To display two implement forms of woo API

### RESTful API

Read https://vipdocs.woo.org/?python#authentication



**🔴Note:**

```
Some API use v1, some use v3. 

For v1 API, please follow the steps to normalize request content:

1. use query string as the parameters for GET methods and body parameters for POST and DELETE methods.
2. concat query string and body parameters in an alphabetical order in query string format.
3. concat timestamp with the above result, using | as seperator.

For v3 API using request body to pass the parameters, please concatenate the timestamp, http request method, request_path and request_body as the normalized content to sign. Besides, please use application/json as Content-Type in the headers.

var signString = timestamp + method + request_path + request_body;

Put the HMAC signature in request header x-api-signature, and put timestamp in x-api-timestamp, and also api key in x-api-key.

```

If you use Python, this is an example to get signature:

``` python
import datetime
import hmac, hashlib 
import requests

staging_api_secret_key = 'xxxxxxxxxx'
staging_api_key = 'xxxxxxxxxx'

def _generate_signature(method, request_path, request_body=''):
    key = staging_api_secret_key
    key_bytes = bytes(key, 'utf-8')
    timestamp = str(round(datetime.datetime.now().timestamp() * 1000))

    # For a GET request, the request body will be an empty string
    sign_data = f"{timestamp}{method}{request_path}{request_body}"
    data_bytes = bytes(sign_data, 'utf-8')

    signature = hmac.new(key_bytes, data_bytes, hashlib.sha256).hexdigest()
    return timestamp, signature


def get_account_info():
    # HTTP method and request path for the API call
    http_method = "GET"
    request_path = "/v3/accountinfo"
    request_body = ""  # Empty for GET requests

    # Generate timestamp and signature
    milliseconds_since_epoch, signature = _generate_signature(http_method, request_path, request_body)

    headers = {
        'x-api-timestamp': milliseconds_since_epoch,
        'x-api-key': staging_api_key,
        'x-api-signature': signature,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }

    response = requests.get(f'https://api.woo.org{request_path}', headers=headers)


if __name__ == '__main__':
    get_account_info()
```

### WebSocket

## Deployment

1. Go to https://x.woo.org/en/account to get an API key.
2. Export `WOO_API_KEY`, `WOO_API_SECRET` to your .bash or .zshrc file. Source it.
3. Running server.js on a server. Install the node modules if needed.
4. Open script.js, change the value of localhost to the server ip where you deployed your server.js
`const API_SERVER = 'http://localhost:63343';`
5. Open index.html, click items to test it.