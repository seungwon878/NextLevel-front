import React from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface MyPagePresentationProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onRegister: () => void;
  onGoMyPage: () => void;
  onGoMain: () => void;
}

const TopNav: React.FC<MyPagePresentationProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
  onRegister,
  onGoMyPage,
  onGoMain,
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
      <Button
        fontWeight="bold"
        colorScheme="gray"
        variant="solid"
        size="lg"
        onClick={onGoMain}
      >
        Logo
      </Button>
      <HStack spacing={8}>
        <Button variant="ghost" onClick={() => navigate('/landing')}>문제 게시판</Button>
        <Button variant="ghost" onClick={() => navigate('/project')}>프로젝트 팀</Button>
        <Button variant="ghost" onClick={() => navigate('/qapage')}>Q&A 게시판</Button>
        <Button variant="ghost" onClick={() => navigate('/chat')}>채팅</Button>
      </HStack>
      <HStack spacing={2}>
        {isAuthenticated ? (
          <>
            <Button colorScheme="gray" variant="outline" onClick={onLogout}>
              LOGOUT
            </Button>
            <Button colorScheme="gray" variant="solid" onClick={onGoMyPage}>
              MyPage
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="gray" variant="outline" onClick={onLogin}>
              LOGIN
            </Button>
            <Button colorScheme="gray" variant="solid" onClick={onRegister}>
              register
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

const SideBar: React.FC = () => (
  <Box
    w="260px"
    bg="#F5F7FA"
    minH="calc(100vh - 72px)"
    px={8}
    py={8}
    borderRight="1px solid #E2E8F0"
  >
    <Text fontWeight="bold" color="gray.400" mb={6}>
      ⓞ MyPage
    </Text>
    <VStack align="stretch" spacing={4}>
      <Button colorScheme="gray" w="100%">
        내 정보 수정
      </Button>
      <Button colorScheme="gray" w="100%">
        로그아웃
      </Button>
    </VStack>
    <Divider my={6} />
    <VStack align="stretch" spacing={4}>
      <Button colorScheme="gray" w="100%">
        내가 올린 문제
      </Button>
      <Button colorScheme="gray" w="100%">
        내가 올린 팀 구인
      </Button>
      <Button colorScheme="gray" w="100%">
        내가 올린 Q&amp;A
      </Button>
    </VStack>
  </Box>
);

const MyPagePresentation: React.FC<MyPagePresentationProps> = (props) => {
  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav {...props} />
      <Flex>
        <SideBar />
        <Box flex="1" p={12} bg="#F5F7FA">
          <Box
            bg="white"
            borderRadius="lg"
            border="3px solid #2D3748"
            p={8}
            minH="600px"
            maxW="800px"
            mx="auto"
          >
            <VStack spacing={8} align="stretch">
              <Box>
                <Flex align="center" gap={8}>
                  <Box
                    w="96px"
                    h="96px"
                    borderRadius="12px"
                    bg="#e9ecf2"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="2.5rem"
                    color="#bbb"
                  >
                    <span role="img" aria-label="profile">🖼️</span>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="xl" mb={1}>
                      홍길동
                    </Text>
                    <Text color="gray.600" fontSize="md">
                      프로필 내용<br />
                      (자기소개, 취미, 주요 이력 등)<br />
                      메이저/프로젝트/기타 메시지도 포함
                    </Text>
                  </Box>
                </Flex>
                <Button
                  mt={6}
                  colorScheme="gray"
                  variant="solid"
                  borderRadius="6px"
                  fontWeight="600"
                >
                  정보 수정
                </Button>
              </Box>
              <Divider />
              <VStack spacing={4} align="stretch">
                <Button variant="outline" colorScheme="gray" size="lg">
                  내가 올린 문제 게시판 확인하러 가기
                </Button>
                <Button variant="outline" colorScheme="gray" size="lg">
                  내가 올린 팀 구인 글 확인하러 가기
                </Button>
                <Button variant="outline" colorScheme="gray" size="lg">
                  내가 올린 Q&amp;A 확인하러 가기
                </Button>
              </VStack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MyPagePresentation;
