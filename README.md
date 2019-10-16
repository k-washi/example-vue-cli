# example-vue-cle

Vue cli によるプロジェクト例。docker-nginxにより公開まで。

## start project

---

package.jsonに書かれているパッケージをインストール

```bash
npm install

```

## Docker 

---

コンテナのbuildと実行

```bash
docker build -t kwashizaki/example-vue-cli:v1.0.0 .

#ファイル指定
docker build -t kwashizaki/example-vue-cli:v1.0.0 -f ./DockerfileNoBuild .

docker run -it -p 8080:80 --rm --name example-vue-cli kwashizaki/example-vue-cli:v1.0.0
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