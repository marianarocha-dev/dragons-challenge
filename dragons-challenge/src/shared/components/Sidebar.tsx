import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  position: fixed;
  left: 0;
  top: 0;
  padding: 2rem 0;
  color: white;
`;

const Logo = styled.div`
  text-align: center;
  padding: 0 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <Logo>🐲 Dragons</Logo>
      <NavList>
        <NavItem to="/dragons" $active={location.pathname === '/dragons'}>
          Lista de Dragões
        </NavItem>
        <NavItem to="/dragons/new" $active={location.pathname === '/dragons/new'}>
          Cadastrar Dragão
        </NavItem>
        <NavItem to="/generator" $active={location.pathname === '/generator'}>
          Gerador de Dragões
        </NavItem>
        <NavItem to="/profile" $active={location.pathname === '/profile'}>
          Meu Perfil
        </NavItem>
      </NavList>
      <LogoutButton onClick={handleLogout}>
        Sair
      </LogoutButton>
    </SidebarContainer>
  );
}