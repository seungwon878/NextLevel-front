import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InformationPagePresentation from './InformationPagePresentation';
import { getProblemPostById, ProblemPost } from '../../Apis/han/problemPostApi';

const InformationPageContainer: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<ProblemPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          throw new Error('게시글 ID가 없습니다.');
        }
        const response = await getProblemPostById(parseInt(id));
        if (response.success) {
          setPost(response.data);
          // 현재 로그인한 사용자가 작성자인지 확인
          const currentUser = localStorage.getItem('username');
          setIsAuthor(currentUser === response.data.author);
        } else {
          throw new Error(response.message || '게시글을 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || !post) {
    return <div>에러: {error || '게시글을 찾을 수 없습니다.'}</div>;
  }

  return (
    <InformationPagePresentation
      id={post.id}
      title={post.title}
      school={post.school}
      subject={post.subject}
      professor={post.professorName}
      detail={post.content}
      fileUrl={post.problemDataUrl}
      fileName={post.problemDataUrl.split('/').pop() || '파일'}
      isAuthor={isAuthor}
      schoolOptions={['서울대학교', '연세대학교', '고려대학교']} // 실제 학교 목록으로 대체 필요
      subjectOptions={['수학', '물리', '화학']} // 실제 과목 목록으로 대체 필요
      professorOptions={['홍길동', '김철수', '이영희']} // 실제 교수 목록으로 대체 필요
    />
  );
};

export default InformationPageContainer;
