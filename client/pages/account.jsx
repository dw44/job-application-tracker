import styled from 'styled-components';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

import FullScreenContainer from '../styles/styled-components/FullScreenContainer';

const PageContainer = styled(FullScreenContainer)`
  background-color: ${(props) => props.theme.colors.mainBg};
  font-family: ${(props) => props.theme.fonts.main};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/workspacebg.svg');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const FormsContainer = styled.div`
  padding: 24px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.85);
  max-width 540px;
  width:100%;
  max-height: 640px;
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    color: ${(props) => props.theme.colors.textLight};
    font-weight: 700;
    font-size: 1.7rem;
    text-align: center;
    @media only screen and (min-width: 540px) {
      font-size: 2.6rem;
    }
  }

  .form-type {
    margin: 1rem 0;
    display: flex;

    button {
      flex: 1;
      height: 80px;
      border: none;
      font-family: inherit;
      font-weight: 800;
      font-size: 1rem;
      cursor: pointer;
      background-color: ${(props) => props.theme.colors.mainBg};
      color: ${(props) => props.theme.colors.textDark};
    }
    
    button:nth-of-type(1) {
      border-radius: 6px 0 0 6px;
      background-color: blueviolet;
    }

    button:nth-of-type(2) {
      border-radius: 0 6px 6px 0;
    }
  }
`;

export default function Home() {
  return (
    <PageContainer>
      <FormsContainer>
        <h1>Job Application Tracker</h1>
        <div className="form-type">
          <button type="button">Create Account</button>
          <button type="button">Sign In</button>
        </div>
        <LoginForm />
      </FormsContainer>
    </PageContainer>
  );
}

//  TODO: toggle form-type button bg color based on current value
