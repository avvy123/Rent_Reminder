# 🏠 Rent Reminder System

A full-stack **Rent Management & Reminder System** designed for landlords and tenants to manage rent records, track payments, and automate rent workflows.

---

## 🚀 Features

### 👨‍💼 Landlord

* Add & manage tenants
* Automatically generate rent records on tenant creation
* View rent history per tenant
* Track:

  * Total tenants
  * Monthly income
  * Pending payments
* Mark rent as Paid / Unpaid

---

### 👤 Tenant

* View current rent
* Check due date & payment status
* View rent history
* Clean personal dashboard

---

### 🔐 Authentication & Authorization

* Role-based login (Landlord / Tenant)
* JWT Authentication
* Protected routes (Frontend + Backend)

---

## 🧠 Core Business Logic

### ✅ Auto Rent Creation

* When a tenant is created → a rent record is automatically generated

### ✅ Smart Date Handling

* `Month` → for grouping (YYYY-MM)
* `RentDate` → actual record creation date
* `DueDate` → next month based on tenant due day

### ✅ Status System

* `Unpaid`
* `Paid`
* (UI handles Pending / Overdue logic)

---

## 🏗️ Tech Stack

### 🔹 Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Context API (Auth)
* Axios / Fetch API

### 🔹 Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* JWT Authentication

---

## 📂 Project Structure

### Frontend

```
app/
 ├── dashboard/
 │   ├── landlord/
 │   ├── tenant/
 ├── profile/
components/
context/
services/
utils/
```

### Backend

```
Controllers/
Services/
Repositories/
Models/
DTOs/
Middleware/
```

---

## 🔗 API Endpoints (Key)

### Auth

* `POST /api/auth/login`
* `POST /api/auth/register`

### Tenants

* `GET /api/tenants`
* `POST /api/tenants`
* `GET /api/tenants/me/rents`

### Rents

* `GET /api/rents/tenant/{tenantId}`
* `POST /api/rents`
* `PUT /api/rents/{id}`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd rent-reminder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`appsettings.json`)

* Database connection string
* JWT Secret Key

### Frontend (`.env`)

```
NEXT_PUBLIC_API_URL=http://localhost:5201/api
```

---

## 🎯 Key Highlights

* Clean **Repository-Service pattern**
* Proper **DTO usage (no circular JSON issues)**
* Role-based UI rendering
* Scalable routing structure
* Real-world rent lifecycle logic

---

## 🚀 Future Improvements

* 📊 Dashboard analytics (charts)
* 🔔 Email / SMS rent reminders
* 📅 Auto-generate monthly rent
* 📱 Mobile responsiveness enhancements
* 🔐 Change password & profile update APIs

---

## 💡 Learning Outcomes

This project demonstrates:

* Full-stack development
* API design & architecture
* State management
* Authentication & authorization
* Real-world business logic implementation

---

## 👨‍💻 Author

**Avinash Kumar**

---

## ⭐ Final Note

This is not just a CRUD project —
it simulates a **real rent management system with automation and business logic**, making it production-ready in design and architecture.

---
