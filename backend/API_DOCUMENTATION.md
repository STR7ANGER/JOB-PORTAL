# Backend API Documentation

## Overview

This is a Job Portal backend API built with Node.js, Express.js, and MongoDB. The API provides endpoints for user authentication, company management, job posting, and job applications.

## Base URL

```
http://localhost:3000
```

## Authentication

Most endpoints require authentication via JWT tokens stored in HTTP-only cookies. The authentication middleware (`isAuthenticated`) validates the token from cookies and attaches the user ID to the request object (`req.id`).

### Authentication Flow

1. **Register/Login**: User receives a JWT token stored in an HTTP-only cookie
2. **Authenticated Requests**: Token is automatically sent with each request via cookies
3. **Logout**: Clears the authentication cookie

---

## API Endpoints

### 1. User Routes (`/api/v1/user`)

#### 1.1 Register User

**Endpoint:** `POST /api/v1/user/register`

**Description:** Register a new user account.

**Authentication:** Not required

**Request Body:**
- Content-Type: `multipart/form-data`
- Fields:
  ```json
  {
    "fullname": "string (required)",
    "email": "string (required, unique)",
    "phoneNumber": "number (required, unique)",
    "password": "string (required)",
    "role": "string (required, enum: ['student', 'recruiter'])",
    "file": "File (optional) - Profile photo"
  }
  ```

**Response (201 Created):**
```json
{
  "message": "User registered successfully.",
  "success": true
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields or email already registered
- `500 Internal Server Error`: Server error

---

#### 1.2 Login User

**Endpoint:** `POST /api/v1/user/login`

**Description:** Authenticate user and receive JWT token.

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "role": "string (required, enum: ['student', 'recruiter'])"
}
```

**Response (200 OK):**
- Sets HTTP-only cookie with JWT token
```json
{
  "message": "Login successful.",
  "user": {
    "_id": "string",
    "fullname": "string",
    "email": "string",
    "phoneNumber": "number",
    "role": "string",
    "profile": {
      "bio": "string",
      "skills": ["string"],
      "resume": "string (URL)",
      "resumeOriginalName": "string",
      "company": "ObjectId",
      "profilePhoto": "string (URL)"
    }
  },
  "success": true
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields
- `401 Unauthorized`: Invalid password or role mismatch
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

#### 1.3 Logout User

**Endpoint:** `GET /api/v1/user/logout`

**Description:** Logout user and clear authentication cookie.

**Authentication:** Not required

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Logout successful.",
  "success": true
}
```

**Error Responses:**
- `500 Internal Server Error`: Server error

---

#### 1.4 Update User Profile

**Endpoint:** `PUT /api/v1/user/profile/update`

**Description:** Update user profile information.

**Authentication:** Required

**Request Body:**
- Content-Type: `multipart/form-data`
- Fields:
  ```json
  {
    "fullname": "string (optional)",
    "email": "string (optional)",
    "phoneNumber": "number (optional)",
    "bio": "string (optional)",
    "skills": "string (optional, comma-separated)",
    "profilePhoto": "File (optional)",
    "resume": "File (optional)"
  }
  ```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully.",
  "user": {
    "_id": "string",
    "fullname": "string",
    "email": "string",
    "phoneNumber": "number",
    "role": "string",
    "profile": {
      "bio": "string",
      "skills": ["string"],
      "resume": "string (URL)",
      "resumeOriginalName": "string",
      "company": "ObjectId",
      "profilePhoto": "string (URL)"
    }
  },
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

---

### 2. Company Routes (`/api/v1/company`)

#### 2.1 Register Company

**Endpoint:** `POST /api/v1/company/register`

**Description:** Register a new company.

**Authentication:** Required

**Request Body:**
```json
{
  "companyName": "string (required)"
}
```

