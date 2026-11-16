Book Havan — Bookstore Web Application

A personal learning and portfolio project built with a React frontend and a Laravel REST API. The project explores book browsing, authentication, persistent shopping carts, wishlists, and order management.

**Status:** In development. The customer-facing application is the current focus; an admin dashboard and real payment processing are not implemented. The application still needs authorization and server-side pricing improvements before public production use.

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, JavaScript, React Router, React Bootstrap, Sass, Vite |
| Backend | PHP 8.2+, Laravel 12, Laravel Sanctum, Eloquent ORM |
| Database | SQLite in the supplied `.env.example`; database migrations and sample seed data |
| Development checks | ESLint, Vite production build, PHPUnit / Laravel feature tests |

## Current Features

- Book listing, detail pages, and a search API with pagination.
- Registration, login, logout, profile editing, and password updates.
- Customer address management.
- Database-backed shopping carts with quantity updates, removal, and stock checks.
- Wishlist endpoints and frontend integration.
- Multi-step checkout interface for address, payment selection, and order review.
- Order creation, order listing and detail endpoints, and cancellation of pending orders.
- Transaction-based stock deduction during order-item creation and stock restoration on cancellation.
- Responsive layouts built with React Bootstrap.

The payment step is part of the demonstration interface; it does not establish that a real payment has been processed. Features listed here describe the current implementation, not a completed end-to-end verification.

## Repository Structure

```text
Book-Havan-bookstore/
├── Bookstore-Back-End/
│   ├── app/Http/Controllers/
│   ├── app/Http/Requests/
│   ├── app/Http/Resources/
│   ├── app/Models/
│   ├── database/migrations/
│   ├── database/seeders/
│   ├── routes/api.php
│   └── tests/Feature/
├── Bookstore-Front-End/latest/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/context/
│   ├── src/services/
│   └── src/assets/
└── README.md
```

## Local Setup

Prerequisites: Git, PHP 8.2+ with the extensions required by Laravel and SQLite, Composer, and Node.js with npm compatible with the project's Vite version. The commands below use PowerShell and a new local checkout.

### 1. Clone the repository

```powershell
git clone https://github.com/zhihaogoh/Book-Havan-bookstore.git
cd Book-Havan-bookstore
```

### 2. Configure the backend

```powershell
cd Bookstore-Back-End
composer install
Copy-Item .env.example .env
php artisan key:generate
```

Edit the following values in `Bookstore-Back-End/.env`. Add `SANCTUM_STATEFUL_DOMAINS` if it is absent:

```dotenv
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
SESSION_DOMAIN=null
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

Create the SQLite file if it does not exist, then migrate and seed the new local database:

```powershell
if (!(Test-Path database/database.sqlite)) {
    New-Item -ItemType File database/database.sqlite | Out-Null
}
php artisan config:clear
php artisan migrate --seed
php artisan serve --host=localhost --port=8000
```

Keep this terminal open. The seeder includes sample users, addresses, authors, categories, and books. Use it for a fresh demo database: it includes fixed relationship IDs and can reset seeded book values when rerun. Seeded image paths do not guarantee the corresponding backend image files are present.

### 3. Start the frontend

Open a second terminal at the repository root:

```powershell
cd Bookstore-Front-End/latest
npm ci
npm run dev -- --host localhost --port 5173 --strictPort
```

Open [http://localhost:5173](http://localhost:5173).

Use `localhost` consistently for both services. The current CORS configuration allows `http://localhost:5173`, and `src/services/api.js` currently uses `http://localhost:8000` as the backend URL. The frontend does not yet read an API URL from a Vite environment variable.

### 4. Explore the demo

After seeding a fresh local database, the sample customer account is:

```text
Email: test@example.com
Password: password
```

These are public local-demo credentials. You can also register a new customer account.

Suggested walkthrough: browse books → log in → add a book to the cart → change its quantity → refresh the page → choose an address → review and submit an order → view the order → cancel a pending order.

## Development Checks

From `Bookstore-Front-End/latest`:

```powershell
npm run lint
npm run build
```

From `Bookstore-Back-End`:

```powershell
php artisan test
```

Feature tests in the repository cover order numbering and ownership on creation, stock deduction, insufficient-stock rollback, cancellation behavior, and logout. These commands are provided for verification; this README does not claim that the current build or test suite passes.

## Known Limitations and Next Steps

- Complete ownership checks for order details and shipping-address selection, and restrict catalog write endpoints to authorized administrators.
- Read prices and discount rules from the database and calculate shipping, tax, and totals on the server rather than trusting request amounts.
- Verify the full cart-to-order flow, including deletion feedback, quantity persistence, amount consistency, and stock behavior when order items change.
- Move the frontend API base URL into environment configuration before deployment.
- Add actual homepage, cart, and checkout screenshots after checking the running application.
- Build the admin dashboard after the customer purchase flow is stable.
- Add a payment provider integration if real payments become part of the scope.

## Author

Goh Zhi Hao — Diploma in Information Technology
