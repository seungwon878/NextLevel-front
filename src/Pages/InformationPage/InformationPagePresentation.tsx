import React, { useState } from 'react';
import {
  Box, Flex, Button, Text, VStack, HStack, Divider, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';
import { FaRegImage, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

interface InformationPagePresentationProps {
  title: string;
  school: string;
  subject: string;
  professor: string;
  detail: string;
  onDownload?: () => void;
}

const TopNav = () => (
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
      <Button variant="ghost">문제 게시판</Button>
      <Button variant="ghost">프로젝트 팀</Button>
      <Button variant="ghost">Q&A 게시판</Button>
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

const InformationPagePresentation: React.FC<InformationPagePresentationProps> = ({ title, school, subject, professor, detail, onDownload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                <Button mt={6} colorScheme="gray" w="100%" onClick={onDownload}>
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
              <Flex justify="flex-end" mt={8} gap={2}>
                <IconButton aria-label="외부 링크" icon={<FaExternalLinkAlt />} size="sm" />
                <IconButton aria-label="삭제" icon={<FaTrash />} size="sm" />
              </Flex>
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
    </Box>
  );
};

export default InformationPagePresentation;
