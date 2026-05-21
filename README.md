## Stack and tech

<br>Database: MYSQL (Maria DB)
<br>Backend: node JS (v20.5.1) with express

### Setting app by yourself

By docker 
``` text 
docker compose up --build
```

### Routes

Currently only localhost:3000/api/v1/Users works and returns 
[
    {
        "id": 1,
        "login": "admin",
        "password": ""
    }
]
as made by default. 

# License
App and the whole repository, including git history are licensed under the MIT License.
