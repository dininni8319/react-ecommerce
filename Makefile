build-dev: 
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	@docker-compose -f docker-compose.dev.yml up

### Local ( prod config)
build-local: 
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	docker-compose up

### PROD
build-local: 
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

# run-production: