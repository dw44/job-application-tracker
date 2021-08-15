/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from 'next/head';
import styled from 'styled-components';

import Button from '../../styles/styled-components/Button';
import Form from '../../styles/styled-components/Form';
import FormGroup from '../../styles/styled-components/FormGroup';

const BlockButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;

const ForgotPassword = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 1rem;
  transition: text-decoration 0.8s;
  width: auto;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginForm() {
  return (
    <Form>
      <Head>
        <title>Sign In</title>
      </Head>
      <Form>
        <h2>Sign In</h2>
        <FormGroup>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="username">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" />
        </FormGroup>
        <BlockButton>Sign In</BlockButton>
        <ForgotPassword href="/">
          Forgot Password
        </ForgotPassword>
      </Form>
    </Form>
  );
}
