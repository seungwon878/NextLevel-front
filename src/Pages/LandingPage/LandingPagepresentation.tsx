import React from 'react';
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
  Spacer,
} from '@chakra-ui/react';

export interface Item {
  id: number;
  section: string;
  title: string;
  school: string;
  subject: string;
  professor: string;
}

interface Props {
  items: Item[];
  searchText: string;
  onSearchTextChange: (v: string) => void;
  school: string;
  onSchoolChange: (v: string) => void;
  subject: string;
  onSubjectChange: (v: string) => void;
  professor: string;
  onProfessorChange: (v: string) => void;
  schoolOptions: string[];
  subjectOptions: string[];
  professorOptions: string[];
}

const TopNav = () => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    px={8}
    py={4}
    bg="white"
    borderBottom="1px solid #E2E8F0"
  >
    <Button fontWeight="bold" colorScheme="gray" variant="solid" size="lg">
      Logo
    </Button>
    <HStack spacing={8}>
      <Button variant="ghost">문서 게시판</Button>
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

const SideBar = ({
  searchText,
  onSearchTextChange,
  school,
  onSchoolChange,
  subject,
  onSubjectChange,
  professor,
  onProfessorChange,
  schoolOptions,
  subjectOptions,
  professorOptions,
}: Props) => (
  <Box
    w="260px"
    bg="#F5F7FA"
    minH="calc(100vh - 72px)"
    px={8}
    py={8}
    borderRight="1px solid #E2E8F0"
  >
    <Text fontWeight="bold" color="gray.400" mb={6}>
      ⓞ Base Components
    </Text>
    <VStack align="stretch" spacing={4}>
      <Box>
        <Text mb={1}>검색</Text>
        <Input placeholder="검색" value={searchText} onChange={e => onSearchTextChange(e.target.value)} />
      </Box>
      <Box>
        <Text mb={1}>학교</Text>
        <Select placeholder="학교 선택" value={school} onChange={e => onSchoolChange(e.target.value)}>
          <option value="">학교 선택</option>
          {schoolOptions.map((school) => (
            <option key={school} value={school}>{school}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text mb={1}>과목</Text>
        <Select placeholder="과목 선택" value={subject} onChange={e => onSubjectChange(e.target.value)}>
          <option value="">과목 선택</option>
          {subjectOptions.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text mb={1}>교수</Text>
        <Select placeholder="교수 선택" value={professor} onChange={e => onProfessorChange(e.target.value)}>
          <option value="">교수 선택</option>
          {professorOptions.map((prof) => (
            <option key={prof} value={prof}>{prof}</option>
          ))}
        </Select>
      </Box>
      <Button mt={4} colorScheme="gray" w="40px" h="40px" alignSelf="center">
        →
      </Button>
    </VStack>
    <Spacer />
    <Button mt={16} colorScheme="gray" w="100%">
      업로드
    </Button>
  </Box>
);

const LandingPagePresentation: React.FC<Props> = ({
  items,
  searchText,
  onSearchTextChange,
  school,
  onSchoolChange,
  subject,
  onSubjectChange,
  professor,
  onProfessorChange,
  schoolOptions,
  subjectOptions,
  professorOptions,
}) => (
  <Box minH="100vh" bg="#F5F7FA">
    <TopNav />
    <Flex>
      <SideBar
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        school={school}
        onSchoolChange={onSchoolChange}
        subject={subject}
        onSubjectChange={onSubjectChange}
        professor={professor}
        onProfessorChange={onProfessorChange}
        schoolOptions={schoolOptions}
        subjectOptions={subjectOptions}
        professorOptions={professorOptions}
        items={items}
      />
      <Box flex="1" p={12} bg="#F5F7FA">
        <Box
          bg="white"
          borderRadius="lg"
          border="3px solid #2D3748"
          p={8}
          minH="600px"
        >
          <Text fontWeight="bold" fontSize="lg" mb={4}>
            Section 30
          </Text>
          <VStack spacing={8} align="stretch">
            {items.map((item) => (
              <Box key={item.id}>
                <Flex align="center" justify="space-between">
                  <Text fontWeight="bold" fontSize="2xl">
                    {item.title}
                  </Text>
                  <HStack>
                    <Button variant="outline" colorScheme="gray">
                      자세히 보기
                    </Button>
                    <Button colorScheme="gray" variant="solid">
                      채팅
                    </Button>
                  </HStack>
                </Flex>
                <Divider my={4} />
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Flex>
  </Box>
);

export default LandingPagePresentation;