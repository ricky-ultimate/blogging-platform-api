# Personal Blogging Platform API

This project is a RESTful API for a personal blogging platform built with **NestJS** and **PostgreSQL** using **Prisma** as the ORM. The API allows users to create, update, delete, and retrieve blog posts with search functionality.

---

## Features

- **Create** a new blog post.
- **Update** an existing blog post.
- **Delete** an existing blog post.
- **Get** a single blog post by its ID.
- **Get all** blog posts with an optional search filter.
- **Search** blog posts by title, content, or category.

---

## Technologies Used

- **NestJS** - A progressive Node.js framework for building efficient APIs.
- **PostgreSQL** - Relational database to store blog posts.
- **Prisma** - Modern ORM for database management.
- **Class Validator** - For request body validation.

---

## API Endpoints

| **Method** | **Endpoint**      | **Description**                         |
|------------|-------------------|-----------------------------------------|
| `POST`     | `/posts`          | Create a new blog post.                 |
| `PUT`      | `/posts/:id`      | Update an existing blog post by ID.     |
| `DELETE`   | `/posts/:id`      | Delete a blog post by ID.               |
| `GET`      | `/posts/:id`      | Retrieve a single blog post by ID.      |
| `GET`      | `/posts`          | Retrieve all blog posts.                |
| `GET`      | `/posts?term=xyz` | Search posts by title, content, or category. |

---

## Request Body Examples

### Create a Blog Post

```json
POST /posts
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

### Update a Blog Post

```json
PUT /posts/1
{
  "title": "My Updated Blog Post",
  "content": "This is the updated content.",
  "category": "Technology",
  "tags": ["Tech", "Updated"]
}
```

---

## Running the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ricky-ultimate/blogging-platform-api.git
   cd blogging-platform-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Update `DATABASE_URL` in `.env` file with your PostgreSQL connection string.
   - Run the following commands:
     ```bash
     npx prisma generate
     ```

4. **Run the application:**
   ```bash
   npm run start:dev
   ```

---

## Future Enhancements

- Pagination for retrieving blog posts.
- User authentication and authorization.
- Unit tests for controllers and services.
