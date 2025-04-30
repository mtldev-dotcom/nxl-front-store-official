<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  The Medusa Kiki Shop
</h1>

<p align="center">
Combine Medusa's modules for your commerce backend with the newest Next.js 15 features for a performant, multilingual storefront.</p>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

# Overview

The Medusa Kiki Shop is built with:

- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Medusa](https://medusajs.com/)

## Features

- **Full ecommerce support**:
  - Product Detail Page
  - Product Overview Page
  - Product Collections
  - Cart
  - Checkout with Stripe
  - User Accounts
  - Order Details

- **Internationalization**:
  - Multi-language support (English and French)
  - Country-based region selection
  - Nested URL structure (`/{countryCode}/{locale}/...`)
  - Language and region selection in both navigation and footer
  - Server-side and client-side translation management

- **Next.js 15 features**:
  - App Router
  - Next fetching/caching
  - Server Components
  - Server Actions
  - Streaming
  - Static Pre-Rendering

# Quickstart

### Setting up the environment variables

Navigate into your projects directory and get your environment variables ready:

```shell
cd nextjs-starter-medusa/
mv .env.template .env.local
```

### Install dependencies

Use Yarn to install all dependencies.

```shell
yarn
```

### Start developing

You are now ready to start up your project.

```shell
yarn dev
```

### Open the code and start customizing

Your site is now running at http://localhost:8000!

# Internationalization

The Medusa Kiki Shop comes with built-in support for multiple languages and regions:

- **Supported Languages**: 
  - English (en)
  - French (fr)

- **URL Structure**:
  - `/{countryCode}/{locale}/...`
  - Examples: 
    - `/ca/en/` (Canada region, English language)
    - `/ca/fr/` (Canada region, French language)
    - `/us/en/` (US region, English language)

- **How it works**:
  - The middleware automatically detects and redirects users based on their browser language and location
  - Users can manually switch languages using the language selector in the navigation or footer
  - Translations are managed through JSON dictionaries in `src/lib/i18n/dictionaries/`

- **Adding a new language**:
  1. Add a new dictionary file in `src/lib/i18n/dictionaries/`
  2. Add the locale code to the `locales` array in `src/lib/i18n/config.ts`
  3. Update the language selector component to include the new language

# Payment integrations

By default this starter supports the following payment integrations

- [Stripe](https://stripe.com/)

To enable the integrations you need to add the following to your `.env.local` file:

```shell
NEXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
```

You'll also need to setup the integrations in your Medusa server. See the [Medusa documentation](https://docs.medusajs.com) for more information on how to configure [Stripe](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe#main).

# Resources

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Documentation](https://docs.medusajs.com/)

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)
