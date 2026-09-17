import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './auth/Login/LoginPage';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout/AdminLayout';
import { TeacherLayout } from './layouts/TeacherLayout/TeacherLayout';
import { StudentLayout } from './layouts/StudentLayout/StudentLayout';
import { ClientLayout } from './layouts/ClientLayout/ClientLayout';
import { AdminDashboard } from './modules/admin/AdminDashboard';
import { TeacherDashboard } from './modules/music/TeacherDashboard';
import { StudentDashboard } from './modules/music/StudentDashboard';
import { ClientDashboard } from './modules/ecommerce/ClientDashboard';
import { EconomyDashboard } from './modules/economy/EconomyDashboard';
import { TradingDashboard } from './modules/trading/TradingDashboard';
import { LibraryDashboard } from './modules/library/LibraryDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
            <Route path="/admin/music" element={<TeacherDashboard />} />
            <Route path="/admin/economy" element={<EconomyDashboard />} />
            <Route path="/admin/ecommerce" element={<ClientDashboard />} />
            <Route path="/admin/trading" element={<TradingDashboard />} />
            <Route path="/admin/library" element={<LibraryDashboard />} />
            <Route path="/admin/prd-forge" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* TEACHER ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']} />}>
          <Route element={<TeacherLayout />}>
            <Route path="/music/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/music/teacher/zoom" element={<TeacherDashboard />} />
            <Route path="/music/teacher/students" element={<TeacherDashboard />} />
            <Route path="/music/teacher/materials" element={<TeacherDashboard />} />
          </Route>
        </Route>

        {/* STUDENT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'STUDENT']} />}>
          <Route element={<StudentLayout />}>
            <Route path="/music/student/dashboard" element={<StudentDashboard />} />
            <Route path="/music/student/classes" element={<StudentDashboard />} />
            <Route path="/music/student/materials" element={<StudentDashboard />} />
            <Route path="/music/student/progress" element={<StudentDashboard />} />
          </Route>
        </Route>

        {/* CLIENT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'CLIENT']} />}>
          <Route element={<ClientLayout />}>
            <Route path="/ecommerce/dashboard" element={<ClientDashboard />} />
            <Route path="/ecommerce/cart" element={<ClientDashboard />} />
            <Route path="/ecommerce/orders" element={<ClientDashboard />} />
            <Route path="/ecommerce/profile" element={<ClientDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
