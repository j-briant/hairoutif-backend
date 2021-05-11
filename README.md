# About
A learning project about web-mapping, hair dressers and puns. This project is divided into two sub divisions: 
- the present repository hosts the backend of the project.
- the frontend can be found at https://github.com/j-briant/hairoutif-frontend.

No pretention whatsoever, this repository has no fundamental purpose for the global march of the world. You might just find here a beginning of structure for a similar project. You can try to clone and run this project but I won't help you, because there is no point and also I don't want to.
The stack is developped using Node.js, PostgreSQL and Redis.
## 1. Node.js
Make sure you have Node and npm installed by entering:
```shell
sudo apt-get install nodejs
```

npm should come with it, verify that npm is installed:
```shell
npm -v
```

and update to the latest version:
```shell
npm install npm@latest -g
```

## 2. Redis
Redis is used as cache within the app. More information on [https://redis.io/](https://redis.io/).
This should be straigthforward. First download and make the install:
```shell
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
```

Sometimes Tcl is missing or not up-to-date:
```shell
sudo apt-get install tcl
```

# Install
1. Go into the cloned folder and type in your terminal:
```shell
npm install
```
This should trigger the installation of the npm repositories mentionned in the package.json file.

2. Then create a ".env" file using the ".env.example" provided.

# Usage
The architecture consist of 2 main things:
1. The database server
2. The node server

The database server is your PostGres server.
Once the install is succesful, you can start the backend server by typing in your terminal:
```shell
redis-server & npm start
```

Hopefully, no errors!
Then you can visit [http://localhost:5000/locations/desc/1](http://localhost:5000/locations/desc/1) or request the API:
```shell
curl http://localhost:5000/locations/desc/1
```

<img src="https://ih1.redbubble.net/image.1323559437.3240/pp,840x830-pad,1000x1000,f8f8f8.jpg" alt="aw yiss" width="300"/>
