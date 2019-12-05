Started this project for University of Innsbruck.
We need to assamble some ARM Assambler, this little program should make it easier to assamble and test.

### How to run in docker

#### Without access to container registry
```
$ git pull https://github.com/mono424/armore.backend.git
$ docker build ./
$ docker run -d -p 443:443 -v ${pwd}:/mounted-data armore.backend:latest
```

#### With access to container registry
```
$ docker pull gcr.io/armore-e8de7/armore.backend:latest
$ docker run -d -p 443:443 -v ${pwd}:/mounted-data gcr.io/armore-e8de7/armore.backend:latest
```


### Stuff needed to run directly
```
 - Node.js
 - Yarn (recommended)
 - qemu-user
 - qemu-arm
```


! Not working in docker yet... contribution appreciated :P