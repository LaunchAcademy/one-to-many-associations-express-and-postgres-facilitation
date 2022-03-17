# Getting Started

```sh
createdb forest_associations_development
psql forest_associations_development
\i server/db/schema.sql
\q

yarn install
yarn run db:seed
yarn run dev
```

## In a second tab

```sh
yarn run dev:client
```

## Our Task

- On the Enchanted Forest show page there should be a list of unicorns currently in that forest
