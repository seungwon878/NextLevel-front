import React from 'react';
import { Box, Flex, Button, HStack, Text, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
  const navigate = useNavigate();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={8}
      py={4}
      bg="white"
      borderBottom="2px solid #E2E8F0"
    >
      <Button fontWeight="bold" colorScheme="gray" variant="solid" size="lg">
        Logo
      </Button>
      <HStack spacing={8}>
        <Button variant="ghost" onClick={() => navigate('/landing')}>문제 게시판</Button>
        <Button variant="ghost">프로젝트 팀</Button>
        <Button variant="ghost" onClick={() => navigate('/qapage')}>Q&A 게시판</Button>
        <Button variant="ghost" onClick={() => navigate('/chat')} borderBottom="2px solid #2D3748">채팅</Button>
      </HStack>
      <HStack spacing={2}>
        <Button colorScheme="gray" variant="outline">LOGIN</Button>
        <Button colorScheme="gray" variant="solid">register</Button>
      </HStack>
    </Flex>
  );
};

interface ChatPagePresentationProps {
  items: string[];
}

const ChatPagePresentation: React.FC<ChatPagePresentationProps> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav />
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
