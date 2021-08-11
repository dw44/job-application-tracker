/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import Head from 'next/head';

import Button from '../../styles/styled-components/Button';
import Form from '../../styles/styled-components/Form';
import FormGroup from '../../styles/styled-components/FormGroup';

export default function SignupForm() {
  return (
    <Form>
      <Head>
        <title>Create Account</title>
      </Head>
      <h2>Create New Account</h2>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="you@you.com" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="username">Password</label>
        <input type="password" name="password" id="password" placeholder="Password" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="question">Secret Question</label>
        <input type="text" name="question" id="question" placeholder="Secret Question" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="username">Username</label>
        <input type="text" name="answer" id="answer" placeholder="Secret Answer" />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
