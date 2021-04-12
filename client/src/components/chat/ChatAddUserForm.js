import React from "react";
import { FormEl } from "../FormElements";

export function ChatAddUserForm({
  handleSearchInput,
  handleAddUser,
  searchInput,
  foundUser,
  message,
  setShow,
}) {
  return (
    <FormEl.Form onSubmit={handleAddUser}>
      <FormEl.Group controlId="add_chat_user_by_email">
        <FormEl.Label>Search</FormEl.Label>
        <FormEl.Input
          value={searchInput}
          type="text"
          placeholder="Search by email..."
          onChange={handleSearchInput}
        />
        {foundUser?.id && !message ? (
          <>
            <FormEl.Alert variant={"primary"}>
              {`We found ${foundUser.firstName} ${foundUser.lastName}. Would you like to add to the Chat? `}
              <FormEl.Button
                type="submit"
                variant="outline-primary"
              >{`Add ${foundUser.firstName}?`}</FormEl.Button>
            </FormEl.Alert>
          </>
        ) : (
          <>
            <FormEl.Alert variant={message ? "danger" : "warning"}>
              {message
                ? message
                : `Sorry we didn't find anyone! Did you type? `}
            </FormEl.Alert>
            <FormEl.Group controlId="search_chat_user_by_email">
              <FormEl.Label>Or send invitation</FormEl.Label>
              <FormEl.Input type="email" placeholder="Enter email" />
              <FormEl.Text className="text-muted">
                We'll never share your email with anyone else.
              </FormEl.Text>
            </FormEl.Group>

            <FormEl.Button onClick={() => setShow(false)} variant="primary">
              Send invitation
            </FormEl.Button>
          </>
        )}
      </FormEl.Group>
    </FormEl.Form>
  );
}
