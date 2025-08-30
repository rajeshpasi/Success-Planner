# Success Planner Frontend - Backend Integration Guide

## 🚀 Overview

This guide explains how to connect your React Frontend with the Node.js/Express Backend for the Success Planner application.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (running locally or cloud)
- Backend server running

## 🛠️ Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the Frontend root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Google OAuth (if using)
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Other environment variables
VITE_APP_NAME=Success Planner
VITE_APP_VERSION=1.0.0
```

### 2. Install Dependencies

```bash
cd Frontend
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔗 Backend Connection Setup

### 1. Backend Server Configuration

Ensure your backend is running on `http://localhost:5000` and has CORS configured:

```javascript
// In Backend/app.js
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
```

### 2. API Base Configuration

The frontend uses axios for API calls. The base configuration is in `src/utility/apiCall.js`:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Enable sending cookies with requests
});
```

## 📡 API Integration Examples

### 1. Authentication APIs

#### Login

```javascript
// src/utility/apiCall.js
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Usage in component
import { loginUser } from "../utility/apiCall";

const handleLogin = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    // Handle successful login
    console.log(response.data);
  } catch (error) {
    // Handle error
    console.error("Login failed:", error.response?.data);
  }
};
```

#### Register

```javascript
export const registerUser = (userData) => api.post("/auth/register", userData);
```

#### Get User Profile

```javascript
export const getUserProfile = () => api.get("/auth/profile");
```

### 2. Planner/Task APIs

#### Create Task

```javascript
export const createTask = (taskData) => api.post("/tasks", taskData);
```

#### Get All Tasks

```javascript
export const getTasks = (filters = {}) =>
  api.get("/tasks", { params: filters });
```

#### Update Task

```javascript
export const updateTask = (taskId, updates) =>
  api.put(`/tasks/${taskId}`, updates);
```

#### Delete Task

```javascript
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);
```

### 3. Dashboard APIs

#### Get Dashboard Data

```javascript
export const getDashboardData = () => api.get("/dashboard");
```

#### Get Monthly Progress

```javascript
export const getMonthlyProgress = (month, year) =>
  api.get(`/dashboard/monthly?month=${month}&year=${year}`);
```

## 🔐 Authentication Flow

### 1. JWT Token Management

```javascript
// Add to apiCall.js
// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### 2. Protected Routes

```javascript
// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { getUserProfile } from "../utility/apiCall";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserProfile();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

## 📊 Data Fetching Patterns

### 1. Using React Query (Recommended)

```bash
npm install @tanstack/react-query
```

```javascript
// src/App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

```javascript
// src/hooks/useTasks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../utility/apiCall";

export const useTasks = (filters) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTasks(filters),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};
```

### 2. Using useState and useEffect

```javascript
// src/components/TaskList.jsx
import { useState, useEffect } from "react";
import { getTasks } from "../utility/apiCall";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await getTasks();
        setTasks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>{task.title}</div>
      ))}
    </div>
  );
};
```

## 🎨 Error Handling

### 1. Global Error Handler

```javascript
// src/utility/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return `Bad Request: ${data.message}`;
      case 401:
        return "Unauthorized. Please login again.";
      case 403:
        return "Access forbidden.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return data.message || "An error occurred.";
    }
  } else if (error.request) {
    // Network error
    return "Network error. Please check your connection.";
  } else {
    // Other error
    return error.message || "An unexpected error occurred.";
  }
};
```

### 2. Loading States

```javascript
// src/components/LoadingSpinner.jsx
const LoadingSpinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
      ></div>
    </div>
  );
};
```

## 🔧 Development Best Practices

### 1. Environment Variables

- Always use `VITE_` prefix for Vite environment variables
- Never commit sensitive data to version control
- Use different .env files for different environments

### 2. API Organization

- Group related API calls in separate files
- Use consistent naming conventions
- Implement proper error handling

### 3. State Management

- Use React Query for server state
- Use Context API or Redux for global client state
- Keep component state minimal

### 4. Performance

- Implement proper loading states
- Use React.memo for expensive components
- Implement proper caching strategies

## 🚀 Deployment

### 1. Build for Production

```bash
npm run build
```

### 2. Environment Variables for Production

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
```

### 3. CORS Configuration for Production

Update your backend CORS settings:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend-domain.com", "http://localhost:5173"],
    credentials: true,
  })
);
```

## 📝 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure backend CORS is properly configured
2. **Authentication Issues**: Check token storage and API headers
3. **Environment Variables**: Verify VITE\_ prefix and .env file location
4. **Network Errors**: Check if backend server is running

### Debug Tips:

1. Check browser Network tab for API calls
2. Use console.log for debugging API responses
3. Verify environment variables in browser console
4. Check backend logs for server-side errors

## 📚 Additional Resources

- [Axios Documentation](https://axios-http.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Note**: This guide assumes your backend is running on `http://localhost:5000`. Adjust the URLs according to your actual backend configuration.
