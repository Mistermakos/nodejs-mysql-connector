Project for school.<br>
Page has basic crud operations for 2 types of data (users and sites), for ratings it's only CR

## stack and tech

We used both server side rendering ( for panel ), and client side rendering (for site details, index, filtering data)
<br>
<br>Database: MYSQL (Maria DB)
<br>Backend: node JS (v20.5.1) with express

### Setting app by yourself

By docker 
``` text 
docker compose up
```

### Routes

Currently only localhost:3000/api/v1/Users works and returns [] (database is currently empty on start)

### Database structure

We added file for it (look in "setup" folder)

# License
App and the whole repository, including git history are licensed under the MIT License.
