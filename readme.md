## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Folder Structure](#folder)
- [Development ](#development)

  - [App Architecture](#app-archi)
  - [API Architecture Explained](#app-exp)
  - [Running the API](#app-run)

- [Deployment ](#deployment)
  - [Deployment Architecture](#dep-archi)
  - [Deployment Architecture Explained](#dep-exp)
  - [Docker](#docker)
  - [Kubernetes GKE](#k8s)
- [Tools](#built_using)
- [Author](#authors)

## 🧐 About <a name = "about"></a>

- This a micro service application that send sms  via partners to the  client by executing trigger in the cms module and allow to the client activate that bonus via [Djezzy App](https://play.google.com/store/apps/details?id=com.djezzy.internet&hl=en&gl=US) .

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live  Kubernetes system.

### Prerequisites

You need to install the fellowing software in order to get the application up and running :

- Node.js and npm.
- NestJS.
- Redis in memory database. 
- Docker.
- Kubernetes on cloud.


# Development <a name = "development"></a>

## APP Architecture <a name = "app-archi"></a>

 ![Alt text](./images/app-archi.png?raw=true "Title") 

### APP Architecture Explained <a name = "app-exp"></a>

The application contaian of 5 micro services 

- the api-getway : listen to the request from the outside world and push event to the event  bus 
- the dbss-api : get eligible profile from our dbss api ( api manager for dbss api )
- elgible-app : listen to the event in the event bus and preform changes to the database 
- cms-app : listen to the event in the event bus and execut trigger on sql server database yo send sms or bonus to the client depand on msisdn  
- eligible-api  : get request to get the status of msisdn ( eligible or not eligible to get bonus )

- Redis Pub/Sub work as event bus between services .

### Installing

- Download and Install node.js and NPM from https://nodejs.org/en/download/ 

### Running the Nest.JS application <a name = "app-run"></a>

- Download or clone the project code from https://github.com/abdm64/Partner-api-micro-svc-nest-js

- install NestJs Framework from the npm cli  for more information please visit [NestJS Web site](https://nestjs.com/) 

- Install all required npm packages by running npm install from the command line in each directory  (where the package.json is located).

```
cd *
```

```
npm install
```

- Before start the application you should change the  keys in the *-app/config directory (host, user, password and db name ) in order to connect to the postgres  database.

- Start the application by running npm start from the command line in the api directory , you should see the message:  "Nest application successfully started".


```
npm start
```

- Please make sure that you have connected to redis intance in order to the  application works   

# 🚀 Deployment <a name = "deployment"></a>

### Prerequisites

- In order to deploy this application in production we need :
  - Docker to build images for all sevices   and push it to the docker hub or private registry .
  - Kubernetes cluster to run the micro services application  in production mode from the image that was created .

## Docker <a name = "docker"></a>

### Installing

- Download and install docker on your machine Please Visit [Docker](https://www.docker.com/) 

### Build Docker image

- Build your own docker image and push it to your repo by running "docker build -t my-app-name:v1 . "
  from the command line in api directory

```
cd *-app
```

```
docker build -t my-app-name:v1 .
```

you need to push the image to [Docker hub](https://hub.docker.com) or your own private  registry .


## Kubernetes <a name = "k8s"></a>

## Deployment Architecture <a name = "dep-archi"></a>

 ![Alt text](./images/app-dep-archi.png?raw=true "Title")

## Deployment Architecture Explained <a name = "dep-exp"></a>



- Please fellow the instruction in the configMap file  to setup the proper environment variables value in order the application works (action required)
-  you can use jenkins in order to automate the proccess of deployment when the developer push to the production ( main ) branch use jenkinsfile in CI directory 
- to deploy manualy  the micro services application you need just run the script   deploy.sh by running the fellowing  cammand 



```
sh deploy.sh

```


this will : 

   - deploy production envirment  for redis to work as event bus 
   - build all images for micro services. 
   - push all images to the docker registry
   - deploy all micro service app to production envirment on kubernetes  fellowing the previous architecture.




 this will create the fellowing  Kubernetes objects:

  - Namespace a virtual cluster for all your resource related to this application ( pods services secret)
  - Deployment for  all the application with one pod ( running container) insuring high availability for  the service. 
  - Cluster ip services that connected to the pods .
  - ingress service that connect the cluster ip service with ingress-nginx load balancer to expose it outside (Public) .

 PS : you must install NGINX Ingress Controller on your k8s cluster before applying the final deployment please check this link https://kubernetes.github.io/ingress-nginx/deploy/ for more information. 

- to drop the application just run the command :

```
kubectl delete  -f k8s

```
this will delete all kubernetes objects

## ⛏️ Built Using <a name = "built_using"></a>


- [NestJS](https://nestjs.com/) - A progressive Node.js framework.
- [Redis](https://redis.io/) - Redis is in memory database.
- [TypeORM](https://typeorm.io/#/) - promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
- [Postgres](https://www.postgresql.org/) - Open source relationel database.
- [Docker](https://www.docker.com/) - Software platform for building and packaging applications.
- [Kubernetes](https://kubernetes.io/) - Container Orchestration.


## ✍️ Author <a name = "authors"></a>

- [@abdm64](https://github.com/abdm64) Backend Platform Engineer @ [Djezzy](http://www.djezzy.dz/)

Made with ❤️   by Abdellah


