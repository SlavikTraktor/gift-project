# Backend side of project

To install dependencies

```
npm install
```

To run code

```
npm run start-run
```

To run code and watch

```
npm run start-watch
```

To run migrations

```
npm run migrate
```

To create new migrations without running them

```
npm run migrate:create
```

Order to pull up DataBase

```
1. copy .env.example
2. rename copied .env.example to .env
3. in .env change DATABASE_URL to postgresql connection string
4. npm run migrate. You result shoud be: 'Your database is now in sync with your schema.'
5. npm run seed src\seed\seedUsersWithWishes.ts
```