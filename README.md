# Infloso

A full-stack application for … (add a short description of your project here)

## 📥 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Git](https://git-scm.com/) installed
- **Node.js** (v16+) or **Bun** runtime installed globally
- A running PostgreSQL instance and a database created for this project

### Clone the repository

```bash
git clone https://github.com/Rithik-93/Infloso.git
cd Infloso
```

## ⚙️ Backend Setup

1. **Install dependencies**

   Using Bun:
   ```bash
   cd backend
   bun install
   ```

   Or if you prefer npm/yarn:
   ```bash
   cd backend
   npm install
   # or yarn install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   ```

3. **Prisma setup**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Build & run the backend**

   Compile TypeScript and start the server:
   ```bash
   bunx tsc -b
   node src/app.ts
   ```

   The backend will run on `http://localhost:3000` (or the port defined in your `.env`).

## 🎨 Frontend Setup

1. **Install dependencies**

   ```bash
   cd ../client
   bun install
   ```

2. **Start the development server**

   ```bash
   bun dev
   ```

   This will start your frontend on `http://localhost:8080`.

3. **Open in browser**

   Navigate to:
   ```
   http://localhost:8080
   ```

## 🚀 Usage

- Use the backend API routes at `http://localhost:3000/api/...`
- The frontend will interact with these endpoints automatically.

## 🔧 Common Commands

| Task                 | Command                                |
| -------------------- | -------------------------------------- |
| Install deps (backend)  | `bun install` or `npm install`       |
| Setup env             | `cp .env.example .env`                 |
| Run migrations       | `npx prisma migrate dev --name init`   |
| Generate Prisma client | `npx prisma generate`                |
| Build backend        | `bunx tsc -b`                          |
| Start backend        | `node src/app.ts`                      |
| Install deps (client)  | `bun install`                        |
| Start frontend       | `bun dev`                              |

## 📄 License

Specify your license here.
