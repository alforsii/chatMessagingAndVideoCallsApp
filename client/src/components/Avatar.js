import React from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { myColors } from "../global/colors";

const borderSize = (size) => {
  return `${size}px solid`;
};

const size = (arg) => {
  switch (arg) {
    case "bg":
      return `3px solid ${myColors.silver}`;
    case "md":
      return `2px solid ${myColors.silver}`;
    case "sm":
      return `2px solid ${myColors.silver}`;
    default:
      return "none";
  }
};

const AvatarEl = styled(Image)`
  width: ${({ width }) => (width ? width : "35px")};
  height: ${({ height }) => (height ? height : "35px")};
  border: ${({ border }) => (border ? borderSize(border) : 0)};
  border-color: ${myColors.silver};
  cursor: pointer;
`;

export default function StyledAvatar(props) {
  const { src, width, height } = props;
  return <AvatarEl src={src} width={width} height={height} {...props} />;
}
