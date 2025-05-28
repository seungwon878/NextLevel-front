import React, { useState } from 'react';
import {
  Box, Flex, Button, Text, VStack, HStack, Divider, Input, Icon, Grid, GridItem,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, Avatar
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiMessageSquare } from 'react-icons/fi';
import TopNav from '../../components/TopNav';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface QaInfoPresentationProps {
  title: string;
  content: string;
  comments: Comment[];
  school: string;
  subject: string;
  professor: string;
  attachment?: {
    name: string;
    url: string;
  };
}

const QaInfoPresentation: React.FC<QaInfoPresentationProps> = ({ 
  title, 
  content, 
  comments: initialComments,
  school,
  subject,
  professor,
  attachment 
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [input, setInput] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleAddComment = () => {
    if (input.trim() === '') return;
    const newComment: Comment = {
      id: Date.now().toString(),
      content: input,
      author: {
        id: 'current-user-id', // TODO: 실제 사용자 ID로 교체
        name: '사용자',
        avatar: 'https://bit.ly/dan-abramov'
      },
      createdAt: new Date().toISOString()
    };
    setComments([...comments, newComment]);
    setInput('');
  };

  const handleDownload = () => {
    if (attachment) {
      window.open(attachment.url, '_blank');
    }
  };

  const handleStartChat = (authorId: string, authorName: string) => {
    // 채팅 페이지로 이동하면서 상대방 정보를 state로 전달
    navigate('/chat', { 
      state: { 
        targetUserId: authorId,
        targetUserName: authorName
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav currentPage="qapage" />
      <Flex justify="center" align="center" minH="80vh" p={8}>
        <Box w="90%" maxW="1200px">
          <Box bg="white" borderRadius="lg" border="3px solid #2D3748" p={8} mb={6}>
            <VStack align="stretch" spacing={6}>
              <Text fontWeight="bold" fontSize="3xl" color="gray.800">{title}</Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem>
                  <Text color="gray.500" fontSize="sm">학교</Text>
                  <Text fontSize="lg" fontWeight="medium">{school}</Text>
                </GridItem>
                <GridItem>
                  <Text color="gray.500" fontSize="sm">과목</Text>
                  <Text fontSize="lg" fontWeight="medium">{subject}</Text>
                </GridItem>
                <GridItem>
                  <Text color="gray.500" fontSize="sm">교수</Text>
                  <Text fontSize="lg" fontWeight="medium">{professor}</Text>
                </GridItem>
              </Grid>
              <Divider />
              <Box>
                <Text color="gray.500" fontSize="sm" mb={2}>내용</Text>
                <Text fontSize="md" color="gray.700" noOfLines={3}>
                  {content}
                </Text>
                <Button 
                  mt={2} 
                  colorScheme="gray" 
                  variant="outline" 
                  size="sm"
                  onClick={onOpen}
                >
                  상세 내용 보기
                </Button>
              </Box>
              {attachment && (
                <Box>
                  <Text color="gray.500" fontSize="sm" mb={2}>첨부파일</Text>
                  <Button
                    leftIcon={<Icon as={FiDownload} />}
                    colorScheme="gray"
                    variant="outline"
                    onClick={handleDownload}
                  >
                    {attachment.name}
                  </Button>
                </Box>
              )}
            </VStack>
          </Box>

          <Box bg="white" borderRadius="lg" border="3px solid #2D3748" p={8}>
            <Text fontWeight="bold" fontSize="xl" mb={4}>댓글</Text>
            <VStack spacing={4} align="stretch">
              {comments.map((comment) => (
                <Box 
                  key={comment.id} 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="md"
                  border="1px solid #E2E8F0"
                >
                  <HStack spacing={3} mb={2} justify="space-between">
                    <HStack spacing={3}>
                      <Avatar size="sm" name={comment.author.name} src={comment.author.avatar} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">{comment.author.name}</Text>
                        <Text fontSize="xs" color="gray.500">{formatDate(comment.createdAt)}</Text>
                      </VStack>
                    </HStack>
                    <Button
                      leftIcon={<Icon as={FiMessageSquare} />}
                      size="sm"
                      colorScheme="gray"
                      variant="outline"
                      onClick={() => handleStartChat(comment.author.id, comment.author.name)}
                    >
                      채팅하기
                    </Button>
                  </HStack>
                  <Text fontSize="md" ml={12}>{comment.content}</Text>
                </Box>
              ))}
              <Box mt={4}>
                <Flex gap={2}>
                  <Input 
                    placeholder="답변을 입력하세요" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
                    bg="white"
                  />
                  <Button colorScheme="gray" onClick={handleAddComment}>
                    등록
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상세 내용</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text whiteSpace="pre-wrap">{content}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default QaInfoPresentation; 