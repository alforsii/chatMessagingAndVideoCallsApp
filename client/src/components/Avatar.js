import React from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";

const borderSize = (size) => {
  return `${size}px solid`;
};

const AvatarEl = styled(Image)`
  width: ${({ width }) => (width ? width : "35px")};
  height: ${({ height }) => (height ? height : "35px")};
  border: ${({ border }) => (border ? borderSize(border) : 0)};
  border-color: ${({ theme }) =>
    theme.name === "dark" ? theme.colors.text : theme.colors.primary};
  cursor: pointer;
`;

export default function StyledAvatar(props) {
  const { src, width, height } = props;
  return <AvatarEl src={src} width={width} height={height} {...props} />;
}
