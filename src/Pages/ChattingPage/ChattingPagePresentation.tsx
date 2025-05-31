import React, { useRef, useEffect, useState } from 'react';
import {
  Box, Flex, Button, HStack, Text, Divider, Input, IconButton, VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import TopNav from '../../components/TopNav';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface ChattingPagePresentationProps {
  roomTitle?: string;
}

const dummyMessages: Message[] = [
  { id: 1, user: '상대방', text: '안녕하세요!', time: '10:00', isMe: false },
  { id: 2, user: '나', text: '안녕하세요! 자료 관련해서 문의드려요.', time: '10:01', isMe: true },
  { id: 3, user: '상대방', text: '네, 어떤 부분이 궁금하신가요?', time: '10:02', isMe: false },
];

const ChattingPagePresentation: React.FC<ChattingPagePresentationProps> = ({ roomTitle = '채팅방' }) => {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: '나',
        text: input,
        time: new Date().toLocaleTimeString().slice(0, 5),
        isMe: true,
      },
    ]);
    setInput('');
  };

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav currentPage="chat" />
      <Flex justify="center" align="center" minH="80vh" p={8}>
        <Box w="100%" maxW="600px" border="3px solid #2D3748" borderRadius="lg" bg="white" p={0} display="flex" flexDirection="column" minH="700px">
          <Box px={8} py={4} borderBottom="1px solid #CBD5E0">
            <Text fontWeight="bold" fontSize="xl">{roomTitle}</Text>
          </Box>
          <Box
            ref={scrollRef}
            flex="1"
            px={4}
            py={4}
            overflowY="auto"
            bg="#F5F7FA"
            minH="400px"
            maxH="500px"
          >
            <VStack spacing={4} align="stretch">
              {messages.map(msg => (
                <Flex key={msg.id} justify={msg.isMe ? 'flex-end' : 'flex-start'}>
                  <Box
                    bg={msg.isMe ? 'gray.200' : 'blue.100'}
                    color="black"
                    px={4}
                    py={2}
                    borderRadius="xl"
                    maxW="70%"
                    boxShadow="sm"
                  >
                    <Text fontSize="sm" color="gray.500" mb={1}>{msg.isMe ? '나' : msg.user} · {msg.time}</Text>
                    <Text fontSize="md">{msg.text}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </Box>
          <Divider m={0} />
          <Flex px={4} py={3} borderTop="1px solid #CBD5E0" bg="white" align="center">
            <Input
              placeholder="메시지를 입력하세요"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              mr={2}
              bg="white"
            />
            <IconButton
              colorScheme="gray"
              aria-label="전송"
              icon={<FaPaperPlane />}
              onClick={handleSend}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChattingPagePresentation;