import React, { useState, useEffect } from 'react';
import LandingPagePresentation, { Item } from './LandingPagepresentation';
import { useNavigate } from "react-router-dom";
//import { useAppContext } from "../../AppContext";

const dummyItems: Item[] = [
  { id: 1, section: 'Section 30', title: '자바스크립트 이벤트 처리에 대해 질문합니다.' },
  { id: 2, section: 'Section 30', title: 'React 렌더링 최적화 방법은?' },
  { id: 3, section: 'Section 30', title: 'Next.js와 Gatsby 차이점 문의' },
];

const LandingPageContainer: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');

  useEffect(() => {
    // TODO: 실제 API 호출 로직으로 교체
    setItems(dummyItems);
  }, []);

  const filtered = items.filter(item =>
    item.title.includes(searchText) &&
    (school === '' || item.section === school) &&
    (subject === '' || item.title.includes(subject)) &&
    (professor === '' || item.title.includes(professor))
  );

  return (
    <LandingPagePresentation
      items={filtered}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      school={school}
      onSchoolChange={setSchool}
      subject={subject}
      onSubjectChange={setSubject}
      professor={professor}
      onProfessorChange={setProfessor}
    />
  );
};

export default LandingPageContainer;