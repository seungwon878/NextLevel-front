import React from 'react';
import {
  Box, Flex, Button, Text, VStack, HStack, Badge, Divider
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface TeamPagePresentationProps {
  title: string;
  school: string;
  department: string;
  professor: string;
  courseName: string;
  semester: string;
  currentMembers: number;
  totalMembers: number;
  recruitmentField: string;
  description: string;
  contact: string;
  deadline: string;
  status: string;
}

interface TopNavProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const TopNav: React.FC<TopNavProps> = ({
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

const TeamPagePresentation: React.FC<TeamPagePresentationProps & TopNavProps> = ({
  title,
  school,
  department,
  professor,
  courseName,
  semester,
  currentMembers,
  totalMembers,
  recruitmentField,
  description,
  contact,
  deadline,
  status,
  isAuthenticated,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      <Flex justify="center" align="flex-start" p={8} pt={12}>
        <Box
          w="90%"
          maxW="1200px"
          border="3px solid #2D3748"
          borderRadius="lg"
          bg="white"
          p={8}
        >
          <Flex gap={8} align="stretch">
            {/* 왼쪽 프로젝트 정보 */}
            <Box flex="2" pr={4}>
              <VStack align="stretch" spacing={4}>
                <HStack mb={2}>
                  <Badge colorScheme={status === '모집중' ? 'green' : 'gray'} fontSize="sm">
                    {status}
                  </Badge>
                  <Badge colorScheme="blue" fontSize="sm">
                    {recruitmentField}
                  </Badge>
                </HStack>
                
                <Text fontSize="2xl" fontWeight="bold" lineHeight="1.3">
                  {title}
                </Text>
                
                <Box bg="blue.50" p={4} borderRadius="md" border="1px solid #E2E8F0">
                  <VStack align="stretch" spacing={2}>
                    <HStack justify="space-between">
                      <Text fontWeight="600" color="blue.700">🏫 {school}</Text>
                      <Text fontSize="sm" color="gray.600">{semester}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.700">📚 {courseName}</Text>
                      <Text fontSize="sm" color="gray.700">👨‍🏫 {professor} 교수님</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.700">🎓 {department}</Text>
                      <Text fontSize="sm" color="blue.600" fontWeight="600">
                        👥 {currentMembers}/{totalMembers}명
                      </Text>
                    </HStack>
                  </VStack>
                </Box>

                <Box
                  bg="gray.50"
                  p={6}
                  borderRadius="md"
                  border="1px solid #E2E8F0"
                  flex="1"
                >
                  <Text fontSize="md" lineHeight="1.6" whiteSpace="pre-line">
                    {description}
                  </Text>
                </Box>

                <HStack spacing={3} mt={6}>
                  <Button variant="outline" colorScheme="gray" size="lg">
                    채팅
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/project')}>
                    목록으로
                  </Button>
                </HStack>
              </VStack>
            </Box>

            {/* 오른쪽 요약 정보 */}
            <Box flex="1" pl={4}>
              <VStack spacing={4} align="stretch">
                <Box
                  bg="gray.50"
                  border="2px solid #E2E8F0"
                  borderRadius="md"
                  p={6}
                >
                  <Text fontWeight="bold" fontSize="lg" mb={4} textAlign="center">
                    📋 팀 모집 정보
                  </Text>
                  
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">모집 분야</Text>
                      <Text fontSize="sm" fontWeight="600">{recruitmentField}</Text>
                    </HStack>
                    <Divider />
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">현재 인원</Text>
                      <Text fontSize="sm" fontWeight="600">{currentMembers}명</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">목표 인원</Text>
                      <Text fontSize="sm" fontWeight="600">{totalMembers}명</Text>
                    </HStack>
                    <Divider />
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">모집 마감</Text>
                      <Text fontSize="sm" fontWeight="600" color="red.500">{deadline}</Text>
                    </HStack>
                    <Divider />
                    <VStack align="stretch" spacing={1}>
                      <Text fontSize="sm" color="gray.600">연락처</Text>
                      <Text fontSize="sm" fontWeight="600" bg="blue.50" p={2} borderRadius="md">
                        {contact}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>

                <Box bg="yellow.50" p={4} borderRadius="md" border="1px solid #FED7AA">
                  <Text fontSize="sm" color="orange.700" textAlign="center" fontWeight="600">
                    ⚠️ 학교 공식 프로젝트입니다
                  </Text>
                  <Text fontSize="xs" color="gray.600" textAlign="center" mt={1}>
                    성실한 참여가 필요합니다
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default TeamPagePresentation;
