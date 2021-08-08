import styled from 'styled-components';
import LandingPage from '../components/LandingPage/LandingPage';

const HomePage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: 10px solid #000;
`;

// This will serve as the landing page
export default function Home() {
  return (
    <HomePage>
      <LandingPage />
    </HomePage>
  );
}
