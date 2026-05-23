# Posts & Users API

A REST API for user and post management with JWT authentication and role-based access control.

## Project Status

Work in progress.

## Purpose

The goal of this project is to demonstrate backend development skills, including:

## REST API design
JWT-based authentication
Role-based authorization
Relational database modeling
Secure user management
CRUD operations

## Features

##### Users
- User registration and login
- JWT authentication
- Update own username
- Delete own account
- Cascade deletion of user posts
##### Posts
- Create posts
- Read posts (public access)
- Update own posts
- Delete own posts
- Each post is linked to a user
##### Admin
- View all users
- Delete users
- Delete any post
- No access to user passwords
- No ability to edit other users
- Authentication & Authorization
- JWT tokens are used for authentication
- Role-based access control with roles: user, admin
- Passwords are stored as secure hashes (bcrypt or argon2)
- Protected routes require valid authentication token

## Database Design
Relational MySQL database schema.
### Tables

##### Users
user_id (PK)
login (unique)
password
role

##### Posts
post_id (PK)
title
description
author_id (FK)
creation_date

### Relationships
One-to-many relationship: Users → Posts
Cascade delete enabled for user posts

## API Endpoints
##### Authentication
POST /api/auth/register
POST /api/auth/login
##### Users
GET /api/users/me
PATCH /api/users/me
DELETE /api/users/me
##### Posts
GET /api/posts
GET /api/posts/:id
POST /api/posts
PUT /api/posts/:id
DELETE /api/posts/:id
##### Admin
GET /api/admin/users
DELETE /api/admin/users/:id
DELETE /api/admin/posts/:id

## Technology Stack
Node.js / Express or .NET Web API
MySQL
JWT authentication
bcrypt password hashing
Role-based access control
Cascade delete for user-owned content
Separation of user and admin functionality
Relational database with foreign keys