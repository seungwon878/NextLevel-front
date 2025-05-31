import React from 'react';
import { Box, Flex, Button, HStack, Text, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav';

interface ChatPagePresentationProps {
  items: string[];
}

const ChatPagePresentation: React.FC<ChatPagePresentationProps> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav currentPage="chat" />
      <Box px={6} py={4}>
        <Box
          mt={6}
          border="3px solid #2D3748"
          borderRadius="md"
          bg="white"
          p={12}
          w="95%"
          mx="auto"
          minH="600px"
        >
          {items.map((title, idx) => (
            <Box key={idx} mb={idx < items.length - 1 ? 8 : 0}>
              <Flex align="center" justify="space-between">
                <Text fontWeight="bold" fontSize="xl" mb={2}>제목</Text>
                <Button colorScheme="gray" variant="outline" onClick={() => navigate(`/chatting/${idx + 1}`)}>채팅하러 가기</Button>
              </Flex>
              <Divider borderColor="#2D3748" />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPagePresentation;
