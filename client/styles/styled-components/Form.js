import styled from 'styled-components';

const Form = styled.form`
  color: ${(props) => props.theme.colors.textLight};
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  text-align: center;

  ::-webkit-scrollbar {
    width: 0.5em;
  }
   
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(225, 225, 225, 0.7);
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: #444;
    outline: 1px solid #444;
  }

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
