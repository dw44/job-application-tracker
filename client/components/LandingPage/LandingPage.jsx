import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import Button from '../../styles/styled-components/Button';

const Landing = styled.div`
  background-color: transparent;
  padding: 1rem;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-width: 1024px;
  text-align: center;

  & * {
    font-family: ${(props) => props.theme.fonts.main};
  }
`;

const Header = styled.header`
  width: 100%;
  height: 130px;
  display: flex; 
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  img {
    cursor: pointer;
    height: 120px;
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    button { margin: 6px}
    @media only screen and (min-width: 480px) {
      flex-direction: row;
    }
  }
`;

const LandingPageContent = styled.div`
  width: 100%;

  h1 {
    font-size: 1.32rem;
    font-weight: 800;
    margin: 1rem;

    @media only screen and (min-width: 480px) {
      font-size: 2rem;
    }
    @media only screen and (min-width: 1024px) {
      font-size: 3.2rem;
    }
  }

  h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 1rem;
    opacity: 0.8;

    @media only screen and (min-width: 480px) {
      font-size: 1.25rem;
    }
    
    @media only screen and (min-width: 1024px) {
      font-size: 2rem;
    }
  }

  h1, h2 {
    @media only screen and (min-width: 640px) {
      margin-bottom: 2rem;
    }
  }

  .demo-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    
    @media only screen and (min-width: 640px) {
      margin-top: 1rem;
      justify-content: center;
    }

    p {
      opacity: 0.7;
      font-size: 0.75rem;
      font-weight: 600;
      display: inline-block;
      @media only screen and (min-width: 640px) {
        margin-left: 1rem;
        font-size: 1rem;
      }
    }
  }
`;

export default function LandingPage() {
  return (
    <Landing>
      <Head>
        <title>Job Application Tracker</title>
      </Head>
      <Header>
        <img
          src="/logo.png"
          alt="Job Application Tracker"
        />
        <div className="auth-container">
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </Header>
      <Image
        src="/hero.png"
        height="500"
        width="500"
        layout="intrinsic"
        alt="Job seeker going working on job applications and résumé"
      />
      <LandingPageContent>
        <h1>Job Application Tracker</h1>
        <h2>Track all your job applications through one simple app</h2>
        <div className="demo-container">
          <Button>Demo</Button>
          <p>&#40;No account or signup required&#41;</p>
        </div>
      </LandingPageContent>
    </Landing>
  );
}