**Response (201 Created):**
```json
{
  "message": "Company registered successfully.",
  "company": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "website": "string",
    "location": "string",
    "logo": "string (URL)",
    "userId": "ObjectId",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `400 Bad Request`: Company name required or company already exists
- `401 Unauthorized`: No token provided or invalid token
- `500 Internal Server Error`: Server error

---

#### 2.2 Get All Companies

**Endpoint:** `GET /api/v1/company/get`

**Description:** Get all companies for the authenticated user.

**Authentication:** Required

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Companies fetched successfully.",
  "companies": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "website": "string",
      "location": "string",
      "logo": "string (URL)",
      "userId": "ObjectId",
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  ],
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: No companies found
- `500 Internal Server Error`: Server error

---

#### 2.3 Get Company by ID

**Endpoint:** `GET /api/v1/company/get/:id`

**Description:** Get a specific company by ID.

**Authentication:** Required

**URL Parameters:**
- `id`: Company ID (required)

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Company fetched successfully.",
  "company": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "website": "string",
    "location": "string",
    "logo": "string (URL)",
    "userId": "ObjectId",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: Company not found
- `500 Internal Server Error`: Server error

---

#### 2.4 Update Company

**Endpoint:** `PUT /api/v1/company/update/:id`

**Description:** Update company information.

**Authentication:** Required

**URL Parameters:**
- `id`: Company ID (required)

**Request Body:**
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "website": "string (optional)",
  "location": "string (optional)"
}
```

**Response (200 OK):**
```json
{
  "message": "Company updated successfully.",
  "company": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "website": "string",
    "location": "string",
    "logo": "string (URL)",
    "userId": "ObjectId",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: Company not found
- `500 Internal Server Error`: Server error

---

### 3. Job Routes (`/api/v1/job`)

#### 3.1 Post Job

**Endpoint:** `POST /api/v1/job/post`

**Description:** Create a new job posting.

**Authentication:** Required

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "requirements": "string (required, comma-separated)",
  "salary": "number (required)",
  "location": "string (required)",
  "jobType": "string (required)",
  "experience": "number (required)",
  "position": "number (required)",
  "companyId": "string (required, ObjectId)"
}
```

