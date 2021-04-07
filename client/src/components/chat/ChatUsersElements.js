import styled from "styled-components";
import { boxShadow } from "../../global/styleHelperFunctions";
import { UserChatsEl } from "./UserChatsElements";

export const ChatUsersEl = {
  ...UserChatsEl,
  Container: styled(UserChatsEl.Container)``,
  Avatar: styled.div`
    max-width: 300px;
    max-height: 300px;
    min-width: 200px;
    min-height: 200px;
  `,
  Menu: styled(UserChatsEl.Menu)`
    max-width: 300px;
    margin: 0 auto;
  `,
  SubMenu: styled(UserChatsEl.SubMenu)`
    flex-wrap: wrap;
    border-radius: 10px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;

    ${boxShadow}
  `,
};
