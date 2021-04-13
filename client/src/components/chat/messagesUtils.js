export const formatMessages = (messages, user) => {
  let userMessages = [];
  const formattedMessages = [];
  // copy original | deep cloning
  const allMessages = JSON.parse(JSON.stringify(messages));

  allMessages.forEach((msg, index) => {
    let nextUser = allMessages[index + 1]?.username || "";
    // Lets check for message blackList, where it contains users ids who deleted other user message | since he is not the author of message we just hide this message from him so he wont see.
    const isOnBlackList = msg.blackList.includes(user.id);
    const currentMsg = {
      id: msg.id,
      text: msg.content,
      chatId: msg.chatId,
      messageAuthor: msg.messageAuthor,
      createdAt: msg.createdAt,
    };

    // 1.if current message is my message do: =>
    if (user.email === msg.username) {
      if (user.email === nextUser) {
        // 1.1username === nextUser | means: is next message also belongs to me?
        // a)if YES: then temporarily store it in the userMessages array
        userMessages.push(currentMsg);
      } else {
        // b)if NO: then take all messages from temp array userMessages and push to formattedMessages array, and clear temp array userMessages=[]
        const newObj = {
          id: msg.id,
          type: "sent",
          name: `${msg.messageAuthor.firstName} ${msg.messageAuthor.lastName}`,
          avatar: "",
          messages: [...userMessages, currentMsg],
        };
        formattedMessages.push(newObj);
        userMessages = [];
      }
    }
    // 2.if current message is NOT my message do: =>
    else {
      // 2.1username === nextUser | means: is next message also belongs to the same user?
      if (msg.username === nextUser) {
        // a)if YES: then temporarily store it in the userMessages array
        !isOnBlackList && userMessages.push(currentMsg);
      } else {
        // b)if NO: then take all messages from temp array userMessages and push to formattedMessages array, and clear temp array userMessages=[]
        const messages = isOnBlackList
          ? userMessages
          : [...userMessages, currentMsg];

        const newObj = {
          id: msg.id,
          type: "received",
          name: `${msg.messageAuthor.firstName} ${msg.messageAuthor.lastName}`,
          avatar: "",
          messages,
        };
        messages.length > 0 && formattedMessages.push(newObj);
        userMessages = [];
      }
    }
  });
  return formattedMessages;
};
