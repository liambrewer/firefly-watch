
# [Firefly Watch](https://firefly.watch)

Observe and Record Fireflies.


## Installation

Clone Repository:

```bash
git clone stevharve/firefly-watch --depth 1
```

Setup Project:

```bash
cd firefly-watch

// NPM
npm i
npm run dev

// Yarn
yarn
yarn dev
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file:

`DATABASE_URL`: CockroachDB postgresql connection URI

`NEXTAUTH_URL`: https://example.com

`AUTH_SECRET`: supersecret

`GOOGLE_CLIENT_ID`: Google OAuth2 Client ID

`GOOGLE_CLIENT_SECRET`: Google OAuth2 Client Secret
