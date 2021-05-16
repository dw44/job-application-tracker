import styled from 'styled-components';

import Hamburger from './Hamburger';
import logo from '../assets/images/logo.svg';
// import bg from '../assets/images/bg.svg';

const LandingpageContainer = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LandingPageNav = styled.nav`
  width: 100%;
  height: 5rem;
  box-shadow: 0 4px 4px -4px gray;
  display: flex;
  padding: 1rem;
  justify-content: space-between;
`;

const SignupButtonContainer = styled.div`
  margin: 0 10px;
  display: inline-block;
  width: 150px;
`;

const SignupButtonLink = styled.a`
  width: 100%;
  text-align: center;
  border: none;
  background: #346d6d;
  color: #fff !important;
  font-weight: bold;
  padding: 20px;
  text-transform: uppercase;
  border-radius: 6px;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #346d6d !important;
    font-weight: 700 !important;
    letter-spacing: 3px;
    background: none;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.3s ease 0s;
  }
`;

const LandingPage = () => (
  <LandingpageContainer>
    <LandingPageNav>
      <a href="/"><img width="160" src={logo} alt="JAT" /></a>
      <div>
        <Hamburger />
        <SignupButtonContainer><SignupButtonLink>Login</SignupButtonLink></SignupButtonContainer>
        <SignupButtonContainer><SignupButtonLink>Sign Up</SignupButtonLink></SignupButtonContainer>
      </div>
    </LandingPageNav>
  </LandingpageContainer>
);
export default LandingPage;
