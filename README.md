# 📌 TeamConnect – A Full-Stack Learning Project

TeamConnect is a full-stack application built to explore and learn the integration of Spring Boot (backend) with Next.js (frontend). This project serves as a hands-on learning experience for API development, user authentication, and CRUD operations.

## 🎯 Purpose of the Project

The primary goal of TeamConnect is to deepen understanding of:

- **Spring Boot** for backend development and API creation.
- **Next.js** for building a modern frontend.
- **Integration** of frontend and backend using RESTful APIs.
- **Implementing secure user authentication** with JWT (JSON Web Tokens).
- **Managing CRUD operations** for projects with proper authorization.

### Key Features:

- ✅ User authentication using JWT.
- ✅ CRUD operations (Create, Read, Update, Delete) for managing projects.
- ✅ Authorization: Users can only edit or delete their own projects.
- ✅ CORS configuration to allow communication between frontend (`localhost:3000`) and backend (`localhost:8080`).

---

## 🌐 Backend – Spring Boot

### 1️⃣ Project Structure

The backend is organized as follows:

```
backend
│── src
│   ├── main
│   │   ├── java/com/ibraheemdawod/teamconnect
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── CorsConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── UserController.java
│   │   │   │   ├── ProjectController.java
│   │   │   ├── model/
│   │   │   │   ├── User.java
│   │   │   │   ├── Project.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ProjectRepository.java
│   │   │   ├── service/
│   │   │   │   ├── UserService.java
│   │   │   │   ├── UserAuthService.java
│   │   │   │   ├── ProjectService.java
│   │   │   ├── security/
│   │   │   │   ├── JwtUtil.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── TeamConnectApplication.java
│   ├── resources/
│   │   ├── application.properties
│── pom.xml
```

### 2️⃣ Database Configuration

The backend uses PostgreSQL, configured in `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/teamconnect
spring.datasource.username=teamconnect
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.security.user.name=admin
spring.security.user.password=admin123
```

### 3️⃣ User Model

The `User` entity handles authentication data:

```java
package com.ibraheemdawod.teamconnect.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
}
```

- Uses **Lombok** (`@Getter`, `@Setter`) to reduce boilerplate code.
- Ensures email is **unique** to prevent duplicate registrations.

### 4️⃣ JWT Authentication

JWT-based authentication is implemented with `JwtUtil`:

```java
package com.ibraheemdawod.teamconnect.security;

import com.ibraheemdawod.teamconnect.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = System.getenv("JWT_SECRET_KEY");

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 3)) // 3 hours
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
```

- Stores the secret key **securely** in an **environment variable**.
- Generates and **validates JWT tokens** for user authentication.

### 5️⃣ Project Model

The `Project` entity links projects to users:

```java
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
}
```

- Uses `@ManyToOne` to associate **projects with their owners**.
- Ensures **only the owner** can edit/delete their projects.

---

## 💻 Frontend – Next.js

### 1️⃣ Login & Register Pages

The frontend includes user authentication pages integrated with the backend.

#### Register Page (`register/page.tsx`):

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    localStorage.setItem("token", data.token);
    router.push("/projects");
  } catch (err: any) {
    setError(err.message);
  }
};
```

- Stores the JWT token in **localStorage** for authenticated requests.
- Redirects to the **projects page** on successful registration.
- Displays **clear error messages** (e.g., "Email already in use").

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** (for Spring Boot)
- **Node.js 18+** (for Next.js)
- **PostgreSQL** (for the database)

### Backend Setup

```bash
git clone <repository-url>
cd backend
```

Configure `application.properties` with your PostgreSQL credentials.

Set the **JWT_SECRET_KEY** environment variable:

```bash
export JWT_SECRET_KEY=<your-secret-key>
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Accessing the Application

- **Backend**: [http://localhost:8080](http://localhost:8080)
- **Frontend**: [http://localhost:3000](http://localhost:3000)
