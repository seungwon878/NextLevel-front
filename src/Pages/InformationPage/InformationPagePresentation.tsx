import React, { useState } from 'react';
import {
  Box, Flex, Button, Text, VStack, HStack, Divider, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, useToast, FormControl, FormLabel, Input, Textarea, Select
} from '@chakra-ui/react';
import { FaRegImage, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { updateProblemPost, deleteProblemPost } from '../../Apis/han/problemPostApi';

interface InformationPagePresentationProps {
  id: number;
  title: string;
  school: string;
  subject: string;
  professor: string;
  detail: string;
  fileUrl: string;
  fileName: string;
  onDownload?: () => void;
  schoolOptions: string[];
  subjectOptions: string[];
  professorOptions: string[];
  isAuthor: boolean;
}

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
      borderBottom="1px solid #2D3748"
    >
      <Button fontWeight="bold" colorScheme="gray" variant="solid" size="lg">
        Logo
      </Button>
      <HStack spacing={8}>
        <Button variant="ghost" onClick={() => navigate('/landing')}>문제 게시판</Button>
        <Button variant="ghost">프로젝트 팀</Button>
        <Button variant="ghost" onClick={() => navigate('/qapage')}>Q&A 게시판</Button>
        <Button variant="ghost">채팅</Button>
      </HStack>
      <HStack spacing={2}>
        <Button colorScheme="gray" variant="outline">
          LOGIN
        </Button>
        <Button colorScheme="gray" variant="solid">
          MyPage
        </Button>
      </HStack>
    </Flex>
  );
};

const InformationPagePresentation: React.FC<InformationPagePresentationProps> = ({ 
  id,
  title, 
  school, 
  subject, 
  professor, 
  detail, 
  fileUrl, 
  fileName, 
  onDownload,
  schoolOptions,
  subjectOptions,
  professorOptions,
  isAuthor
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSchool, setEditedSchool] = useState(school);
  const [editedSubject, setEditedSubject] = useState(subject);
  const [editedProfessor, setEditedProfessor] = useState(professor);
  const [editedDetail, setEditedDetail] = useState(detail);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || 'downloaded_file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      
      // request 데이터 구성
      const requestData = {
        title: editedTitle,
        content: editedDetail,
        professorName: editedProfessor,
        school: editedSchool,
        subject: editedSubject
      };

      // JSON 데이터는 "request"라는 이름의 Blob으로 추가
      formData.append(
        'request',
        new Blob([JSON.stringify(requestData)], { type: 'application/json' })
      );
      
      // 파일이 있는 경우에만 "data"라는 이름으로 추가
      if (selectedFile) {
        formData.append('data', selectedFile);
      }

      console.log('FormData contents:');
      Array.from(formData.entries()).forEach(pair => {
        console.log(pair[0], pair[1]);
      });

      const response = await updateProblemPost(id, formData);
      if (response.success) {
        toast({
          title: '게시글이 수정되었습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onEditClose();
        window.location.reload();
      } else {
        throw new Error(response.message || '게시글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Edit error:', error);
      toast({
        title: '게시글 수정 실패',
        description: error instanceof Error ? error.message : '게시글 수정 중 오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        const response = await deleteProblemPost(id);
        if (response.success) {
          toast({
            title: '게시글이 삭제되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/landing');
        } else {
          throw new Error(response.message || '게시글 삭제에 실패했습니다.');
        }
      } catch (error) {
        toast({
          title: '게시글 삭제 실패',
          description: error instanceof Error ? error.message : '게시글 삭제 중 오류가 발생했습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav />
      <Flex justify="center" align="center" minH="80vh" p={8}>
        <Box
          w="90%"
          minH="700px"
          border="3px solid #2D3748"
          borderRadius="lg"
          bg="white"
          p={12}
        >
          <Flex gap={12}>
            {/* 왼쪽 카드 */}
            <Box
              w="350px"
              border="2px solid #2D3748"
              borderRadius="md"
              bg="#F5F7FA"
              p={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box w="100%" mb={2} display="flex" justifyContent="flex-end">
                <Button size="sm" variant="outline">문서 정보</Button>
              </Box>
              <Box
                w="100px"
                h="100px"
                bg="white"
                border="1px solid #A0AEC0"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={4}
              >
                <FaRegImage size={40} color="#A0AEC0" />
              </Box>
              <Divider my={2} />
              <Box w="100%" mt={4}>
                <Text fontWeight="bold" bg="#A0AEC0" color="white" borderRadius="md" px={2} py={1} mb={2}>
                  {title}
                </Text>
                <VStack align="stretch" spacing={1} mt={2}>
                  <Text fontSize="sm" color="gray.700">학교: {school}</Text>
                  <Text fontSize="sm" color="gray.700">과목: {subject}</Text>
                  <Text fontSize="sm" color="gray.700">교수: {professor}</Text>
                </VStack>
                <Button mt={6} colorScheme="gray" w="100%" onClick={handleDownload}>
                  Download
                </Button>
              </Box>
            </Box>
            {/* 오른쪽 카드 */}
            <Box
              flex="1"
              border="2px solid #A0AEC0"
              borderRadius="md"
              bg="white"
              p={8}
              ml={4}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text mb={2}>상세 정보</Text>
              <VStack align="stretch" spacing={2} mb={4}>
                <Text fontSize="md" color="gray.700" noOfLines={3}>{detail}</Text>
              </VStack>
              <Button variant="outline" w="60%" alignSelf="center" mt={4} onClick={onOpen}>
                전체 상세정보
              </Button>
              {isAuthor && (
                <Flex justify="flex-end" mt={8} gap={2}>
                  <Button size="sm" colorScheme="blue" variant="outline" onClick={onEditOpen}>수정</Button>
                  <Button size="sm" colorScheme="red" variant="outline" onClick={handleDelete}>삭제</Button>
                </Flex>
              )}
            </Box>
          </Flex>
        </Box>
      </Flex>
      {/* 상세정보 모달 */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>전체 상세정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md" color="gray.700">{detail}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* 수정 모달 */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시글 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>제목</FormLabel>
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>학교</FormLabel>
                <Input
                  value={editedSchool}
                  onChange={(e) => setEditedSchool(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>과목</FormLabel>
                <Input
                  value={editedSubject}
                  onChange={(e) => setEditedSubject(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>교수</FormLabel>
                <Input
                  value={editedProfessor}
                  onChange={(e) => setEditedProfessor(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>내용</FormLabel>
                <Textarea
                  value={editedDetail}
                  onChange={(e) => setEditedDetail(e.target.value)}
                  rows={10}
                />
              </FormControl>
              <FormControl>
                <FormLabel>파일 첨부</FormLabel>
                <Input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleEdit} width="full">
                수정하기
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InformationPagePresentation;
