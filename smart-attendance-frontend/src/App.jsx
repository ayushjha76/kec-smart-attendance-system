import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* ---------------- PAGES ---------------- */

import Login from "./pages/Login";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";

import StudentDashboard from "./pages/student/StudentDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";

/* ---------------- COMPONENTS ---------------- */

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* TEACHER ROUTE */}

        <Route
          path="/teacher"
          element={
            <ProtectedRoute
              allowedRole="teacher"
            >
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* STUDENT ROUTE */}

        <Route
          path="/student"
          element={
            <ProtectedRoute
              allowedRole="student"
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRole="admin"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;