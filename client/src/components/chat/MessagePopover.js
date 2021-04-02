import { gql, useMutation } from "@apollo/client";
import { Dropdown } from "react-bootstrap";

const DELETE_MESSAGE_QUERY = gql`
  mutation($chatId: ID!, $messageId: ID!, $userId: ID!) {
    deleteMessage(chatId: $chatId, messageId: $messageId, userId: $userId) {
      id
    }
  }
`;
export function MessagePopover({ children, msg, userId }) {
  const [DeleteMessage] = useMutation(DELETE_MESSAGE_QUERY);

  const handleDeleteMessage = async () => {
    try {
      const { chatId, id } = msg;
      const { data } = await DeleteMessage({
        variables: { chatId, messageId: id, userId },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {children}
      <Dropdown>
        <Dropdown.Toggle variant="basic" id="dropdown-basic"></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.ItemText>Actions</Dropdown.ItemText>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item disabled={true}>Reply</Dropdown.Item>
          <Dropdown.Item disabled={true}>Like</Dropdown.Item>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item onClick={handleDeleteMessage}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
