# Rate-Limited API Platform Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-blue)
![DynamoDB](https://img.shields.io/badge/Database-DynamoDB-orange)
![Redis](https://img.shields.io/badge/Cache-Redis-red)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A scalable backend system that provides **API key-based access to public APIs with rate limiting, daily quotas, and usage analytics**, built using modern backend architecture principles.

---

## Overview

This project simulates a **real-world SaaS API platform** where users can:

- Register and authenticate
- Generate and manage API keys
- Access protected APIs
- Get rate-limited per minute
- Track daily usage and history

---

## System Architecture

The application follows a **Modular Layered Architecture** with a **hybrid data strategy (Redis + DynamoDB)**.

### Layers

- **Controller Layer** → Handles HTTP requests/responses  
- **Service Layer** → Business logic & orchestration  
- **Repository Layer** → DynamoDB data access  
- **Middleware Layer** → Auth, validation, rate limiting  
- **Performance Layer (Redis)** → High-speed operations  

---

## Core Execution Flows

### Public API Request Flow

Request
→ API Key Middleware
→ Rate Limit (Redis)
→ Daily Quota (DynamoDB)
→ API Controller
→ Response


#### Steps:

1. **API Key Validation**
   - Verifies API key in DynamoDB
   - Attaches user to request

2. **Rate Limiting (Redis)**
   - Key: `rate:<api_key>`
   - Window: 60 seconds
   - Returns `429` if exceeded

3. **Daily Quota (DynamoDB)**
   - Tracks usage:
     ```
     PK: USER#email
     SK: QUOTA#YYYY-MM-DD
     ```
   - Blocks when limit reached

4. **Business Logic**
   - Executes API (e.g., email validation)

---

### User Portal Flow

#### Authentication

Request
→ Zod Validation
→ Password Hashing (bcrypt)
→ JWT Generation
→ Response


#### Usage Analytics

- Fetch usage records from DynamoDB  
- Generate last **N days timeline**  
- Fill missing days with `0`  

---

## Database Design (DynamoDB)

### Single Table Design

| PK            | SK                   | Description          |
|--------------|----------------------|----------------------|
| USER#email   | PROFILE              | User data            |
| USER#email   | QUOTA#YYYY-MM-DD     | Daily usage tracking |

### Example

```json
{
  "PK": "USER#john@gmail.com",
  "SK": "QUOTA#2026-05-03",
  "count": 25
}
```
### Authentication & Security

- **JWT-based Authentication**  
  Secure user sessions using JSON Web Tokens

- **Password Hashing (bcryptjs)**  
  Ensures user passwords are never stored in plain text

- **API Key Access Control**  
  Public APIs are protected using unique API keys per user

- **Rate Limiting (Redis)**  
  Prevents abuse using per-minute request limits

- **Daily Quota Enforcement (DynamoDB)**  
  Restricts total API usage per day per user

- **Input Validation (Zod)**  
  Ensures all incoming data is validated and sanitized

- **Middleware-based Protection**  
  Layered request validation, authentication, and traffic control

### Tech Stack

- **Backend:** Node.js, Express.js  
- **Validation:** Zod  
- **Authentication:** JWT, bcryptjs  
- **Database:** Amazon DynamoDB (Single Table Design)  
- **Caching / Performance:** Redis

### API Endpoints

### Auth

```http
POST /auth/register
POST /auth/login
```
### User
```http
GET /api/user/me
GET /api/user/usage
GET /api/user/usage/history?days=7
POST /api/user/api-key/regenerate
```
### Public APIs(Protected)
```http
POST /api/email/validate?email=test@gmail.com
POST /api/password/check
POST /api/ip/info
```

