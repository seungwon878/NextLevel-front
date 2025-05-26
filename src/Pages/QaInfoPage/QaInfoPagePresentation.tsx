import React, { useState } from 'react';
import {
  Box, Flex, Button, Text, VStack, HStack, Divider, Input
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface QaInfoPresentationProps {
  title: string;
  content: string;
  comments: string[];
}

const TopNav = () => {
  const navigate = useNavigate();
  return (
    <Flex as="nav" align="center" justify="space-between" px={8} py={4} bg="white" borderBottom="1px solid #2D3748">
      <Button fontWeight="bold" colorScheme="gray" variant="solid" size="lg">Logo</Button>
      <HStack spacing={8}>
        <Button variant="ghost" onClick={() => navigate('/landing')}>문제 게시판</Button>
        <Button variant="ghost">프로젝트 팀</Button>
        <Button variant="ghost" onClick={() => navigate('/qapage')}>Q&A 게시판</Button>
        <Button variant="ghost">채팅</Button>
      </HStack>
      <HStack spacing={2}>
        <Button colorScheme="gray" variant="outline">LOGIN</Button>
        <Button colorScheme="gray" variant="solid">MyPage</Button>
      </HStack>
    </Flex>
  );
};

const QaInfoPresentation: React.FC<QaInfoPresentationProps> = ({ title, content, comments: initialComments }) => {
  const [comments, setComments] = useState<string[]>(initialComments);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (input.trim() === '') return;
    setComments([...comments, input]);
    setInput('');
  };

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav />
      <Flex justify="center" align="center" minH="80vh" p={8}>
        <Box w="90%" border="3px solid #2D3748" borderRadius="lg" bg="white" p={12}>
          <Text fontWeight="bold" fontSize="2xl" mb={2}>제목</Text>
          <Text fontSize="xl" color="gray.800" mb={4}>{title}</Text>
          <Divider mb={6} />
          <Flex justify="flex-end" mb={4} gap={2}>
            <Button colorScheme="gray" variant="solid">채팅</Button>
          </Flex>
          <Box mb={8} border="1px solid #CBD5E0" borderRadius="md" bg="white" p={6}>
            <Text fontSize="md" color="gray.700">{content}</Text>
          </Box>
          <Box border="2px solid #2D3748" borderRadius="md" bg="white" p={4} mt={8}>
            <Text fontWeight="bold" fontSize="xl" mb={2}>댓글</Text>
            <Box borderTop="1px solid #CBD5E0" pt={2}>
              {comments.map((comment, idx) => (
                <Box key={idx} py={2} borderBottom={idx < comments.length - 1 ? '1px solid #CBD5E0' : 'none'}>
                  <Text fontSize="md">{comment}</Text>
                </Box>
              ))}
              <Flex align="center" mt={2} gap={2}>
                <Input placeholder="답변" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }} />
                <Button colorScheme="gray" onClick={handleAddComment}>등록</Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default QaInfoPresentation; 