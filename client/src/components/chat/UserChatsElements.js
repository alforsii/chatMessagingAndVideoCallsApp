import styled from "styled-components";
import { boxShadow, breakWords } from "../../global/styleHelperFunctions";

export const navbarHeight = "50px";
export const UserChatsEl = {
  Container: styled.div`
    /* background-color: ${({ theme }) => theme.colors.body.secondary}; */
    /* border-right: 1px solid ${({ theme }) => theme.colors.body.primary}; */
    transition: 0.3s ease-in-out;
    /* height: 85vh; */
    height: 100%;
    padding: 10px;
    /* margin: 20px; */
    /* display: ${({ theme }) => (theme.show === "chats" ? "none" : "grid")}; */
  `,
  Header: styled.header`
    font-size: 1.2rem;
    text-transform: capitalize;
    position: relative;
    font-style: italic;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    z-index: 9;
    color: ${({ theme }) => theme.colors.text};
    i {
      font-size: 10px;
    }
  `,
  Form: styled.form`
    width: 100%;
  `,
  Input: styled.input`
    background-color: ${({ theme }) => theme.colors.body.secondary};
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    font-size: 16px;
    font-style: italic;
    padding: 7px 30px 7px 30px;
    border-radius: 8px;
    margin-bottom: 2px;
    outline: 0;
    width: 100%;
    ::placeholder {
      color: ${({ theme }) => theme.colors.text};
      width: 80%;
      opacity: 0.4;
    }
    :focus {
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  Label: styled.label`
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 7px;
  `,
  InputIcon: styled.div`
    cursor: pointer;
    position: absolute;
    top: 7px;
    right: 7px;
  `,
  Menu: styled.ul`
    margin: 0;
    padding: 0;
    /* max-width: 290px; */
    /* height: calc(100vh - 100px); */
    /* height: calc(100vh - ${navbarHeight}); */
    height: calc(85vh - ${navbarHeight});
    /* max-height: 85vh; */
    overflow: scroll;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
  `,
  SubMenu: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    /* border-bottom: 1px solid ${({ theme }) => theme.colors.body.primary}; */
    /* border-bottom: 1px solid ${({ theme }) => theme.colors.body.primary}; */
    /* &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.body.primary};
      cursor: pointer;
    } */
    a:nth-child(2) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /* width: 100%; */

      text-decoration: none;
      li {
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
    .active {
      color: ${({ theme }) => theme.colors.primary};
    }
    flex-wrap: wrap;
    border-radius: 10px;
    padding: 20px;
    margin: 5px 0;
    border-bottom: 3px solid ${({ theme }) => theme.colors.body.primary};
    background-color: ${({ theme }) => theme.colors.body.secondary};
    &:hover {
      border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
      /* background-color: ${({ theme }) => theme.colors.body.primary}; */
      cursor: pointer;
      /* ${boxShadow} */
    }
  `,
  Item: styled.li`
    color: ${({ theme }) => theme.colors.text};
    list-style: none;
    letter-spacing: 0.5px;
    font-size: 14px;
    /* width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
    ${breakWords}
    :nth-child(1) {
      padding-right: 0;
    }
    a {
      color: ${({ theme }) => theme.colors.text};
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
      }
    }
  `,
};
