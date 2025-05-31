import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  Spinner,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { verifyPasswordApi, changePasswordApi, deleteMyAccount } from '../../Apis/gwon/api';

interface Profile {
  username: string;
  email: string;
  profileImageUrl: string;
  content: string;
}

interface MyPagePresentationProps {
  profile: Profile | null;
  loading : boolean;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onRegister: () => void;
  onGoMyPage: () => void;
  onGoMain: () => void;
}

const TopNav: React.FC<MyPagePresentationProps> = ({
  profile,
  loading,
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

const PasswordChangeModal: React.FC<{ isOpen: boolean; onClose: () => void; token: string }> = ({ isOpen, onClose, token }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'verify' | 'change'>('verify');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async () => {
    setIsSubmitting(true);
    setMsg('');
    try {
      await verifyPasswordApi(currentPassword, token);
      setStep('change');
      setMsg('');
    } catch (err: any) {
      setMsg(err.message || '비밀번호가 일치하지 않습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    setIsSubmitting(true);
    setMsg('');
    try {
      await changePasswordApi(newPassword, token);
      setMsg('비밀번호가 성공적으로 변경되었습니다.');
      setTimeout(() => {
        onClose();
        setStep('verify');
        setCurrentPassword('');
        setNewPassword('');
        setMsg('');
      }, 1200);
    } catch (err: any) {
      setMsg(err.message || '비밀번호 변경 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setStep('verify');
    setCurrentPassword('');
    setNewPassword('');
    setMsg('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비밀번호 변경</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 'verify' ? (
            <>
              <Input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                mb={3}
              />
              <Button colorScheme="gray" w="100%" onClick={handleVerify} isLoading={isSubmitting}>
                현재 비밀번호 확인
              </Button>
            </>
          ) : (
            <>
              <Input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                mb={3}
              />
              <Button colorScheme="gray" w="100%" onClick={handleChangePassword} isLoading={isSubmitting}>
                변경
              </Button>
            </>
          )}
          {msg && <Text color={msg.includes('성공') ? 'green.500' : 'red.500'} mt={3} fontSize="sm">{msg}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={handleModalClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// 회원탈퇴 모달
const AccountDeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  token: string;
  onLogout: () => void;
}> = ({ isOpen, onClose, token, onLogout }) => {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    setMsg('');
    try {
      await verifyPasswordApi(password, token);
      await deleteMyAccount(token);
      setMsg('회원 탈퇴가 완료되었습니다.');
      setTimeout(() => {
        onLogout();
        onClose();
      }, 1200);
    } catch (err: any) {
      setMsg(err.message || '회원 탈퇴에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setPassword('');
    setMsg('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원 탈퇴</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={2} fontSize="sm" color="gray.600">
            회원 탈퇴를 위해 비밀번호를 입력해주세요.
          </Text>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            mb={3}
          />
          {msg && (
            <Text color={msg.includes('완료') ? 'green.500' : 'red.500'} mt={2} fontSize="sm">
              {msg}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete} isLoading={isSubmitting}>
            회원 탈퇴
          </Button>
          <Button variant="ghost" onClick={handleModalClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SideBar: React.FC<{ onChangePassword: () => void; onDeleteAccount: () => void; onLogout: () => void }> = ({ onChangePassword, onDeleteAccount,onLogout }) => (
  <Box
    w="260px"
    bg="#F5F7FA"
    minH="calc(100vh - 72px)"
    px={8}
    py={8}
    borderRight="1px solid #E2E8F0"
  >
    <VStack align="stretch" spacing={4}>
      <Button colorScheme="gray" w="100%" onClick={onChangePassword}>
        비밀번호 수정
      </Button>
      <Button colorScheme="gray" w="100%" onClick={onLogout}>
        로그아웃
      </Button>
      <Button colorScheme="red" w="100%" onClick={onDeleteAccount}>
        회원 탈퇴
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
  const { profile, loading, onLogout } = props;
  const { isOpen: pwOpen, onOpen: onPwOpen, onClose: onPwClose } = useDisclosure();
  const { isOpen: delOpen, onOpen: onDelOpen, onClose: onDelClose } = useDisclosure();
  const token = localStorage.getItem('token') || '';

  return (
    <Box minH="100vh" bg="#F5F7FA">
      <TopNav {...props} />
      <Flex>
        <SideBar onChangePassword={onPwOpen} onDeleteAccount={onDelOpen} onLogout={props.onLogout}/>
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
                  {loading ? (
                    <Spinner size="xl" />
                  ) : (
                    <>
                      <Avatar
                        size="xl"
                        src={profile?.profileImageUrl}
                        name={profile?.username}
                        bg="#e9ecf2"
                      />
                      <Box>
                        <Text fontWeight="bold" fontSize="xl" mb={1}>
                          {profile?.username}
                        </Text>
                        <Text color="gray.600" fontSize="md">
                          {profile?.email}<br />
                          {profile?.content && <>{profile.content}<br /></>}
                        </Text>
                      </Box>
                    </>
                  )}
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
      <PasswordChangeModal isOpen={pwOpen} onClose={onPwClose} token={token} />
      <AccountDeleteModal isOpen={delOpen} onClose={onDelClose} token={token} onLogout={onLogout} />
    </Box>
  );
};

export default MyPagePresentation;
