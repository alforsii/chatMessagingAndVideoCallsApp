import React from "react";
import styled from "styled-components";
import { boxShadow } from "../../global/styleHelperFunctions";

export function ModeButton({ updateState, mode }) {
  return (
    <ModeButtonEl.Label>
      <ModeButtonEl.Input
        onClick={(e) => {
          //   const checked = e.currentTarget.checked;
          console.log(mode);
          if (mode === "dark") {
            updateState({ defaultMode: "light" });
          } else {
            updateState({ defaultMode: "dark" });
          }
        }}
        type="checkbox"
      />
      <ModeButtonEl.Slider></ModeButtonEl.Slider>
    </ModeButtonEl.Label>
  );
}

const white = "#fff";
const dark = "#121212";
const ModeButtonEl = {
  Label: styled.label`
    width: 40px;
    height: 22px;
    position: relative;
    display: inline-block;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  `,
  Input: styled.input`
    width: 0;
    height: 0;
    opacity: 0;
    :checked {
      + span {
        :before {
          content: "";
          position: absolute;
          left: 2px;
          bottom: 2px;
          height: 18px;
          width: 18px;
          background-color: ${dark};
          -webkit-transition: 0.4s;
          transition: 0.4s;
          -webkit-transform: translateX(18px);
          -ms-transform: translateX(18px);
          transform: translateX(18px);
        }
      }
    }
  `,
  Slider: styled.span`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    border-radius: 34px;
    transition: 0.4s;
    -webkit-transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.primary};
    ${boxShadow}
    :before {
      content: "";
      position: absolute;
      left: 2px;
      bottom: 2px;
      width: 18px;
      height: 18px;
      transition: 0.4s;
      border-radius: 50%;
      -webkit-transition: 0.4s;
      background-color: ${white};
    }
  `,
};
