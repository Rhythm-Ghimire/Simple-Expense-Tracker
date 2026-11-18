# Simple Expense Tracker

A small full-stack expense tracker. Add expenses, delete them, and see your running total. It is built with an Express REST API, Prisma ORM, and a SQLite database, with a plain HTML/CSS/JavaScript front end.

**Tech stack:** Node.js, Express, Prisma, SQLite, HTML, CSS, JavaScript

## Features

- Add an expense with a name and amount (the date is recorded automatically).
- View all expenses.
- Delete an expense.
- See the total amount spent.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/expenses` | List all expenses |
| POST | `/expenses` | Add an expense |
| DELETE | `/expenses/:id` | Delete an expense |
| GET | `/expenses/total` | Get the total of all expenses |

## Data model

```prisma
model Expense {
  id     Int      @id @default(autoincrement())
  name   String
  amount Float
  date   DateTime @default(now())
}
```

## Project structure

```
server.js          Express server and API routes
prisma/
└── schema.prisma  Database schema (SQLite)
frontend/
├── index.html
├── app.js         Calls the API with fetch()
└── styles.css
```

## Getting started

```bash
git clone https://github.com/Rhythm-Ghimire/Simple-Expense-Tracker.git
cd Simple-Expense-Tracker
npm install
npx prisma generate
npx prisma db push      # creates the SQLite database
node server.js
```

Open the address printed in the terminal (the server also serves the `frontend` folder).

## Possible improvements

- Add categories and monthly summaries.
- Add an edit option and input validation.

## Author

**Rhythm Kashyap Ghimire**
[GitHub](https://github.com/Rhythm-Ghimire)
