import styled from 'styled-components';

import FullScreenContainer from '../styles/styled-components/FullScreenContainer';
import LandingPage from '../components/LandingPage/LandingPage';

const HomePage = styled(FullScreenContainer)`
  background-color: ${(props) => props.theme.colors.mainBg};
  font-family: ${(props) => props.theme.fonts.main};
`;

// This will serve as the landing page
export default function Home() {
  return (
    <HomePage>
      <LandingPage />
    </HomePage>
  );
}
