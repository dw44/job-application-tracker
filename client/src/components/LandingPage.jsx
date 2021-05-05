import styled from 'styled-components';

import bg from '../assets/images/bg.svg';

const LandingPageHeader = styled.header`
  width: 100%;
  height: 5rem;
  background-color: #000;
  display: flex;
  padding: 1rem;
  justify-content: space-between;
`;

const LandingPageMain = styled.main`
  width: 100%;
  height: 100%;
`;

const Hero = styled.div`
  width: 100%;
  height: 100%;
  background: url(${bg});
  border: 2px solid black;
`;

const LandingPage = () => (
  <LandingPageMain>
    <LandingPageHeader />
    <Hero />
  </LandingPageMain>
);
export default LandingPage;
