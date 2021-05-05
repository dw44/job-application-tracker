import styled from 'styled-components';

import LandingPage from './components/LandingPage';

function App() {
  const AppContainer = styled.div`
    height: 100vh;
    min-height: 480px;
    width: 100vw;
    min-with: 360px;
  `;

  return (
    <AppContainer>
      <LandingPage />
    </AppContainer>
  );
}

export default App;
