import React, { useState, useEffect } from 'react';
import QaInfoPresentation from './QaInfoPagePresentation';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AppContext';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

const QaInfoPageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, logout } = useAuth();
  const [qaData, setQaData] = useState({
    title: '',
    content: '',
    comments: [] as Comment[],
    school: '',
    subject: '',
    professor: '',
    attachment: null as { name: string; url: string; } | null
  });

  useEffect(() => {
    // TODO: 실제 API 호출로 교체
    // 임시 데이터
    setQaData({
      title: '소프트웨어 공학 과제 질문',
      content: '소프트웨어 공학 과제에서 발생한 문제에 대해 질문드립니다.\n\n1. 요구사항 분석 단계에서...\n2. 설계 단계에서...',
      comments: [
        {
          id: '1',
          content: '이런 방식으로 해결해보시는 건 어떨까요?',
          author: {
            id: 'user1',
            name: '김철수',
            avatar: 'https://bit.ly/ryan-florence'
          },
          createdAt: '2024-03-15T10:30:00Z'
        },
        {
          id: '2',
          content: '제가 비슷한 경험이 있어서 도움이 될 것 같습니다.',
          author: {
            id: 'user2',
            name: '이영희',
            avatar: 'https://bit.ly/kent-c-dodds'
          },
          createdAt: '2024-03-15T11:45:00Z'
        }
      ],
      school: '서울대학교',
      subject: '소프트웨어 공학',
      professor: '홍길동',
      attachment: {
        name: '과제_설명서.pdf',
        url: '/path/to/file.pdf'
      }
    });
  }, [id]);

  const handleLogout = () => {
    logout();
  };

  return (
    <QaInfoPresentation
      title={qaData.title}
      content={qaData.content}
      comments={qaData.comments}
      school={qaData.school}
      subject={qaData.subject}
      professor={qaData.professor}
      attachment={qaData.attachment || undefined}
    />
  );
};

export default QaInfoPageContainer;
