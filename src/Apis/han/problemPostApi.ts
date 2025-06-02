// 




import axios from 'axios';

// ✅ axios 인스턴스 생성 (Content-Type 제거)
const api = axios.create({
  baseURL: 'http://52.78.159.151:8080',
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Request URL:', config.url);
    console.log('Request Method:', config.method);
    console.log('Request Headers:', config.headers);
    console.log('Request Data:', config.data);

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
      console.error('API Error Headers:', error.response.headers);
      console.error('Request Config:', error.config);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const BASE_URL = '/api/problem-posts';

export interface ProblemPost {
  id: number;
  title: string;
  content: string;
  author: string;
  professorName: string;
  school: string;
  subject: string;
  problemDataUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProblemPostResponse {
  success: boolean;
  code: string;
  message: string;
  data: ProblemPost;
}

export interface ProblemPostListResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    content: ProblemPost[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    numberOfElements: number;
    sort: any;
  };
}

export interface ProblemPostRequest {
  title: string;
  content: string;
  professorName: string;
  school: string;
  subject: string;
}

// ✅ 게시글 생성
export const createProblemPost = async (formData: FormData): Promise<ProblemPostResponse> => {
  const orderedFormData = new FormData();

  const getString = (field: string): string => {
    const value = formData.get(field);
    return typeof value === 'string' ? value : '';
  };

  const requestData = {
    title: getString('title'),
    content: getString('content'),
    professorName: getString('professorName'),
    school: getString('school'),
    subject: getString('subject'),
  };

  // ✅ JSON 데이터는 "request"라는 이름의 Blob으로 추가
  orderedFormData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' })
  );

  // ✅ 파일은 "data"라는 이름으로 추가해야 함
  const file = formData.get('file');
  if (file instanceof File && file.size > 0) {
    orderedFormData.append('data', file);  // ← 백엔드에서 name = "data"로 받음
  }

  // 로그 확인
  console.log('Request Data:', requestData);
  console.log('Ordered FormData contents:');
  Array.from(orderedFormData.entries()).forEach(([key, value]) => {
    console.log(`${key}:`, value);
  });

  try {
    const { data } = await api.post<ProblemPostResponse>(`${BASE_URL}/create`, orderedFormData);
    return data;
  } catch (error: any) {
    console.error('Upload Error Details:', {
      requestData,
      error: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      formData: Array.from(orderedFormData.entries()),
    });
    throw error;
  }
};

// ✅ 전체 게시글 조회
export const getAllProblemPosts = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'id,desc'
): Promise<ProblemPostListResponse> => {
  const { data } = await api.get<ProblemPostListResponse>(`${BASE_URL}/all`, {
    params: { page, size, sort },
  });
  return data;
};

// ✅ 게시글 상세 조회
export const getProblemPostById = async (postId: number): Promise<ProblemPostResponse> => {
  const { data } = await api.get<ProblemPostResponse>(`${BASE_URL}/${postId}`);
  return data;
};

// ✅ 게시글 검색
export const searchProblemPosts = async (
  params: {
    title?: string;
    professorName?: string;
    subject?: string;
    school?: string;
    page?: number;
    size?: number;
    sort?: string;
  }
): Promise<ProblemPostListResponse> => {
  const { data } = await api.get<ProblemPostListResponse>(`${BASE_URL}/search`, { params });
  return data;
};

// ✅ 게시글 수정 (파일 포함)
export const updateProblemPost = async (
  postId: number,
  formData: FormData
): Promise<ProblemPostResponse> => {
  const { data } = await api.post<ProblemPostResponse>(`${BASE_URL}/${postId}`, formData);
  return data;
};
