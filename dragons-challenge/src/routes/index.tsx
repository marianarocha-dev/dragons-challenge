import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { DragonsList } from '../features/dragons/pages/DragonsList';
import { CreateDragon } from '../features/dragons/pages/CreateDragon';
import { DragonGenerator } from '../features/dragons/pages/DragonGenerator';
import { Profile } from '../features/profile/pages/Profile';
import { PrivateRoute } from '../features/auth/components/PrivateRoute';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rotas publicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* rotas protegidas */}
        <Route
          path="/dragons"
          element={
            <PrivateRoute>
              <DragonsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/dragons/new"
          element={
            <PrivateRoute>
              <CreateDragon />
            </PrivateRoute>
          }
        />
        <Route
          path="/dragons/generator" 
          element={
            <PrivateRoute>
              <DragonGenerator />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* redireciona para login se tentar acessar a raiz */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}