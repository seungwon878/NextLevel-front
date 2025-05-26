import React from 'react';
import { useParams } from 'react-router-dom';
import QaInfoPresentation from './QaInfoPagePresentation';

const dummyData = [
  {
    id: '1',
    title: '2024 자료구조 기말고사 예상문제',
    content: '자료구조 기말고사에 나올 만한 문제와 해설을 공유합니다. 궁금한 점은 댓글로 남겨주세요.',
    comments: ['답변1: 좋은 자료 감사합니다!', '답변2: 3번 문제 해설이 궁금합니다.'],
  },
  {
    id: '2',
    title: '2023 알고리즘 Q&A',
    content: '알고리즘 관련 질문을 올려주세요. 빠르게 답변드리겠습니다.',
    comments: ['답변1: DP 문제 풀이법 알려주세요.', '답변2: 그리디 알고리즘 예시 부탁드립니다.'],
  },
  {
    id: '3',
    title: '2022 컴퓨터구조 질문',
    content: '컴퓨터구조 과목에서 이해가 안 되는 부분을 질문해주세요.',
    comments: ['답변1: 캐시 메모리 설명 감사합니다.', '답변2: 파이프라이닝 개념이 어렵네요.'],
  },
];

const QaInfoPageContainer: React.FC = () => {
  const { id } = useParams();
  const info = dummyData.find(item => item.id === id) || dummyData[0];

  return (
    <QaInfoPresentation
      title={info.title}
      content={info.content}
      comments={info.comments}
    />
  );
};

export default QaInfoPageContainer;
