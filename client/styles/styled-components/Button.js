import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.textDark};
  font-family: ${(props) => props.theme.fonts.main};
  border: none;
  font-weight: 800;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  height: 44px;
  width: 120px;
  cursor: pointer;
  transition: background-color 0.3s;
  transition: color: 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover};
    color: ${(props) => props.theme.colors.textNormal};
  }
`;

export default Button;
