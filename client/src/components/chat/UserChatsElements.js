import styled from "styled-components";
import { myColors } from "../../global/colors";
import { boxShadow } from "../../global/styleHelperFunctions";

export const UserChatsEl = {
  Container: styled.div`
    background-color: ${myColors.primaryColor2};
    height: 100vh;
    border-right: 1px solid ${myColors.primaryColor3};
  `,
  Header: styled.header`
    font-size: 1.2rem;
    text-transform: capitalize;
    background-color: ${myColors.primaryColor};
    padding: 10px;
    font-style: italic;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    z-index: 9;
    color: ${myColors.white};
    i {
      font-size: 10px;
    }
  `,
  Input: styled.input`
    /* background-color: ${myColors.primaryColor}; */
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-style: italic;
    padding-left: 10px;
    outline: 0;
    ::placeholder {
      color: ${myColors.silver};
    }
  `,
  Label: styled.label`
    cursor: pointer;
  `,
  Menu: styled.ul`
    background-color: ${myColors.primaryColor};
    margin: 0;
    padding: 0;
    height: calc(100vh - 100px);
    box-sizing: border-box;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `,
  SubMenu: styled.div`
    display: flex;
    position: relative;
    /* flex-wrap: wrap; */

    &:hover {
      background-color: ${myColors.primaryColor3};
      cursor: pointer;
    }
    a:nth-child(2) {
      padding-left: 20px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      text-decoration: none;
    }
    a:nth-child(2) li {
      &:hover {
        color: ${myColors.blue};
        ${boxShadow};
      }
    }
    li.active {
      color: ${myColors.blue};
    }
    li:nth-child(3) {
      position: absolute;
      font-size: 10px;
    }
  `,
  Item: styled.li`
    color: ${myColors.silver};
    padding: 10px;
    background-color: "red";
    list-style: none;
    font-size: 14px;
    a {
      color: ${myColors.blue};

      &:hover {
        color: ${myColors.white};
        text-decoration: none;
      }
    }
  `,
};
