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

export interface TeamProjectItem {
  id: number;
  title: string;
  school: string;
  subject: string;
  professor: string;
  createdAt: string;
}

export async function fetchTeamProjects(
  searchText: string,
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc'
): Promise<TeamProjectItem[]> {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
      kw: searchText,
    }).toString();

    const response = await fetch(`http://52.78.159.151:8080/api/team-recruits?${query}`);
    
    if (!response.ok) {
      throw new Error('데이터 불러오기 실패');
    }

    const data = await response.json();
    return data.content.map((item: any) => ({
      id: item.id,
      title: item.title,
      school: item.school,
      subject: item.department,
      professor: item.author,
      createdAt: item.createdAt,
    }));
  } catch (error) {
    throw new Error('데이터를 불러올 수 없습니다.');
  }
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