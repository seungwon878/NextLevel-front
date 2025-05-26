import React, { useState, useEffect } from 'react';
import LandingPagePresentation from './LandingPagepresentation';
import { Item } from './LandingPagepresentation';
import { useNavigate } from "react-router-dom";
//import { useAppContext } from "../../AppContext";

const dummyItems: Item[] = [
  { id: 1, section: 'Section 30', title: '2025 소프트웨어 공학 기말고사 문제(000교수)' },
  { id: 2, section: 'Section 30', title: '2023 프로그래밍 언어 중간/기말 문제(000교수)' },
  { id: 3, section: 'Section 30', title: '2020 경제학원론 기말고사 문제(000교수)' },
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