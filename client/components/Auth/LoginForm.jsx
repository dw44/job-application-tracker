import styled from 'styled-components';
import Head from 'next/head';

import Button from '../../styles/styled-components/Button';
import Form from '../../styles/styled-components/Form';
import FormGroup from '../../styles/styled-components/FormGroup';

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
        <Button>Sign In</Button>
        <a href="/">Forgot Password</a>
      </Form>
    </Form>
  );
}
