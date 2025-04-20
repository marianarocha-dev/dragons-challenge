import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../src/features/auth/pages/Login';
import { Register } from '../src/features/auth/pages/Register';
import { DragonsList } from '../src/features/dragons/pages/DragonsList'; // Corrigido para DragonsList
import { CreateDragon } from './features/dragons/pages/CreateDragon'; // Ajuste o caminho conforme sua estrutura
import { DragonGenerator } from './features/dragons/pages/DragonGenerator'; // Ajuste o caminho conforme sua estrutura
import { Profile } from '../src/features/profile/pages/Profile';
import { DefaultLayout } from './shared/components/DefaultLayout'; // Ajuste o caminho conforme sua estrutura
import { GlobalStyles } from './shared/styles/globalStyles'; // Corrigido para GlobalStyles

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        {/* rotas publicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* rotas protegidas dentro do DefaultLayout */}
        <Route path="/" element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        }>
          <Route path="dragons" element={<DragonsList />} />
          <Route path="dragons/new" element={<CreateDragon />} />
          <Route path="dragons/generator" element={<DragonGenerator />} />
          <Route path="profile" element={<Profile />} />
          <Route index element={<Navigate to="/dragons" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;