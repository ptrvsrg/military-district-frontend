NPM = npm
BUILD_DIR = ./build ./dist ./build_keycloak ./dist_keycloak

.PHONY: clean
clean:
	@rm -rf $(BUILD_DIR)

.PHONY: build
build:
	$(NPM) run build

.PHONY: dev
dev:
	$(NPM) run dev

.PHONY: lint
lint:
	$(NPM) run lint

.PHONY: storybook
storybook:
	$(NPM) run storybook

.PHONY: build-storybook
build-storybook:
	$(NPM) run build-storybook

.PHONY: help
help:
	@echo "Available commands:"
	@echo "    make help"
	@echo "        Display help message"
	@echo "    make clean"
	@echo "        Clean generated files"
	@echo "    make build"
	@echo "        Generate static files for deployment"
	@echo "    make dev"
	@echo "        Start the local server for development"
	@echo "    make lint"
	@echo "         Automatically fix fixable problems in the code"
	@echo "    make storybook"
	@echo "        Start the local server by displaying interactive documentation"
	@echo "    make build-storybook"
	@echo "        Generate static files with storybook for deployment"

.DEFAULT_GOAL := help