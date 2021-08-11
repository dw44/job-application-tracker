import styled from 'styled-components';

const Form = styled.form`
  color: ${(props) => props.theme.colors.textLight};
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  text-align: center;

  h2 {
    font-weight: 600;
    font-size: 1.3rem;
    text-align: center;
    @media only screen and (min-width: 540px) {
      font-size: 2.2rem;
    }
  }
`;

export default Form;
