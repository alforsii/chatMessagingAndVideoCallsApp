import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";

export function StyledDropdown({ children, toggleText }) {
  return (
    <DropdownEl.Dropdown>
      <DropdownEl.Toggle>{toggleText}</DropdownEl.Toggle>
      <DropdownEl.Menu style={{ margin: 0 }}>{children}</DropdownEl.Menu>
    </DropdownEl.Dropdown>
  );
}

export const DropdownEl = {
  Dropdown: styled(Dropdown)``,
  Menu: styled(Dropdown.Menu)`
    background-color: ${({ theme }) => theme.colors.body.secondary};
  `,
  Toggle: styled(Dropdown.Toggle)`
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
    :active {
      background-color: transparent;
      border: none;
    }
  `,
  Item: styled(Dropdown.Item)`
    font-size: 14px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.body.primary};
    }
  `,
  Divider: styled(Dropdown.Divider)`
    margin: 0;
  `,
  Header: styled(Dropdown.Header)``,
  ItemText: styled(Dropdown.ItemText)``,
};
