import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 280px;
  height: 100vh;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  padding: 2rem 0;
  color: white;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.09);
`;

const Logo = styled.div`
  text-align: center;
  padding: 0 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 1rem 2rem;
  margin-left: 20px;
  color: ${props => props.$active ? '#ffffff' : '#828080'};
  text-decoration: none;
  transition: all 0.3s ease;
  background: ${props => props.$active ?  'rgb(0, 72, 255)' : 'transparent'};
  border: none ;
  border-radius: 40px;
  cursor: pointer;
  text-align: center;
  text-align: left;
  font-size: 1rem;
  transition: all 0.8s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 13px;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #6E97FF;
    color: white;
    border: none;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  padding: 0.8rem;
  background: white;
  color: #828080;
  border: 1px solid #eeeeee;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.8s ease;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 13px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  text-align: center;

  &:hover {
    background: linear-gradient(90deg, #0048FF 0%, #FF8BF3 100%);
    color: white;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  }
`;

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    }
  };

  return (
    <SidebarContainer>
      <Logo><img src="dragons-logo.svg" alt="logo" /></Logo>
      <NavList>
        <NavItem 
          onClick={() => handleNavigation('/dragons')} 
          $active={location.pathname === '/dragons'}
        >
          Lista de Dragões
        </NavItem>
        <NavItem 
          onClick={() => handleNavigation('/dragons/new')} 
          $active={location.pathname === '/dragons/new'}
        >
          Cadastrar Dragão
        </NavItem>
        <NavItem 
          onClick={() => handleNavigation('/dragons/generator')} 
          $active={location.pathname === '/dragons/generator'}
        >
          Gerador de Dragões
        </NavItem>
        <NavItem 
          onClick={() => handleNavigation('/profile')} 
          $active={location.pathname === '/profile'}
        >
          Meu Perfil
        </NavItem>
      </NavList>
      <LogoutButton onClick={handleLogout}>
        Sair
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;