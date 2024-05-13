HOME_DIR = $(shell pwd)
SAMPLE_ENV_FILE = $(HOME_DIR)/sample.env
ENV_FILE = $(HOME_DIR)/.env
BUILD_DIR = ./build ./dist

NPM = npm
DOCKER = docker

.PHONY: clean
clean:
	@rm -rf $(BUILD_DIR)

.PHONY: lint
lint:
	$(NPM) run lint

.PHONY: env
env:
	@cp $(SAMPLE_ENV_FILE) $(ENV_FILE)

.PHONY: dev
dev:
	$(NPM) run dev

.PHONY: build-image
build-image:
	$(DOCKER) build \
	-t $(IMAGE_NAME):latest \
	-t $(IMAGE_NAME):$(shell node -p -e "require('./package.json').version") .

.PHONY: build
build:
	$(NPM) run build

PORT ?= 3000
.PHONY: deploy
deploy:
	$(DOCKER) run \
	--name military-district-frontend \
	-p $(PORT):80 \
	-d \
	ptrvsrg/military-district-frontend

.PHONY: help
help:
	@echo "Available commands:"
	@echo "    make help"
	@echo "        Display help message"
	@echo "    make clean"
	@echo "        Clean generated files"
	@echo "    make lint"
	@echo "         Automatically fix fixable problems in the code"
	@echo "    make env"
	@echo "        Create .env file from sample.env"
	@echo "    make dev"
	@echo "        Start the local server for development"
	@echo "    make build-image IMAGE_NAME=<name>"
	@echo "        Build docker image"
	@echo "    make build"
	@echo "        Generate static files for deployment"
	@echo "    make deploy PORT=<port>"
	@echo "        Deploy to the Docker container"

.DEFAULT_GOAL := help