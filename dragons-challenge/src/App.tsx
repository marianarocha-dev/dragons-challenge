import { Router } from './routes';
import { GlobalStyle } from './shared/styles/globalstyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;