import React from 'react';
import ChatPagePresentation from './ChatPagePresentation';

const dummyItems = ['제목', '제목', '제목'];

const ChatPageContainer: React.FC = () => {
  return <ChatPagePresentation items={dummyItems} />;
};

export default ChatPageContainer;