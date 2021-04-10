import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const StyledSpinner = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) =>
      theme?.name ? theme.colors.body.primary : ""};
  `,
  Spinner: styled(Spinner)`
    color: ${({ theme }) => (theme?.name ? theme.colors.text : "")};
  `,
};
export function StyledLoader() {
  // Here we create a component that will rotate everything we pass in over two seconds

  return (
    <StyledSpinner.Container>
      <StyledSpinner.Spinner animation="border" />
    </StyledSpinner.Container>
  );
}
