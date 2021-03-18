service := avda-api
version := 0.0.2
docker_org := avda
region := us-central1-c
cluster := avda-prod
docker-image := ${docker_org}/${service}:${version}
root := $(abspath $(shell pwd))
port := 3006

list:
	@grep '^[^#[:space:]].*:' Makefile | grep -v ':=' | grep -v '^\.' | sed 's/:.*//g' | sed 's/://g' | sort

bootstrap:
	npm install

init:
	npm install

dev:
	npm run start

build: 
	npm run build

docker-build:
	docker build -t $(docker-image) .

docker-dev:
	make docker-build
	make docker-run

docker-push:
	docker push $(docker-image)

docker-run:
	@docker run -itp $(port):$(port)  $(docker-image)

bumpversion-patch:
	bumpversion patch --allow-dirty

bumpversion-minor:
	bumpversion minor --allow-dirty

bumpversion-major:
	bumpversion major --allow-dirty
