# FilmReview API - Node.js Project

Een RESTful API voor het beheren van films en reviews, gebouwd met Node.js, Express en MySQL.

## 📋 Inhoudsopgave

- [Features](#features)
- [Technologieën](#technologieën)
- [Installatie](#installatie)
- [Database Setup](#database-setup)
- [Gebruik](#gebruik)
- [API Endpoints](#api-endpoints)
- [Authenticatie](#authenticatie)
- [Bronvermeldingen](#bronvermeldingen)

## ✨ Features

### Functionele Requirements
- ✅ Twee volledige CRUD interfaces (Movies & Reviews)
- ✅ Basisvalidatie op alle input velden
- ✅ Pagination met limit en offset parameters
- ✅ Zoekfunctionaliteit op meerdere velden
- ✅ Complete API documentatie op root URL
- ✅ User authenticatie met JWT tokens
- ✅ Role-based access control (User & Admin)

### Extra Features
- 🔐 Volledige authenticatie systeem met JWT
- 👤 User registratie en login
- 🛡️ Role-based authorization (User & Admin)
- 🔍 Geavanceerde zoekfunctionaliteit op meerdere velden
- 📊 Pagination met metadata (total, hasMore, etc.)
- ✅ Uitgebreide validatie (email format, password strength, etc.)
- 🔗 Foreign key constraints met CASCADE delete

## 🛠 Technologieën

- **Node.js** (v20+)
- **Express.js** - Web framework
- **MySQL** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authenticatie
- **dotenv** - Environment variabelen
- **EJS** - View engine voor documentatie

## 📦 Installatie

### Vereisten

- Node.js versie 20 of hoger
- MySQL database
- npm of yarn package manager

### Stap 1: Repository clonen

```bash
git clone <jouw-github-repo-url>
cd Backend-project-Node
```

### Stap 2: Dependencies installeren

```bash
npm install
```

### Stap 3: Environment variabelen instellen

Maak een `.env` bestand in de root directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=jouw_wachtwoord
DB_DATABASE=filmreview
JWT_SECRET=jouw-super-geheime-jwt-key-verander-dit-in-productie
```

**⚠️ Belangrijk:** Verander de `JWT_SECRET` naar een veilige random string in productie!

## 🗄️ Database Setup

### Stap 1: Database aanmaken

Open MySQL en voer uit:

```sql
CREATE DATABASE filmreview;
USE filmreview;
```

### Stap 2: Schema importeren

Importeer het schema bestand:

```bash
mysql -u root -p filmreview < db/schema.sql
```

Of via MySQL client:

```sql
SOURCE db/schema.sql;
```

### Stap 3: Seed data importeren (optioneel)

```bash
mysql -u root -p filmreview < db/seed.sql
```

Dit voegt test data toe inclusief:
- 3 films (Inception, Titanic, Interstellar)
- 3 reviews
- 3 gebruikers (admin, user, john_doe)

### Test Gebruikers

Na het importeren van seed data kun je inloggen met:

**Admin account:**
- Username: `admin`
- Password: `admin123`
- Role: admin

**User account:**
- Username: `user`
- Password: `user123`
- Role: user

## 🚀 Gebruik

### Server starten

```bash
npm start
```

De server draait nu op `http://localhost:3000`

### Development mode (met nodemon)

```bash
npm run dev
```

## 📚 API Endpoints

**Complete documentatie:** Open je browser en ga naar `http://localhost:3000` voor de volledige interactieve API documentatie.

### Overzicht

#### Authentication
- `POST /api/auth/login` - Inloggen
- `POST /api/auth/register` - Registreren
- `GET /api/auth/me` - Huidige gebruiker (🔒 auth required)

#### Movies
- `GET /api/movies` - Alle films ophalen (met pagination)
- `GET /api/movies/search` - Zoek films
- `GET /api/movies/:id` - Specifieke film
- `POST /api/movies` - Film toevoegen (🔒 admin only)
- `PUT /api/movies/:id` - Film updaten (🔒 admin only)
- `DELETE /api/movies/:id` - Film verwijderen (🔒 admin only)

#### Reviews
- `GET /api/reviews` - Alle reviews ophalen
- `GET /api/reviews/:id` - Specifieke review
- `POST /api/reviews` - Review toevoegen (🔒 auth required)
- `PUT /api/reviews/:id` - Review updaten (🔒 admin only)
- `DELETE /api/reviews/:id` - Review verwijderen (🔒 admin only)

### Voorbeelden

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### Pagination
```bash
curl http://localhost:3000/api/movies?limit=2&offset=0
```

#### Zoeken
```bash
curl "http://localhost:3000/api/movies/search?title=inception&genre=sci-fi"
```

#### Film toevoegen (met authenticatie)
```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title":"The Matrix",
    "year":1999,
    "genre":"Sci-Fi",
    "director":"Wachowski Sisters"
  }'
```

## 🔐 Authenticatie

Deze API gebruikt JWT (JSON Web Tokens) voor authenticatie.

### Hoe te gebruiken:

1. **Login of registreer** om een JWT token te krijgen
2. **Voeg de token toe** aan de Authorization header voor beschermde endpoints:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### Autorisatie levels:

- **Public** - Geen authenticatie vereist (GET movies, GET reviews)
- **Authenticated** - Ingelogde gebruikers (POST reviews)
- **Admin** - Alleen admins (POST/PUT/DELETE movies, PUT/DELETE reviews)

## 📖 Bronvermeldingen

### Documentatie & Tutorials
- [Express.js Official Documentation](https://expressjs.com/) - Web framework documentatie
- [MySQL npm package](https://www.npmjs.com/package/mysql) - MySQL database connector
- [JWT.io](https://jwt.io/) - JWT token informatie en debugging
- [bcrypt documentation](https://www.npmjs.com/package/bcrypt) - Password hashing

### Code inspiratie
- [MDN Web Docs - REST API](https://developer.mozilla.org/en-US/docs/Glossary/REST) - REST API best practices
- [Express.js Tutorial](https://expressjs.com/en/starter/installing.html) - Basis setup en routing
- [JWT Authentication Guide](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs) - JWT implementatie patronen

### Packages gebruikt
- `express` - Web application framework
- `mysql` - MySQL database driver
- `bcrypt` - Password hashing library
- `jsonwebtoken` - JWT token generatie en verificatie
- `dotenv` - Environment variabelen management
- `cors` - CORS middleware
- `ejs` - Template engine voor views

## 📝 Project Structuur

```
Backend-project-Node/
├── db/
│   ├── schema.sql          # Database schema
│   └── seed.sql            # Test data
├── src/
│   ├── config/
│   │   └── db.js           # Database connectie
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── routes/
│   │   ├── auth.js         # Auth endpoints
│   │   ├── movies.js       # Movies endpoints
│   │   ├── reviews.js      # Reviews endpoints
│   │   └── views.js        # Frontend routes
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── views/
│   ├── api-docs.ejs        # API documentatie pagina
│   └── ...
├── .env                    # Environment variabelen (niet in git)
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Minimum Requirements Checklist

- ✅ Twee CRUD interfaces (Movies & Reviews)
- ✅ Lijst van alle entiteiten ophalen
- ✅ Details van één entiteit ophalen
- ✅ Nieuwe entiteit toevoegen
- ✅ Bestaande entiteit updaten
- ✅ Bestaande entiteit verwijderen
- ✅ Basisvalidatie (geen lege velden, type checks, etc.)
- ✅ Minstens één endpoint met limit en offset (GET /api/movies)
- ✅ Minstens één endpoint met zoekfunctionaliteit (GET /api/movies/search)
- ✅ API documentatie pagina op root URL (http://localhost:3000)
- ✅ Node.js versie 20+
- ✅ Express framework
- ✅ Database connectie (MySQL)
- ✅ Juiste HTTP verbs (GET, POST, PUT, DELETE)
- ✅ GitHub repository met duidelijke commits
- ✅ node_modules in .gitignore
- ✅ README.md met installatie-instructies en bronvermeldingen

## 👨‍💻 Auteur

**Marwan Makouh**

## 📄 Licentie

Dit project is gemaakt voor educatieve doeleinden als onderdeel van het Backend Web Development vak.

---

**Laatste update:** 2025
