# people_manager
Django and vuejs app to mange people

This repo contains two apps that can be run using docker-compose up (boots db, django and web server)

The first app is django website where people can be added, viewed and searched
This app runs on 0.0.0.0:8000

The second app is a vuejs app that consumes a django rest api that is identical to the original django app
This app runs on 0.0.0.0:5000

Both these apps use a postgres databse
