import styled from 'styled-components';

const HamburgerContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 60px;
  height: 45px;
  position: relative;
  margin: 50px auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
`;

const HamburgerBars = styled.span`
  display: block;
  position: absolute;
  height: 9px;
  width: 50%;
  background: #346d6d;
  opacity: 1;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
`;

const Hamburger = () => {
  return (
    <HamburgerContainer>
      <HamburgerBars />
      <HamburgerBars />
      <HamburgerBars />
    </HamburgerContainer>
  );
}

export default Hamburger;