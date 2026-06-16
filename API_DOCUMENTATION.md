# API Documentation
> Mathify JAX-RS API, Base URL: `/api`, Version: v1

## Table of Contents
- [Overview](#overview)
- [Error Responses](#error-responses)
- [Endpoints](#endpoints)
  - [AuthResource](#authresource)
  - [CourseResource](#courseresource)
  - [QuizResource](#quizresource)

## Overview
- **Base URL:** `http://localhost:8080/api` (or relative `/api` on the server)
- **Authentication method:** Token/Session based. Endpoints marked as `@Secured` require an authenticated context (typically via server session established after `/auth/login`).
- **Common headers:** `Content-Type: application/json`, `Accept: application/json`

## Error Responses
The API uses standardized error responses across all endpoints.

**Success format:** `200 OK` or `201 Created` depending on the operation.
**Error format:** `ErrorResponse` object.

```json
{
  "error": "Validation Failed",
  "details": "idToken is required"
}
```

**Common HTTP Status Codes:**
| Status | Condition |
|--------|-----------|
| `400`  | Validation failed (e.g., missing required fields handled by `@Valid`) |
| `401`  | Unauthorized (Missing or invalid authentication) |
| `404`  | Resource not found |
| `500`  | Internal Server Error |

---

## Endpoints

### AuthResource
Authentication and session management.

#### `POST /api/auth/login`
**Description:** Authenticates a user using an identity token (e.g., Firebase ID token) and establishes a session.

**Authentication:** Not Required

**Request Body:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIs..."
}
```

**Request Body Fields:**
| Field     | Type   | Required | Validation        | Description |
|-----------|--------|----------|-------------------|-------------|
| idToken   | String | Yes      | NotBlank          | Identity token for login |

**Response — Success:**
- Status: `200 OK`
```json
{
  "role": "STUDENT",
  "message": "Login successful"
}
```

**Response — Error:**
| Status | Condition              |
|--------|------------------------|
| 400    | `idToken` is missing or blank |
| 401    | Invalid or expired token |

**Example cURL:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"idToken": "YOUR_FIREBASE_ID_TOKEN"}'
```

#### `POST /api/auth/logout`
**Description:** Logs the user out and invalidates the session.

**Authentication:** Not Required

**Response — Success:**
- Status: `200 OK`
```json
{
  "message": "Logged out"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Content-Type: application/json"
```

---
### CourseResource
Retrieve course catalog and details.

#### `GET /api/courses`
**Description:** Retrieves a list of all course summary cards for the library grid.

**Authentication:** Not Required

**Response — Success:**
- Status: `200 OK`
```json
[
  {
    "id": "c-k2",
    "title": "Early Elementary Math (K-2)",
    "description": "Early Math curriculum",
    "track": "Early Math",
    "level": "Beginner",
    "levelNum": 1,
    "color": "green",
    "glyph": "∑",
    "totalLessons": 9,
    "estimatedHours": "5h",
    "xpReward": 1000,
    "status": "new"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:8080/api/courses \
  -H "Accept: application/json"
```

#### `GET /api/courses/{id}`
**Description:** Retrieves the full details of a specific course, including its prerequisites and chapters.

**Authentication:** Required (`@Secured`)

**Path Parameters:**
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | String | Yes      | Course ID |

**Response — Success:**
- Status: `200 OK`
```json
{
  "courseId": "c-k2",
  "title": "Early Elementary Math (K-2)",
  "description": "Early Math curriculum",
  "category": "Early Math",
  "prerequisite": [],
  "chapters": [
    {
      "chapterId": "ch-k2-u1",
      "title": "Counting and Cardinality"
    }
  ]
}
```

**Response — Error:**
| Status | Condition              |
|--------|------------------------|
| 401    | Unauthorized (Session missing or invalid) |
| 404    | Course not found       |

**Example cURL:**
```bash
curl -X GET http://localhost:8080/api/courses/c-k2 \
  -H "Accept: application/json" \
  -H "Cookie: JSESSIONID=YOUR_SESSION_ID"
```

---
### QuizResource
Retrieve quiz details and exercises.

#### `GET /api/quizzes/{id}`
**Description:** Retrieves a specific quiz and all of its associated questions.

**Authentication:** Required (`@Secured`)

**Path Parameters:**
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | String | Yes      | Quiz ID |

**Response — Success:**
- Status: `200 OK`
```json
{
  "quizId": "q-l-k2-u1-1",
  "title": "Exercises: Counting to 10",
  "passingScore": 2,
  "questions": [
    {
      "questionId": "q-0-98183fcd",
      "prompt": "If you have 4 apples and 3 bananas, how many fruits do you have in total?",
      "points": 10,
      "type": "MULTIPLE_CHOICE"
    }
  ]
}
```

**Response — Error:**
| Status | Condition              |
|--------|------------------------|
| 401    | Unauthorized (Session missing or invalid) |
| 404    | Quiz not found         |

**Example cURL:**
```bash
curl -X GET http://localhost:8080/api/quizzes/q-l-k2-u1-1 \
  -H "Accept: application/json" \
  -H "Cookie: JSESSIONID=YOUR_SESSION_ID"
```
