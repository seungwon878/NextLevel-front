import React, { useState } from 'react';
import {
  Box, Flex, Button, Text, VStack, HStack, Badge, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Input, Textarea, useDisclosure, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface TeamPagePresentationProps {
  title: string;
  school: string;
  department: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isAuthor: boolean;
  onUpdate: (data: {
    title: string;
    content: string;
    department: string;
    school: string;
  }) => Promise<void>;
  onDelete: () => Promise<void>;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const TopNav: React.FC<Pick<TeamPagePresentationProps, 'isAuthenticated' | 'onLogout'>> = ({
  isAuthenticated,
  onLogout
}) => {
  const navigate = useNavigate();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={8}
      py={4}
      bg="white"
      borderBottom="1px solid #E2E8F0"
    >
      <Button fontWeight="bold" colorScheme="gray" variant="solid" size="lg" onClick={() => navigate('/landing')}>Logo</Button>
      <HStack spacing={8}>
        <Button variant="ghost" onClick={() => navigate('/landing')}>문제 게시판</Button>
        <Button variant="ghost" onClick={() => navigate('/project')}>프로젝트 팀</Button>
        <Button variant="ghost" onClick={() => navigate('/qapage')}>Q&A 게시판</Button>
        <Button variant="ghost" onClick={() => navigate('/chat')}>채팅</Button>
      </HStack>
      <HStack spacing={2}>
        {isAuthenticated ? (
          <>
            <Button colorScheme="gray" variant="outline" onClick={onLogout}>LOGOUT</Button>
            <Button colorScheme="gray" variant="solid" onClick={() => navigate('/mypage')}>MyPage</Button>
          </>
        ) : (
          <>
            <Button colorScheme="gray" variant="outline" onClick={() => navigate('/login')}>LOGIN</Button>
            <Button colorScheme="gray" variant="solid" onClick={() => navigate('/signup')}>REGISTER</Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

const TeamPagePresentation: React.FC<TeamPagePresentationProps> = ({
  title,
  school,
  department,
  author,
  content,
  createdAt,
  updatedAt,
  isAuthor,
  onUpdate,
  onDelete,
  isAuthenticated,
  onLogout,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editSchool, setEditSchool] = useState(school);
  const [editDepartment, setEditDepartment] = useState(department);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await onUpdate({
        title: editTitle,
        content: editContent,
        school: editSchool,
        department: editDepartment,
      });
      toast({
        title: '수정 완료',
        status: 'success',
        duration: 2000,
      });
      onClose();
    } catch (err) {
      toast({
        title: '수정 실패',
        description: err instanceof Error ? err.message : '다시 시도해 주세요',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await onDelete();
        toast({
          title: '삭제 완료',
          status: 'success',
          duration: 2000,
        });
      } catch (err) {
        toast({
          title: '삭제 실패',
          description: err instanceof Error ? err.message : '다시 시도해 주세요',
          status: 'error',
          duration: 3000,
        });
      }
    }
  };

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <Flex justify="center" align="flex-start" p={8} pt={12}>
        <Box
          w="90%"
          maxW="800px"
          border="3px solid #2D3748"
          borderRadius="lg"
          bg="white"
          p={8}
        >
          <VStack align="stretch" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">{title}</Text>
            <HStack>
              <Badge colorScheme="blue">{school}</Badge>
              <Badge colorScheme="green">{department}</Badge>
              <Badge colorScheme="gray">{author}</Badge>
            </HStack>
            <Divider />
            <Text color="gray.600" fontSize="sm">
              작성일: {new Date(createdAt).toLocaleString()}
            </Text>
            <Text color="gray.600" fontSize="sm">
              수정일: {new Date(updatedAt).toLocaleString()}
            </Text>
            <Divider />
            <Text fontSize="md" whiteSpace="pre-line">{content}</Text>
            <HStack spacing={3} mt={6}>
              {isAuthor && isAuthenticated && (
                <>
                  <Button colorScheme="blue" onClick={onOpen}>
                    수정
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete}>
                    삭제
                  </Button>
                </>
              )}
              <Button variant="ghost" onClick={() => navigate('/project')}>
                목록으로
              </Button>
              <Button variant="ghost" onClick={() => navigate('/chat')}>
                채팅
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
       <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시글 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="제목"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Input
                placeholder="학교"
                value={editSchool}
                onChange={(e) => setEditSchool(e.target.value)}
              />
              <Input
                placeholder="학과"
                value={editDepartment}
                onChange={(e) => setEditDepartment(e.target.value)}
              />
              <Textarea
                placeholder="내용"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                minH="300px"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              저장
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeamPagePresentation;
