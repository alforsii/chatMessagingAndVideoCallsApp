import { FormEl } from "../FormElements";

export function CreateChatForm({
  handleCreateChat,
  onChange,
  chatName,
  message,
}) {
  return (
    <FormEl.Form onSubmit={handleCreateChat}>
      <FormEl.Text>{message}</FormEl.Text>
      <FormEl.InputGroup>
        <FormEl.InputGroup.Prepend>
          <FormEl.InputGroup.Text>@</FormEl.InputGroup.Text>
        </FormEl.InputGroup.Prepend>
        <FormEl.Input
          onChange={onChange}
          value={chatName}
          placeholder="Type chat name..."
          autoFocus
        />
        <FormEl.Button
          type="submit"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          Create Chat
        </FormEl.Button>
      </FormEl.InputGroup>
    </FormEl.Form>
  );
}
