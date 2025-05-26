import React from 'react';
import { useParams } from 'react-router-dom';
import InformationPagePresentation from './InformationPagePresentation';

// 예시 더미 데이터
const dummyData = [
  {
    id: '1',
    title: '2025 소프트웨어 공학 기말고사 문제(홍길동교수)',
    school: '서울대학교',
    subject: '소프트웨어공학',
    professor: '홍길동',
    detail: '이 문서는 2025년 소프트웨어 공학 기말고사 문제와 해설을 포함하고 있습니다. 시험 범위는 1~10주차이며, 주요 이론과 실습 문제가 포함되어 있습니다.',
  },
  {
    id: '2',
    title: '2023 프로그래밍 언어 중간/기말 문제(이순신교수)',
    school: '고려대학교',
    subject: '프로그래밍 언어',
    professor: '이순신',
    detail: '2023년 프로그래밍 언어 중간/기말고사 문제 모음입니다. 다양한 언어의 문법과 개념, 실습 예제가 포함되어 있습니다.',
  },
  {
    id: '3',
    title: '2020 경제학원론 기말고사 문제(김철수교수)',
    school: '연세대학교',
    subject: '경제학원론',
    professor: '김철수',
    detail: '2020년 경제학원론 기말고사 문제와 해설입니다. 경제학의 기본 개념과 계산 문제가 포함되어 있습니다.',
  },
];

const InformationPageContainer: React.FC = () => {
  const { id } = useParams();
  const info = dummyData.find(item => item.id === id) || dummyData[0];

  return (
    <InformationPagePresentation
      title={info.title}
      school={info.school}
      subject={info.subject}
      professor={info.professor}
      detail={info.detail}
    />
  );
};

export default InformationPageContainer;
