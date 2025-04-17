import styled from 'styled-components';
import { Sidebar } from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  margin-left: 250px; 
  width: calc(100% - 250px);
  min-height: 100vh;
  padding: 2rem;
`;

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}