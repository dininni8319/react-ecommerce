include ./server/.env
export
# target: 
#     @echo "test0"
#     @echo "test1"
help: ## serve for development
	@echo "Usage: make [options] [target] ..."; \
	echo "Targets:"; \
	fgrep -h '##' Makefile | awk -F'##|: ' '{printf "%40s %s\n", $$1, $$3}
	' | fgrep -v fgrep';

dev: ## serve for development
	@echo "starting Dev enviroment"
	@cd client && npm start 
	@cd server && npm start

install: ## performs initial setup
	@echo "Installing libraries"
	@cd server && npm install 
	@cd client && npm install

prod: ## to clear the cache
	@echo "run prod"
	@cd client && npm run build
	@cd server && npm run build


