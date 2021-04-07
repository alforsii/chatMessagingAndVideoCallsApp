import styled from "styled-components";

export const UserChatsEl = {
  Container: styled.div`
    background-color: ${({ theme }) => theme.colors.body.secondary};
    border-right: 1px solid ${({ theme }) => theme.colors.body.primary};
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
  Input: styled.input`
    background-color: ${({ theme }) => theme.colors.body.primary};
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.body.secondary};
    font-size: 16px;
    font-style: italic;
    padding: 10px 30px 3px 30px;
    border-radius: 3px;
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
    height: calc(100vh - 100px);
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `,
  SubMenu: styled.div`
    display: flex;
    position: relative;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body.primary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.body.primary};

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
        color: ${({ theme }) => theme.colors.primary};
      }
    }
    li.active {
      color: ${({ theme }) => theme.colors.primary};
    }
    li:nth-child(3) {
      position: absolute;
      font-size: 10px;
    }
  `,
  Item: styled.li`
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;
    background-color: "red";
    list-style: none;
    font-size: 14px;
    a {
      color: ${({ theme }) => theme.colors.text};
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
      }
    }
  `,
};
