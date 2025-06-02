export async function loginApi(username: string, password: string) {
  const response = await fetch('http://52.78.159.151:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();

  if (!response.ok) {
    switch (result.statusMessage) {
      case "NOT_FOUND":
        throw new Error('존재하지 않는 아이디입니다.');
      case "BAD_CREDENTIALS":
        throw new Error('아이디와 비밀번호가 일치하지 않습니다.');
      default:
        throw new Error(result.statusMessage || '로그인 실패');
    }
  }

  if (result.data.accessToken) {
    localStorage.setItem('token', result.data.accessToken);
  }
  if (result.data.refreshToken) {
    localStorage.setItem('refreshToken', result.data.refreshToken);
  }

  return result;
}

export async function signupApi(email: string, username: string, password: string) {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob(
      [JSON.stringify({ username, password, email })],
      { type: "application/json" }
    )
  );

  const response = await fetch('http://52.78.159.151:8080/api/members/signup', {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();

  if (!response.ok) {
    switch (result.statusMessage) {
      case "DUPLICATED_MEMBER":
        throw new Error('동일한 아이디가 존재합니다.');
      case "DUPLICATED_EMAIL":
        throw new Error('동일한 이메일이 존재합니다.');
      default:
        throw new Error(result.statusMessage || '회원가입 실패');
    }
  }
  return result;
}

export async function fetchMyProfile(token: string) {
  const response = await fetch('http://52.78.159.151:8080/api/members/me', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || '회원 정보 조회 실패');
  }
  return result.data;
}

// 비밀번호 변경
export async function changePasswordApi(newPassword: string, token: string) {
  const res = await fetch(`http://52.78.159.151:8080/api/members/me/change-password?newPassword=${encodeURIComponent(newPassword)}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || '비밀번호 변경 실패');
  }
  return data;
}

export async function updateProfileApi({
  email,
  content,
  image,
  token,
}: {
  email?: string;
  content?: string;
  image?: File | null;
  token: string;
}) {
  const formData = new FormData();
  if (image) formData.append('image', image);
  formData.append('image', new Blob());
  const requestBody = { email, content };
  formData.append(
    'request',
    new Blob([JSON.stringify(requestBody)], { type: 'application/json' })
  );

  const res = await fetch('http://52.78.159.151:8080/api/members/me', {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || '프로필 변경 실패');
  }
  return data;
}


export async function verifyPasswordApi(currentPassword: string, token: string) {
  const res = await fetch(
    `http://52.78.159.151:8080/api/members/me/verify-password?currentPassword=${encodeURIComponent(currentPassword)}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || '비밀번호가 일치하지 않습니다.');
  }
  return data;
}

export async function deleteMyAccount(token: string) {
  const response = await fetch('http://52.78.159.151:8080/api/members/me', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || '회원 탈퇴에 실패했습니다.');
  }
  return result;
}

// src/Apis/gwon/api.ts
export async function fetchTeamProjects({
  kw = '',
  page = 0,
  size = 10,
  sort = 'createdAt,desc',
}: {
  kw?: string;
  page?: number;
  size?: number;
  sort?: string;
}) {
  const params = new URLSearchParams();
  if (kw) params.append('kw', kw);
  params.append('page', String(page));
  params.append('size', String(size));
  params.append('sort', sort);

  const response = await fetch(`http://52.78.159.151:8080/api/team-recruits?${params.toString()}`);
  if (!response.ok) throw new Error('데이터 불러오기 실패');
  const data = await response.json();
  return data.content.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    author: item.author,
    school: item.school,
    department: item.department,
    createdAt: item.createdAt,
  }));
}

export async function createTeamRecruit({
  title,
  content,
  department,
  school,
  token,
}: {
  title: string;
  content: string;
  department: string;
  school: string;
  token: string;
}) {
  const res = await fetch('http://52.78.159.151:8080/api/team-recruits', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, department, school }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || '팀 모집 업로드 실패');
  }
  return res.json();
}

export interface TeamProjectDetail {
  id: number;
  title: string;
  content: string;
  author: string;
  department: string;
  school: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchTeamProjectDetail(id: string | number): Promise<TeamProjectDetail> {
  const response = await fetch(`http://52.78.159.151:8080/api/team-recruits/${id}`);
  if (!response.ok) throw new Error('데이터 불러오기 실패');
  return response.json();
}

export async function updateTeamProject(
  id: string | number,
  {
    title,
    content,
    department,
    school,
    token,
  }: {
    title: string;
    content: string;
    department: string;
    school: string;
    token: string;
  }
) {
  const res = await fetch(`http://52.78.159.151:8080/api/team-recruits/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, department, school }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || '게시글 수정 실패');
  }
  return res.json();
}

export async function deleteTeamProject(id: string | number, token: string) {
  const res = await fetch(`http://52.78.159.151:8080/api/team-recruits/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || '게시글 삭제 실패');
  }
}
