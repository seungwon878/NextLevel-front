import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createTeamRecruit } from '../../Apis/gwon/api';

// props 타입 정의
export interface Item {
  id: number;
  title: string;
  content: string;
  school: string;
  department: string;
  createdAt: string;
}

interface Props {
  items: Item[];
  searchText: string;
  onSearchTextChange: (v: string) => void;
  school: string;
  onSchoolChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  onSearch: () => void;
  schoolOptions: string[];
  departmentOptions: string[];
}

interface TopNavProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  currentPage: string;
}

const TopNav: React.FC<TopNavProps> = ({
  isAuthenticated,
  onLogout,
  currentPage
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
            <Button colorScheme="gray" variant="solid" onClick={() => navigate('/mypage')}>MYPAGE</Button>
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

const SideBar = ({
  searchText,
  onSearchTextChange,
  school,
  onSchoolChange,
  department,
  onDepartmentChange,
  onSearch,
  schoolOptions,
  departmentOptions,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSchool, setUploadSchool] = useState('');
  const [uploadDepartment, setUploadDepartment] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const token = localStorage.getItem('token') || '';

  const handleUpload = async () => {
    if (!uploadTitle || !uploadSchool || !uploadDepartment || !uploadDesc) {
      setUploadMsg('모든 정보를 입력하세요.');
      return;
    }
    try {
      await createTeamRecruit({
        title: uploadTitle,
        content: uploadDesc,
        department: uploadDepartment,
        school: uploadSchool,
        token,
      });
      setUploadMsg('팀 모집이 성공적으로 등록되었습니다!');
      setTimeout(() => {
        setUploadTitle('');
        setUploadSchool('');
        setUploadDepartment('');
        setUploadDesc('');
        setUploadMsg('');
        onClose();
        window.location.reload();
      }, 1200);
    } catch (err: any) {
      setUploadMsg(err.message || '팀 모집 업로드 실패');
    }
  };
  // 업로드 모달 등 기존 코드 유지
  return (
    <>
      <Box
        w="260px"
        bg="#F5F7FA"
        minH="calc(100vh - 72px)"
        px={8}
        py={8}
        borderRight="1px solid #E2E8F0"
      >
        <VStack align="stretch" spacing={4}>
          <Box>
            <Text mb={1}>검색</Text>
            <Input
              placeholder="검색"
              value={searchText}
              onChange={e => onSearchTextChange(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') onSearch(); }} // 엔터로도 검색
            />
          </Box>
          <Box>
            <Text mb={1}>학교</Text>
            <Select placeholder="학교 선택" value={school} onChange={e => onSchoolChange(e.target.value)}>
              {schoolOptions.map((school) => (
                <option key={school} value={school}>{school}</option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text mb={1}>학과</Text>
            <Select placeholder="학과 선택" value={department} onChange={e => onDepartmentChange(e.target.value)}>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </Select>
          </Box>
        <Button
            mt={4}
            colorScheme="gray"
            w="40px"
            h="40px"
            alignSelf="center"
            onClick={onSearch}
          >
            →
          </Button>
        </VStack>
        <Button mt={16} colorScheme="gray" w="100%" onClick={onOpen}>
              업로드
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>팀 모집 업로드</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3} align="stretch">
              <Input placeholder="제목" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} />
              <Input placeholder="학교" value={uploadSchool} onChange={e => setUploadSchool(e.target.value)} />
              <Input placeholder="학과" value={uploadDepartment} onChange={e => setUploadDepartment(e.target.value)} />
              <Textarea placeholder="설명" value={uploadDesc} onChange={e => setUploadDesc(e.target.value)} />
            </VStack>
            {uploadMsg && (
                <Text color={uploadMsg.includes('성공') ? 'green.500' : 'red.500'} mt={2} fontSize="sm">
                  {uploadMsg}
                </Text>
              )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleUpload}>
              업로드
            </Button>
            <Button variant="ghost" onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const TeamProjectPresentation: React.FC<Props & TopNavProps> = ({
  items,
  searchText,
  onSearchTextChange,
  school,
  onSchoolChange,
  department,
  onDepartmentChange,
  onSearch,
  schoolOptions,
  departmentOptions,
  isAuthenticated,
  onLogout,
  currentPage
}) => {
  const navigate = useNavigate();
  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        currentPage={currentPage}
      />
      <Flex>
        <SideBar
          items={items}
          searchText={searchText}
          onSearchTextChange={onSearchTextChange}
          school={school}
          onSchoolChange={onSchoolChange}
          department={department}
          onDepartmentChange={onDepartmentChange}
          onSearch={onSearch}
          schoolOptions={schoolOptions}
          departmentOptions={departmentOptions}
        />
        <Box flex="1" p={12} bg="#F5F7FA">
          <Box
            bg="white"
            borderRadius="lg"
            border="3px solid #2D3748"
            p={8}
            minH="600px"
          >
            <VStack spacing={8} align="stretch">
              {items.length === 0 ? (
                <Box py={24} textAlign="center">
                  <Text fontSize="xl" color="gray.500">
                    검색 결과가 없습니다.
                  </Text>
                </Box>
              ) : (
                items.map((item) => (
                  <Box key={item.id}>
                    <Flex align="center" justify="space-between">
                      <Text fontWeight="bold" fontSize="2xl">
                        {item.title}
                      </Text>
                      <HStack>
                        <Button variant="outline" colorScheme="gray" onClick={() => navigate(`/team/${item.id}`)}>
                          자세히 보기
                        </Button>
                        <Button colorScheme="gray" variant="solid">
                          채팅
                        </Button>
                      </HStack>
                    </Flex>
                    <Divider my={4} />
                  </Box>
                ))
              )}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default TeamProjectPresentation;
