import React from 'react';
import { useParams } from 'react-router-dom';
import TeamPagePresentation from './TeamPagePresentation';
import { useAuth } from '../../AppContext';

// 학교 팀 프로젝트 더미 데이터
const dummyData = [
  {
    id: '1',
    title: '캡스톤 디자인 - AI 기반 학습 관리 시스템',
    school: '서울대학교',
    department: '컴퓨터공학과',
    professor: '김영수',
    courseName: '캡스톤 디자인',
    semester: '2025-1학기',
    currentMembers: 2,
    totalMembers: 4,
    recruitmentField: '프론트엔드 개발자',
    description: `캡스톤 디자인 프로젝트로 AI 기반 학습 관리 시스템을 개발합니다.

현재 팀 구성:
- 팀장: 컴공과 4학년 (백엔드)
- 팀원: 컴공과 4학년 (AI/ML)

모집 인원: 프론트엔드 개발자 2명

프로젝트 개요:
- 머신러닝을 활용한 개인 맞춤형 학습 추천 시스템
- React 기반 웹 애플리케이션 개발
- 학습 진도 관리 및 성과 분석 기능
- 실시간 스터디 그룹 매칭 서비스

기술 스택:
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Spring Boot, Python Flask
- Database: MySQL, Redis
- AI/ML: TensorFlow, scikit-learn

프로젝트 일정:
- 3월: 요구사항 분석 및 설계
- 4월-5월: 개발 및 구현
- 6월: 테스트 및 발표 준비

참여 조건:
- React 개발 경험 필수
- TypeScript 사용 가능자 우대
- 팀 프로젝트 경험 보유자 우대
- 매주 2회 이상 정기 모임 참석 가능자`,
    contact: 'kakao: ai_project2025',
    deadline: '2025-06-10',
    status: '모집중'
  },
  {
    id: '2',
    title: '소프트웨어공학 - 대학생 커뮤니티 플랫폼',
    school: '연세대학교',
    department: '소프트웨어학과',
    professor: '박민정',
    courseName: '소프트웨어공학',
    semester: '2025-1학기',
    currentMembers: 3,
    totalMembers: 5,
    recruitmentField: 'UI/UX 디자이너',
    description: `소프트웨어공학 팀 프로젝트로 대학생 전용 커뮤니티 플랫폼을 개발합니다.

현재 팀 구성:
- 프론트엔드: 소프트웨어학과 3학년
- 백엔드: 소프트웨어학과 3학년 (팀장)
- 기획: 경영학과 3학년

모집 인원: UI/UX 디자이너 1명, 백엔드 개발자 1명

프로젝트 개요:
- 대학생들을 위한 정보 공유 및 네트워킹 플랫폼
- 학과별, 동아리별 커뮤니티 기능
- 중고거래, 스터디 모집, 프로젝트 팀 매칭
- 실시간 채팅 및 알림 시스템`,
    contact: 'email: yonsei.team@gmail.com',
    deadline: '2025-06-05',
    status: '모집중'
  }
];

const TeamPageContainer: React.FC = () => {
  const { id } = useParams();
  const project = dummyData.find(item => item.id === id) || dummyData[0];
  const { isAuthenticated, logout } = useAuth();

  return (
    <TeamPagePresentation
      title={project.title}
      school={project.school}
      department={project.department}
      professor={project.professor}
      courseName={project.courseName}
      semester={project.semester}
      currentMembers={project.currentMembers}
      totalMembers={project.totalMembers}
      recruitmentField={project.recruitmentField}
      description={project.description}
      contact={project.contact}
      deadline={project.deadline}
      status={project.status}
      isAuthenticated={isAuthenticated}
      onLogout={logout}
    />
  );
};

export default TeamPageContainer;
