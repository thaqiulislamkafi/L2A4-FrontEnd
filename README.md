# FoodHub 🍽️

FoodHub is a food-ordering web application designed to connect customers
with food providers. The project is built with a Next.js frontend and a
separate Node.js/Express backend, with PostgreSQL data managed through
Prisma.

> **Project status:** Update this README as features and deployment
> details are finalized. The frontend repository is currently identified
> as
> [`L2A4-FrontEnd`](https://github.com/thaqiulislamkafi/L2A4-FrontEnd).
> Add the backend repository URL and verified deployment URLs when
> available.

## Table of Contents

- [FoodHub 🍽️](#foodhub-️)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Core Features](#core-features)
    - [Customer experience](#customer-experience)
    - [Provider experience](#provider-experience)
    - [Administration and application settings](#administration-and-application-settings)
    - [Authentication](#authentication)
  - [Technology Stack](#technology-stack)
  - [Architecture](#architecture)
  - [User Roles](#user-roles)
  - [Authentication and Security](#authentication-and-security)
  - [Project Structure](#project-structure)

## Overview

FoodHub is intended to provide a shared platform where customers can
explore meals, manage a cart, place and review orders, and interact with
food providers. Providers can manage food-related operations through
provider-facing pages and dashboards. The application is separated into
a frontend and an API backend so that the user interface and business
logic can be developed and maintained independently.

## Core Features

The following areas are represented in the project discussions and code
work. Confirm each item against the current branch before treating it as
production-ready.

### Customer experience

-   Public meal browsing and meal-detail pages.
-   Cart and cart-item management.
-   A cart rule intended to keep all meals in a cart associated with one
    provider.
-   Order-related workflows.
-   Meal reviews and frequently asked questions (FAQs).

### Provider experience

-   Provider-facing dashboard pages.
-   Order details in the provider dashboard.
-   Meal and order management workflows.
-   Dashboard statistics.

### Administration and application settings

-   Role-based access for user, provider, and administrator accounts.
-   Application settings and management endpoints.
-   User profile fields such as contact information and address, where
    enabled.

### Authentication

-   Email/password sign-in.
-   Google OAuth sign-in.
-   Session-based authentication.
-   Email OTP has also been discussed as part of the authentication
    setup; verify whether it is enabled in the current implementation.

## Technology Stack

  -----------------------------------------------------------------------
  Area                                Technology
  ----------------------------------- -----------------------------------
  Frontend framework                  Next.js

  UI                                  React, TypeScript where used,
                                      Tailwind CSS, and shadcn/ui
                                      components

  Backend                             Node.js, Express, TypeScript where
                                      used

  Database                            PostgreSQL

  ORM                                 Prisma

  Authentication                      Verify the current implementation:
                                      Better Auth has been
                                      used/discussed, and custom
                                      authentication is also part of the
                                      current OAuth learning work

  OAuth provider                      Google

  Deployment                          Vercel has been used/discussed for
                                      the frontend; verify the current
                                      production URL
  -----------------------------------------------------------------------

> Check the actual `package.json` files and environment configuration
> before adding exact version numbers or describing any library as
> definitively active.

## Architecture

FoodHub uses a separate frontend and backend.

``` text
Browser
   |
   v
Next.js Frontend
   |  API requests (credentials included when session cookies are used)
   v
Node.js / Express Backend
   |-- Authentication and authorization
   |-- Meals, carts, orders, reviews, FAQs, dashboard APIs
   |
   v
PostgreSQL Database
   ^
   |
Prisma ORM
```

The frontend is responsible for pages, components, and user
interactions. The backend is responsible for API endpoints,
authentication checks, business rules, and database access. Prisma
provides the data-access layer for PostgreSQL.

## User Roles

The project data model has included these roles:

-   **User / Customer** --- explores meals and uses customer-facing
    features.
-   **Provider** --- accesses provider-facing food and order workflows.
-   **Admin** --- accesses administrative functionality.

The user model has also included account status and profile fields.
Confirm the current Prisma schema for the exact enum values and
defaults.

## Authentication and Security

Authentication work has included email/password sign-in and Google
OAuth. The precise implementation should match the current backend
branch.

Security practices to maintain:

-   Keep OAuth client secrets and database credentials on the server;
    never expose them in frontend variables prefixed with
    `NEXT_PUBLIC_`.
-   Validate authentication and authorization on the backend for every
    protected API endpoint.
-   Enforce role-based access on the server, not only by hiding frontend
    UI.
-   Use secure, `HttpOnly` cookies for session identifiers where
    cookie-based sessions are implemented.
-   Configure CORS with the exact trusted frontend origin and enable
    credentials only when required.
-   Use HTTPS in production.
-   Validate request data and return safe error messages.
-   Never commit `.env` files, access tokens, secrets, or private
    credentials.

For Google OAuth, configure the authorized origin and redirect URI to
match the active environment and backend callback URL. Local and
production OAuth settings may differ.

## Project Structure

The application is split across two repositories or independently
managed applications. The frontend repository is known; add the backend
repository and exact folders after verifying them.

``` text
FoodHub/
├── frontend/       # Next.js application (conceptual layout)
└── backend/        # Node.js / Express API (conceptual layout)
```

This is a conceptual overview, not a verified directory listing. Replace
it with the actual folder structure from the repositories.
