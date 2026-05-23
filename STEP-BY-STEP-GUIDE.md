# STEP-BY-STEP-GUIDE.md — WanderList

This guide explains how to set up and run the WanderList project from scratch on a new machine.

---

## Back-End Setup

### Prerequisites
- Node.js v18 or higher
- npm
- A MongoDB Atlas account
- A terminal (Mac Terminal or similar)

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/ChrisGibbs74/wanderlist-server.git
cd wanderlist-server
npm install
```

### 2. Configure the .env file

Create a file called `.env` in the root of the project. Never commit this file to GitHub — it is listed in `.gitignore`.

Add the following variables:

- `MONGODB_URI` — your MongoDB Atlas connection string. Get this from Atlas → Connect → Drivers. Replace `<password>` with your database user password and add `/wanderlist` before the `?` to specify the database name.
- `PORT` — the port the server runs on. Use 3001 if port 3000 is taken by another project.
- `JWT_SECRET` — a long random string used to sign JWT tokens. Treat it like a password.
- `JWT_EXPIRES_IN` — how long tokens stay valid. `7d` means 7 days.

### 3. Connect to MongoDB Atlas

1. Go to mongodb.com/cloud/atlas and log in
2. Click your cluster → Connect → Drivers
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Add `/wanderlist` before the `?` in the connection string
6. Paste it as the value of `MONGODB_URI` in your `.env` file

To whitelist your IP address:
1. Go to Atlas → Network Access
2. Click Add IP Address
3. Click Allow Access From Anywhere (0.0.0.0/0)
4. Click Confirm

### 4. Start the server

```bash
node server.js
```

You should see:

### 5. Test routes in Thunder Client

Install the Thunder Client extension in VS Code. Then test the following routes:

| Method | URL | Description |
|---|---|---|
| GET | http://localhost:3001 | Check server is running |
| POST | http://localhost:3001/api/auth/register | Register a new user |
| POST | http://localhost:3001/api/auth/login | Log in and get a token |
| GET | http://localhost:3001/api/visits | Get my visits (requires token) |
| POST | http://localhost:3001/api/visits | Add a visit (requires token) |
| PUT | http://localhost:3001/api/visits/:id | Edit a visit (requires token) |
| DELETE | http://localhost:3001/api/visits/:id | Delete a visit (requires token) |
| GET | http://localhost:3001/api/leaderboard | Get leaderboard data |

For protected routes, add an Authorization header:

---

## Front-End Setup

*To be completed in Week 14.*

---

## Deployment

*To be completed in Week 15.*
