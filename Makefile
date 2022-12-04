
build: 
	docker-compose -f docker-compose.yml build --no-cache

up:
	docker-compose -f docker-compose.yml up -d --build --force-recreate

down:
	docker-compose -f docker-compose.yml down

restart: down up

logs:
	docker-compose -f docker-compose.yml logs -f --tail 100

nuke-from-orbit: down
	docker system prune -f
	docker volume prune -f
	sudo find . -name 'node_modules' -type d -prune -exec rm -rf '{}'

# Database Jobs

psql:
	docker-compose exec -e PGPASSWORD=test -e PGOPTIONS=--search_path=public db psql -U test postgres