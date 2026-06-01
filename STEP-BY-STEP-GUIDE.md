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

MONGODB_URI=your_mongodb_connection_string_here
PORT=3001
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

- `MONGODB_URI` — your MongoDB Atlas connection string. Get this from Atlas → Connect → Drivers. Replace `<password>` with your database user password and add `/wanderlist` before the `?` to specify the database name.
- `PORT` — the port the server runs on. Use 3001 if port 3000 is taken by another project.
- `JWT_SECRET` — a long random string used to sign JWT tokens. Treat it like a password. Never commit it to GitHub.
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

Connected to MongoDB
Server running at http://localhost:3001

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

For protected routes add an Authorization header:

Authorization: Bearer YOUR_TOKEN_HERE

---

## Front-End Setup

### Prerequisites
- Node.js v18 or higher
- npm

### 1. Clone the repo and install dependencies

```bash
git clone https://github.com/ChrisGibbs74/wanderlist-client.git
cd wanderlist-client
npm install
```

### 2. Set the API URL

The API URL is set directly in `src/stores/useWanderStore.js`. Every fetch call points to the back-end URL. For local development change all instances of the Railway URL back to:

http://localhost:3001

For production the URL should be:

https://wanderlist-server-production.up.railway.app

### 3. Run the dev server

```bash
npm run dev
```

Then open your browser at `http://localhost:5173` or `http://localhost:5174` if 5173 is taken.

### 4. Verify the front-end connects to the back-end

1. Open the app in your browser
2. Click Register and create an account
3. Log in with that account
4. Click a country card and log a visit
5. Check My Travels — your visit should appear
6. Check the Leaderboard — your country should appear

---

## Deployment

### Back-End — Railway

1. Go to railway.app and sign in with GitHub
2. Click New Project → Deploy from GitHub repo
3. Select `wanderlist-server`
4. Click Deploy Now
5. Go to Variables tab and add these environment variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

Do not add PORT — Railway sets this automatically.

6. Go to Settings → Networking → Generate Domain
7. Copy the generated URL — this is your live API URL

### Front-End — GitHub Pages

1. Update all API URLs in `src/stores/useWanderStore.js` to your Railway URL
2. Update `vite.config.js` to set the base path:

```javascript
export default defineConfig({
  base: '/wanderlist-client/',
  plugins: [vue()]
})
```

3. Add the deploy script to `package.json`:

```json
"deploy": "gh-pages -d dist"
```

4. Build and deploy:

```bash
npm run build
npm run deploy
```

5. Go to GitHub → wanderlist-client → Settings → Pages
6. Set branch to `gh-pages` and folder to `/ (root)`
7. Click Save
8. Wait 1-2 minutes — your site will be live at:

https://chrisgibbs74.github.io/wanderlist-client/

### CORS Configuration

The back-end uses the `cors` middleware with default settings which allows all origins. This means the GitHub Pages front-end can communicate with the Railway back-end without any additional configuration needed.

### Linking Front-End to Back-End

The front-end connects to the back-end purely through fetch calls in `useWanderStore.js`. To switch between local and production back-end, update the base URL in that file. No other configuration is needed.

