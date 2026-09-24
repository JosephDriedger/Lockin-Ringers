# Lock-in' Ringers

Website for **Lock-in' Ringers**, a Canadian barbershop quartet based in British Columbia.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Templating:** EJS with `express-ejs-layouts`
- **Styling:** Vanilla CSS (custom properties, CSS Grid, Flexbox)
- **Fonts:** Playfair Display + Inter (Google Fonts)

## Project Structure

```
src/
├── constants/       # Status codes, page paths
├── lang/en/         # Server and error message strings
├── modules/         # Utilities, rate limiting
├── public/
│   ├── css/
│   │   ├── partials/   # header.css, footer.css
│   │   ├── pages/      # Per-page stylesheets
│   │   └── style.css   # Global styles + CSS variables
│   ├── js/             # Client-side scripts
│   └── resources/      # Images, fonts
├── routes/          # Express route handlers
├── views/
│   ├── pages/       # Page templates (EJS)
│   └── partials/    # layout.ejs, header.ejs, footer.ejs
├── index.js         # Entry point
└── server.js        # Server class
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your values.

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The server starts on `http://localhost:3000` by default.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, barbershop explainer, performance types, booking CTA |
| `/about` | About — group story, member bios |
| `/social-media` | Social Media — Instagram and YouTube links |
| `/contact` | Contact — booking enquiry form |

## Environment Variables

| Variable | Description |
|---|---|
| `DEV_PORT` | Port for local development (default: `3000`) |
| `PROD_PORT` | Port for production |
| `DEV_LINK` | Allowed CORS origin for development |
| `PROD_LINK` | Allowed CORS origin for production |
| `DEPLOY_LINK` | Allowed CORS origin for deployment |
