// src/Pages/LandingPage/LandingPagePresentation.tsx
import React from 'react';
import { Box, Input, Button, Text, chakra } from '@chakra-ui/react';

// chakra 팩토리로 진짜 HTML select를 스타일링
const StyledSelect = chakra('select');

export interface Item {
  id: number;
  section: string;
  title: string;
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
}

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
}) => (
  <Box display="flex" alignItems="flex-start" p={8} gap={6} bg="gray.50">
    {/* ─── 필터 영역 ─── */}
    <Box display="flex" flexDirection="column" gap={4} width="25%">
      <Input
        placeholder="검색"
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearchTextChange(e.target.value)
        }
      />

      <StyledSelect
        value={school}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onSchoolChange(e.target.value)
        }
        p={2}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
      >
        <option value="">학교 선택</option>
        <option value="Section 30">Section 30</option>
        <option value="Section 31">Section 31</option>
        <option value="Section 32">Section 32</option>
      </StyledSelect>

      <StyledSelect
        value={subject}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onSubjectChange(e.target.value)
        }
        p={2}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
      >
        <option value="">과목 선택</option>
        <option value="CS">CS</option>
        <option value="Math">Math</option>
        <option value="English">English</option>
      </StyledSelect>

      <StyledSelect
        value={professor}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onProfessorChange(e.target.value)
        }
        p={2}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
      >
        <option value="">교수 선택</option>
        <option value="김철수">김철수</option>
        <option value="이영희">이영희</option>
        <option value="박민수">박민수</option>
      </StyledSelect>

      <Button w="100%">→</Button>
      <Button w="100%" colorScheme="teal">
        업로드
      </Button>
    </Box>

    {/* ─── 리스트 영역 ─── */}
    <Box width="75%" p={4} bg="white" borderRadius="md" boxShadow="sm">
      {items.length > 0 ? (
        items.map(item => (
          <Box
            key={item.id}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            p={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            gap={2}
          >
            <Box>
              <Text fontSize="sm" color="gray.500">
                {item.section}
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                {item.title}
              </Text>
            </Box>
            <Box display="flex" gap={2}>
              <Button size="sm">자세히 보기</Button>
              <Button size="sm" colorScheme="teal">
                채팅
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Text textAlign="center" color="gray.500" py={8}>
          조건에 맞는 글이 없습니다.
        </Text>
      )}
    </Box>
  </Box>
);

export default LandingPagePresentation;
