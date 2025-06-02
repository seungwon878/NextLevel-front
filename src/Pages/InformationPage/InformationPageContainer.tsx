import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InformationPagePresentation from './InformationPagePresentation';
import { getProblemPostById, ProblemPost } from '../../Apis/han/problemPostApi';

const InformationPageContainer: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<ProblemPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          throw new Error('게시글 ID가 없습니다.');
        }
        const response = await getProblemPostById(parseInt(id));
        if (response.success) {
          setPost(response.data);
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
      title={post.title}
      school={post.school}
      subject={post.subject}
      professor={post.professorName}
      detail={post.content}
      fileUrl={post.problemDataUrl}
      fileName={post.problemDataUrl.split('/').pop() || '파일'}
    />
  );
};

export default InformationPageContainer;
