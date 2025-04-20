import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #1A1A1A;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  min-height: 100vh;
  background-color: white;
`;

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
}