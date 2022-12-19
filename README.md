
docker run -e POSTGRES_PASSWORD=mypass -p 5433:5432 -e PGDATA=/var/lib/postgresql/data/pgdata -v PGDISK:/var/lib/postgresql/data -d postgres

