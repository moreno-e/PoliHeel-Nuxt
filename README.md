# PoliHeel-Nuxt

### Mission
To provide an informative, non-biased, political learning experience. Promoting truth through transparency.

### Description
Originally a university personal project developed using react ([Github repo here!](https://github.com/moreno-e/PoliHeel-React)). PoliHeel is currently undergoing a rewrite to improve stability and user interaction. It is now being developed using the Nuxt.js framework for better SEO optimization. Leveraging IPStack to locate a user zipcode in order to request a users members of congress from the Google Civic API and Probulica API. Poliheel will also allow a user to signup which in return will provide more access to congressional information and local level government.

### Current Technologies Used
- Nuxt 3
- IPStack
- Google Civic API
- Probulica API

### Future Features
- Prior to page load a users location is determined and passed to the Google Civic API. 
     - The resultant data will render basic information only the upper level legislators: President; Vice President; Senators; Representatives; and State Governor
     - Basic information will display social information, contact information, latest bill votes (if applicable)
- User login will allow a user to gain access to more data (to be determined) from the currently display legislatures. As well as local level government information

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
