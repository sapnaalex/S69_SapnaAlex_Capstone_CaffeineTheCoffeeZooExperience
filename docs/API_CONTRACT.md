# Caffeine API contract

Base URL: `http://localhost:5000`. Authenticated endpoints require `Authorization: Bearer <JWT>`.
Responses changed during the stabilization pass use `{ "message": "...", "data": ... }`; errors use `{ "message": "..." }`.

## Auth and users

| Method | Path | Auth | Request / parameters | Response |
| --- | --- | --- | --- | --- |
| POST | `/api/auth/register` | No | `username`, `emailID`, `password` | `201` with `token` and public `user` |
| POST | `/api/auth/login` | No | `emailID`, `password` | `200` with `token` and public `user` |
| GET | `/api/auth/profile` | Yes | — | `200` with the authenticated user (without password) |
| PUT | `/api/auth/updateProfile` | Yes | Optional `username`, `emailID` | Updated public user |
| DELETE | `/api/auth/deleteUser` | Yes | — | Deletion message |
| GET | `/api/users` | Yes | — | All users without passwords (`data`) |
| GET | `/api/users/:id` | Yes | `id` path parameter | One user without password (`data`) |
| PUT / DELETE | `/api/users/:id` | Yes | `username`, `emailID`, or `profilePicture` / `id` | Owner-only user update or delete |

New clients should use `/api/auth/login` and `/api/auth/register`; duplicate legacy login/registration endpoints were removed from `/api/users`.

## Files

| Method | Path | Auth | Request / parameters | Response |
| --- | --- | --- | --- | --- |
| POST | `/api/files` | Yes | Multipart form data with `file` only | `201`, file record in `data`, plus `fileUrl` |
| GET | `/api/files` | Yes | — | Current user's files (`data`) |
| GET | `/api/files/:id` | Yes | `id` | Current user's file (`data`) |
| DELETE | `/api/files/:id` | Yes | `id` | Deletes only the caller's file |

The server derives `uploadedBy` from the JWT. Upload errors are `400`/`500`; missing or inaccessible files return `404`.

## Coffee profiles and companions

| Method | Path | Auth | Request / parameters | Response |
| --- | --- | --- | --- | --- |
| GET | `/api/coffee-profiles` | No | — | Profiles with linked companion and flavour recipe (`data`) |
| GET | `/api/coffee-profiles/:id` | No | `id` | One populated profile (`data`) |
| POST | `/api/coffee-profiles` | Yes | `linkedCoffeeCompanion`, `name`, `flavourProfile`, `description`; optional `origin` | `201` profile (`data`) |
| PUT / DELETE | `/api/coffee-profiles/:id` | Yes | Supported profile fields / `id` | Updated profile or deletion message |
| GET | `/api/coffee-companions` | No | — | Companions with coffee profile (`data`) |
| GET | `/api/coffee-companions/:id` | No | `id` | One companion (`data`) |
| POST | `/api/coffee-companions` | Yes | `CompanionName`, `personality`; optional `coffeeProfile` | `201` companion (`data`) |
| PUT / DELETE | `/api/coffee-companions/:id` | Yes | Companion fields / `id` | Updated companion or deletion message |

Profiles and companions are shared catalog data. The API has no roles/owner field, so write access is authenticated but not author-owned.

## Recipes and favorites

| Method | Path | Auth | Request / parameters | Response |
| --- | --- | --- | --- | --- |
| GET | `/api/recipes` | No | Optional `?createdBy=<userId>` | Recipes with creator (`data`) |
| GET | `/api/recipes/:id` | No | `id` | Recipe with creator (`data`) |
| POST | `/api/recipes` | Yes | `title`, `ingredients`, `recipe`; optional `description`, `preparationTime` | `201` recipe; `createdBy` is JWT-derived |
| PUT / DELETE | `/api/recipes/:id` | Yes | Recipe fields / `id` | Owner-only update or delete; `403` otherwise |
| GET | `/api/favorites` | Yes | — | Caller’s one favorites record with `recipes` (`data`) |
| POST | `/api/favorites` | Yes | `recipeId` | Adds the recipe to caller’s `recipes` set |
| DELETE | `/api/favorites/:recipeId` | Yes | `recipeId` | Removes that recipe from caller’s favorites |

## Posts and comments

| Method | Path | Auth | Request / parameters | Response |
| --- | --- | --- | --- | --- |
| GET | `/api/posts` | No | — | Posts with `createdBy` (`data`) |
| GET | `/api/posts/:id` | No | `id` | Post with populated comments (`data`) |
| POST | `/api/posts` | Yes | `title`, `content`; optional `picture` | `201`; `createdBy` is JWT-derived |
| PUT / DELETE | `/api/posts/:id` | Yes | Post fields / `id` | Owner-only update or delete |
| GET | `/api/comments` | No | Optional `?postId=<postId>` | Comments with `createdBy` (`data`) |
| GET | `/api/comments/:id` | No | `id` | One comment (`data`) |
| POST | `/api/comments` | Yes | `postId`, `content` | `201`; author derived from JWT and attached to post |
| PUT / DELETE | `/api/comments/:id` | Yes | `content` / `id` | Owner-only update or delete |

## Games and leaderboard

| Method | Path | Auth | Request / parameters | Response |
| --- | --- | --- | --- | --- |
| GET | `/api/games` | No | — | Game catalog (`data`) |
| GET | `/api/games/:id` | No | `id` | One game and highest-score entry (`data`) |
| POST | `/api/games` | Yes | `gameName`, `difficultyLevel`, `gameTypes`, `description`; optional `highestScore` | `201` game |
| PUT / DELETE | `/api/games/:id` | Yes | Game fields / `id` | Updated game or deletion message |
| GET | `/api/leaderboard` | No | — | Entries sorted by rank then score (`data`) |
| GET | `/api/leaderboard/:id` | No | `id` | One entry (`data`) |
| POST / PUT / DELETE | `/api/leaderboard[/:id]` | Yes | Existing leaderboard fields | Existing catalog CRUD contract |

There is no gameplay, score-submission, player-progress, or authorization model for leaderboard administration.

## Notifications

| Method | Path | Auth | Request / parameters | Response |
| --- | --- | --- | --- | --- |
| GET | `/api/notifications` | Yes | — | Caller’s notifications, newest first (`data`) |
| GET | `/api/notifications/user/:userId` | Yes | Caller’s own user id only | Same as collection route; `403` for another user |
| POST | `/api/notifications` | Yes | `message` | Creates a notification for the caller |
| DELETE | `/api/notifications/:id` | Yes | `id` | Deletes only the caller’s notification |

Notifications currently have no read/unread field or endpoint.

## Status codes

`200` success, `201` creation, `400` invalid request/id, `401` missing/invalid/expired JWT, `403` ownership violation, `404` unavailable resource, and `500` server/database error.
