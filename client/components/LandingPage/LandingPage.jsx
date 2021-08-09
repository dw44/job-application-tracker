import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import Button from '../../styles/styled-components/Button';

const Landing = styled.div`
  background-color: transparent;
  border: 4px solid #FF4644;
  padding: 1rem;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-width: 1024px;
  
  & > div:nth-of-type(1) {
    border: 1px solid black;
  }
`;

export default function LandingPage() {
  return (
    <Landing>
      <Head>
        <title>Job Application Tracker</title>
      </Head>
      <Button>Sign In</Button>
      <Button>Sign Up</Button>
      <Image
        src="/hero.png"
        height="600"
        width="600"
        layout="intrinsic"
        className="hero-image"
        alt="Job seeker going working on job applications and résumé"
      />
    </Landing>
  );
}
