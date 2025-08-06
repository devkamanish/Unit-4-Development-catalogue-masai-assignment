
vedio link -> "https://www.loom.com/share/c115b28e210b444fb71cacff8fa8a513"

# 🔐 Authentication vs 🔓 Authorization



Understanding the key difference between **Authentication** and **Authorization** is important when building secure applications.

---

## 🔑 What is Authentication?

> **Authentication asks:** _"Who are you?"_

**Purpose:** To verify the **identity** of a user.

### 🔍 How it works:
- Username & Password
- OTP (One-Time Password)
- Biometrics (Fingerprint, Face Scan)
- Third-party Login (e.g., Google, GitHub)

### ✅ Example:
When a user logs in with their credentials, the system authenticates them to confirm they are real and valid.

---

## 🔐 What is Authorization?

> **Authorization asks:** _"What are you allowed to do?"_

**Purpose:** To define and control **what resources or features a user can access** after authentication.

### 🔍 How it works:
- Role-based Access Control (RBAC)
- Permissions (Read, Write, Delete, Admin)

### ✅ Example:
Once a user is logged in:
- If they are an **admin**, they can access the admin dashboard.
- If they are a **regular user**, they are restricted to their profile or personal settings.

---

## 📊 Comparison Table

| Feature           | Authentication                 | Authorization                   |
|------------------|----------------------------------|----------------------------------|
| **Definition**    | Verifies **who you are**        | Verifies **what you can access** |
| **Happens First?**| ✅ Yes                          | 🚫 No, only after authentication |
| **Based on?**     | Credentials (username, password)| Roles/Permissions               |
| **Example**       | Login page                      | Admin page access               |

---

## 🎥 Watch the Explanation

Check out the video tutorial for a visual understanding:  
👉  "https://www.loom.com/share/c115b28e210b444fb71cacff8fa8a513"

---

## 💡 Real-Life Analogy

Imagine a **movie theater**:
- 🎟️ **Authentication** = Showing your ticket to prove you have one.
- 🚪 **Authorization** = Being allowed to enter **only** the screen number printed on your ticket.

---

## 🧠 Summary

- Authentication is about **verifying identity**.
- Authorization is about **granting access** based on that identity.
- Both are crucial for building secure web apps or systems.

---

> _Built for educational purposes. Suitable for beginners learning about web security._ ✨
