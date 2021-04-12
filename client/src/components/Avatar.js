import React from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";

const AvatarEl = styled(Image)`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  border: 2px solid;
  border-color: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.text : theme.colors.primary};
  cursor: pointer;
`;
const Container = styled.div`
  position: relative;
`;
// const badgeColor = "#5ad539";

export function StyledAvatar(props) {
  const { badgeColor, badgeStyle } = props;
  return (
    <Container style={{ width: props.width, height: props.height }}>
      <AvatarEl {...props} />
      <div
        style={{
          position: "absolute",
          right: "0px",
          bottom: "0px",
          width: "12px",
          height: "12px",
          background: badgeColor ? badgeColor : "#5ad539",
          borderRadius: "50%",
          border: "1px solid #fff",
          ...badgeStyle,
        }}
      ></div>
    </Container>
  );
}
