let messages = [
  {
    id: 1,
    createdAt: '2020-04-12T12:13:23.000+0000',
    updatedAt: '2020-04-12T12:13:23.000+0000',
    message: 'Hi Atur!',
    messageStatus: 'SEEN',
    messageType: 'TEXT',
    userId: 2,
    conversationId: 1,
  },
  {
    id: 2,
    createdAt: '2020-04-12T12:13:23.000+0000',
    updatedAt: '2020-04-12T12:13:23.000+0000',
    message: 'How are you?',
    messageStatus: 'SEEN',
    messageType: 'TEXT',
    userId: 2,
    conversationId: 1,
  },
  {
    id: 3,
    createdAt: '2020-04-12T12:13:23.000+0000',
    updatedAt: '2020-04-12T12:13:23.000+0000',
    message: 'Hi',
    messageStatus: 'SEEN',
    messageType: 'TEXT',
    userId: 1,
    conversationId: 1,
  },
  {
    id: 4,
    createdAt: '2020-04-12T12:13:23.000+0000',
    updatedAt: '2020-04-12T12:13:23.000+0000',
    message: 'I am good.',
    messageStatus: 'SEEN',
    messageType: 'TEXT',
    userId: 1,
    conversationId: 1,
  },
  {
    id: 5,
    createdAt: '2020-04-12T12:13:23.000+0000',
    updatedAt: '2020-04-12T12:13:23.000+0000',
    message: 'Whatsup?',
    messageStatus: 'SEEN',
    messageType: 'TEXT',
    userId: 1,
    conversationId: 1,
  },
  {
    id: 6,
    createdAt: '2020-04-12T12:13:23.000+0000',
    updatedAt: '2020-04-12T12:13:23.000+0000',
    message: 'Glad to hear you.',
    messageStatus: 'SEEN',
    messageType: 'TEXT',
    userId: 1,
    conversationId: 1,
  },
];

const sendMessage = (message = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      messages = [...messages, message];
      resolve({
        message: message,
      });
    }, 500);
  });
};

const fetchMessages = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        messages: messages,
      });
    }, 500);
  });
};

export {sendMessage, fetchMessages};
