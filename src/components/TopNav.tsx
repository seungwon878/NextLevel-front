import React from 'react';
import { Flex, Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AppContext';

interface TopNavProps {
  currentPage?: string;
}

const TopNav: React.FC<TopNavProps> = ({ currentPage }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

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
      <Button fontWeight="bold" colorScheme="gray" variant="solid" size="lg" onClick={() => navigate('/landing')}>
        Logo
      </Button>
      <HStack spacing={8}>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/landing')}
          borderBottom={currentPage === 'landing' ? '2px solid #2D3748' : 'none'}
        >
          문제 게시판
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/project')}
          borderBottom={currentPage === 'project' ? '2px solid #2D3748' : 'none'}
        >
          프로젝트 팀
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/qapage')}
          borderBottom={currentPage === 'qapage' ? '2px solid #2D3748' : 'none'}
        >
          Q&A 게시판
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/chat')}
          borderBottom={currentPage === 'chat' ? '2px solid #2D3748' : 'none'}
        >
          채팅
        </Button>
      </HStack>
      <HStack spacing={2}>
        {isAuthenticated ? (
          <>
            <Button colorScheme="gray" variant="outline" onClick={handleLogout}>
              LOGOUT
            </Button>
            <Button colorScheme="gray" variant="solid" onClick={() => navigate('/mypage')}>
              MYPAGE
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="gray" variant="outline" onClick={() => navigate('/login')}>
              LOGIN
            </Button>
            <Button colorScheme="gray" variant="solid" onClick={() => navigate('/signup')}>
              REGISTER
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default TopNav; 