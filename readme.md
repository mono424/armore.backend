Started this project for University of Innsbruck.
We need to assamble some ARM Assambler, this little program should make it easier to assamble and test.

### How to run in docker

#### Without access to container registry
```
$ git clone https://github.com/mono424/armore.backend.git
$ docker build -t armore.backend:latest .
$ docker run -d -p 8080:443 armore.backend:latest
```

#### With access to container registry
```
$ docker pull gcr.io/armore-e8de7/armore.backend:latest
$ docker run -d -p 443:443 gcr.io/armore-e8de7/armore.backend:latest
```


### Stuff needed to run directly
```
 - Node.js
 - Yarn (recommended)
 - qemu-user
 - qemu-arm
```