**Response (201 Created):**
```json
{
  "message": "Job posted successfully.",
  "job": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "requirements": ["string"],
    "salary": "number",
    "experience": "number",
    "location": "string",
    "jobType": "string",
    "position": "number",
    "company": "ObjectId",
    "created_by": "ObjectId",
    "applications": ["ObjectId"],
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields
- `401 Unauthorized`: No token provided or invalid token
- `500 Internal Server Error`: Server error

---

#### 3.2 Get All Jobs

**Endpoint:** `GET /api/v1/job/get`

**Description:** Get all jobs with optional keyword search.

**Authentication:** Required

**Query Parameters:**
- `keyword`: string (optional) - Search keyword for title or description

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Jobs fetched successfully.",
  "jobs": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "requirements": ["string"],
      "salary": "number",
      "experience": "number",
      "location": "string",
      "jobType": "string",
      "position": "number",
      "company": {
        "_id": "string",
        "name": "string",
        "description": "string",
        "website": "string",
        "location": "string",
        "logo": "string (URL)",
        "userId": "ObjectId"
      },
      "created_by": "ObjectId",
      "applications": ["ObjectId"],
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  ],
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: No jobs found
- `500 Internal Server Error`: Server error

---

#### 3.3 Get Job by ID

**Endpoint:** `GET /api/v1/job/get/:id`

**Description:** Get a specific job by ID.

**Authentication:** Required

**URL Parameters:**
- `id`: Job ID (required)

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Job fetched successfully.",
  "job": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "requirements": ["string"],
    "salary": "number",
    "experience": "number",
    "location": "string",
    "jobType": "string",
    "position": "number",
    "company": "ObjectId",
    "created_by": "ObjectId",
    "applications": ["ObjectId"],
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: Job not found
- `500 Internal Server Error`: Server error

---

#### 3.4 Get Admin Jobs

**Endpoint:** `GET /api/v1/job/admin/get`

**Description:** Get all jobs posted by the authenticated admin/recruiter.

**Authentication:** Required

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Jobs fetched successfully.",
  "jobs": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "requirements": ["string"],
      "salary": "number",
      "experience": "number",
      "location": "string",
      "jobType": "string",
      "position": "number",
      "company": "ObjectId",
      "created_by": "ObjectId",
      "applications": ["ObjectId"],
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  ],
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: No jobs found
- `500 Internal Server Error`: Server error

---

### 4. Application Routes (`/api/v1/application`)

#### 4.1 Apply for Job

**Endpoint:** `GET /api/v1/application/apply/:id`

**Description:** Apply for a job posting.

**Authentication:** Required

**URL Parameters:**
- `id`: Job ID (required)

**Request Body:** None

**Response (201 Created):**
```json
{
  "message": "Application submitted successfully.",
  "newApplication": {
    "_id": "string",
    "job": "ObjectId",
    "applicant": "ObjectId",
    "status": "string (enum: ['pending', 'accepted', 'rejected'])",
    "resumeUrl": "string",
    "coverLetter": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `400 Bad Request`: Job ID required or already applied
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: Job not found
- `500 Internal Server Error`: Server error

---

#### 4.2 Get Applied Jobs

**Endpoint:** `GET /api/v1/application/applied`

**Description:** Get all jobs applied by the authenticated user.

**Authentication:** Required

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Applications fetched successfully.",
  "applications": [
    {
      "_id": "string",
      "job": {
        "_id": "string",
        "title": "string",
        "description": "string",
        "requirements": ["string"],
        "salary": "number",
        "experience": "number",
        "location": "string",
        "jobType": "string",
        "position": "number",
        "company": {
          "_id": "string",
          "name": "string",
          "description": "string",
          "website": "string",
          "location": "string",
          "logo": "string (URL)"
        },
        "created_by": "ObjectId",
        "applications": ["ObjectId"],
        "createdAt": "Date",
        "updatedAt": "Date"
      },
      "applicant": "ObjectId",
      "status": "string",
      "resumeUrl": "string",
      "coverLetter": "string",
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  ],
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: No applications found
- `500 Internal Server Error`: Server error

---

#### 4.3 Get Applicants for Job

**Endpoint:** `GET /api/v1/application/:id/applicants`

**Description:** Get all applicants for a specific job (for recruiters/admins).

**Authentication:** Required

**URL Parameters:**
- `id`: Job ID (required)

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Applicants fetched successfully.",
  "job": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "requirements": ["string"],
    "salary": "number",
    "experience": "number",
    "location": "string",
    "jobType": "string",
    "position": "number",
    "company": "ObjectId",
    "created_by": "ObjectId",
    "applications": [
      {
        "_id": "string",
        "job": "ObjectId",
        "applicant": {
          "_id": "string",
          "fullname": "string",
          "email": "string",
          "phoneNumber": "number",
          "role": "string",
          "profile": {
            "bio": "string",
            "skills": ["string"],
            "resume": "string (URL)",
            "resumeOriginalName": "string",
            "company": "ObjectId",
            "profilePhoto": "string (URL)"
          }
        },
        "status": "string",
        "resumeUrl": "string",
        "coverLetter": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
      }
    ],
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: Job not found
- `500 Internal Server Error`: Server error

---

#### 4.4 Update Application Status

**Endpoint:** `POST /api/v1/application/status/:id/update`

**Description:** Update the status of a job application (for recruiters/admins).

**Authentication:** Required

**URL Parameters:**
- `id`: Application ID (required)

**Request Body:**
```json
{
  "status": "string (required, enum: ['pending', 'accepted', 'rejected'])"
}
```

**Response (200 OK):**
```json
{
  "message": "Status updated successfully.",
  "application": {
    "_id": "string",
    "job": "ObjectId",
    "applicant": "ObjectId",
    "status": "string",
    "resumeUrl": "string",
    "coverLetter": "string",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "success": true
}
```

**Error Responses:**
- `400 Bad Request`: Status is required
- `401 Unauthorized`: No token provided or invalid token
- `404 Not Found`: Application not found
- `500 Internal Server Error`: Server error

---

## Common Error Response Format

All error responses follow this format:

```json
{
  "message": "Error message description",
  "success": false
}
```

## Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Notes

1. **JWT Token**: Tokens are stored in HTTP-only cookies and expire after 1 day
2. **File Uploads**: Profile photos and resumes are uploaded to Cloudinary
3. **Requirements Field**: In job posting, requirements should be comma-separated and will be converted to an array
4. **Skills Field**: In profile update, skills should be comma-separated and will be converted to an array
5. **CORS**: API is configured to accept requests from `http://localhost:5173`
6. **Database**: Uses MongoDB with Mongoose ODM
7. **Password**: Passwords are hashed using bcryptjs before storage

