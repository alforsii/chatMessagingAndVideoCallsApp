import styled from "styled-components";
import { boxShadow } from "../../global/styleHelperFunctions";
import { UserChatsEl } from "./UserChatsElements";

export const ChatUsersEl = {
  ...UserChatsEl,

  Avatar: styled.div``,
  Menu: styled(UserChatsEl.Menu)``,
  SubMenu: styled(UserChatsEl.SubMenu)`
    flex-wrap: wrap;
    border-radius: 10px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;
    ${boxShadow}
  `,
};
