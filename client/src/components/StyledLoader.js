import styled, { keyframes } from "styled-components";
import { ImSpinner3 } from "react-icons/im";

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(500deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 0.5s linear infinite;
  transform: translateZ(0);
  overflow: hidden;
`;
export default function StyledLoader() {
  // Here we create a component that will rotate everything we pass in over two seconds

  return (
    <Rotate>
      <ImSpinner3 />
    </Rotate>
  );
}
