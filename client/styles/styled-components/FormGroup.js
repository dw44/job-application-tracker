import styled from 'styled-components';

const FormGroup = styled.div`
  margin: 16px 0;
  label {
    display: inline-block;
    width: 100%;
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 1.1rem;
    text-align: center;
  }
  input {
    width: 100%;
    border: none;
    background-color: ${(props) => props.theme.colors.mainBg};
    height: 36px;
    border-radius: 4px;
    padding: 10px;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export default FormGroup;
