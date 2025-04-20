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
  background-color: #121212;
  color: #ffffff;
`;

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default PrivateLayout;