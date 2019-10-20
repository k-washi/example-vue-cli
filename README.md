# example-vue-cle

---

VueによるプロジェクトをDocker - nginx を用いて公開

+ Vue/Vuetify/Router/Vuex and Docker, nginx

## start project

---

package.jsonに書かれているパッケージをインストール & 起動

```bash
npm install

npm run serve

npm run serve --  --port 80
```

## Docker 

---

コンテナのbuildと実行

```bash
docker build -t kwashizaki/example-vue-cli:v1.0.0 .

#ファイル指定
docker build -t kwashizaki/example-vue-cli:v1.0.0 -f ./DockerfileNoBuild .

docker run -it -p 80:80 --rm --name example-vue-cli kwashizaki/example-vue-cli:v1.0.0
```

Docker Hub へpull

```bash
docker login

docker push kwashizaki/example-vue-cli:v1.0.0 

```

Docker Hubから取得

```bash

docker pull kwashizaki/example-vue-cli:v1.0.0

```