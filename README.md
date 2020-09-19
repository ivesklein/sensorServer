# dockerTest-css
## Docker commands
(in WINDOWS use PowerShell, avoid git bash & cmd)

### Run in dev file change reactive
```sh
$ docker run -dp 3000:3000 -w /app -v "$(pwd):/app" node:12-alpine sh -c "yarn install && yarn run dev"
```


### Run normaly
```sh
$ docker build -t getting-started .
$ docker run -dp 3000:3000 getting-started
```