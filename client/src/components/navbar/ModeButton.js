import { gql, useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { boxShadow } from "../../global/styleHelperFunctions";

const UPDATE_USER_THEME_QUERY = gql`
  mutation($mode: String!, $userId: ID!) {
    updateUserTheme(mode: $mode, userId: $userId) {
      id
      mode
    }
  }
`;

export function ModeButton({ updateState, state, title }) {
  const [UpdateUserTheme] = useMutation(UPDATE_USER_THEME_QUERY);

  const handleUserThemeUpdate = async (mode) => {
    try {
      if (!state.user?.id) {
        return updateState({ defaultMode: mode });
      }
      const { data, errors } = await UpdateUserTheme({
        variables: { mode, userId: state.user?.id },
      });
      if (!data) return null;
      if (errors?.length) return console.log(errors[0].message);

      updateState({ defaultMode: data.updateUserTheme.mode });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ModeButtonEl.Item>
      <ModeButtonEl.Label>{title}</ModeButtonEl.Label>
      <ModeButtonEl.Label>
        <ModeButtonEl.Input
          onClick={async (e) => {
            if (state.defaultMode === "dark") {
              handleUserThemeUpdate("light");
            } else {
              handleUserThemeUpdate("dark");
            }
          }}
          type="checkbox"
          defaultChecked={state.defaultMode === "dark" ? true : false}
        />
        <ModeButtonEl.Slider></ModeButtonEl.Slider>
      </ModeButtonEl.Label>
    </ModeButtonEl.Item>
  );
}

const light = "#fff";
const dark = "#121212";
const ModeButtonEl = {
  Item: styled.li`
    font-size: 14px;
    padding: 10px;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:hover {
      background-color: ${({ theme }) => theme.colors.body.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  Label: styled.label`
    width: 40px;
    height: 22px;
    position: relative;
    display: inline-block;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 400px) {
      display: none;
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
      background-color: ${light};
    }
  `,
};
