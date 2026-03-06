# Java Backend (Spring Boot)

This backend provides:
- Admin login with username/password (cookie session, no JWT)
- Admin CRUD for blogs and case studies
- Image upload and storage inside MySQL (`LONGBLOB`)
- Public APIs for published blogs/case studies and image fetch

## 1) Requirements
- Java 17+
- Maven (`mvn`)
- MySQL running

## 2) Configure database and admin credentials
Set environment variables before running:

```bash
set DATABASE_URL=jdbc:mysql://localhost:3306/brandbandhu_cms
set DATABASE_USERNAME=root
set DATABASE_PASSWORD=password
set ADMIN_USERNAME=admin
set ADMIN_PASSWORD=change_this_strong_password
set CLIENT_ORIGIN=http://localhost:5173
```

On Git Bash:

```bash
export DATABASE_URL=jdbc:mysql://localhost:3306/brandbandhu_cms
export DATABASE_USERNAME=root
export DATABASE_PASSWORD=password
export ADMIN_USERNAME=admin
export ADMIN_PASSWORD=change_this_strong_password
export CLIENT_ORIGIN=http://localhost:5173
```

## 3) Run backend

```bash
cd java-backend
mvn spring-boot:run
```

Server runs on:

`http://localhost:4000`

## 4) Core endpoints
- `GET /api/health`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/me`
- `GET /api/admin/blogs`
- `POST /api/admin/blogs` (multipart, field `image`)
- `PUT /api/admin/blogs/{id}` (multipart, field `image`)
- `DELETE /api/admin/blogs/{id}`
- `GET /api/admin/case-studies`
- `POST /api/admin/case-studies` (multipart, field `image`)
- `PUT /api/admin/case-studies/{id}` (multipart, field `image`)
- `DELETE /api/admin/case-studies/{id}`
- `GET /api/blogs`
- `GET /api/blogs/{slug}`
- `GET /api/blogs/{id}/image`
- `GET /api/case-studies`
- `GET /api/case-studies/{slug}`
- `GET /api/case-studies/{id}/image`
