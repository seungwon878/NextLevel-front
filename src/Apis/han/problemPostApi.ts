import axios from 'axios';

const BASE_URL = '/api/problem-posts';

export interface ProblemPost {
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
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    empty: boolean;
  };
}

export const createProblemPost = async (formData: FormData): Promise<ProblemPostResponse> => {
  const { data } = await axios.post<ProblemPostResponse>(`${BASE_URL}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
};

export const getAllProblemPosts = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'id,desc'
): Promise<ProblemPostListResponse> => {
  const { data } = await axios.get<ProblemPostListResponse>(`${BASE_URL}/all`, {
    params: { page, size, sort },
  });
  return data;
};

export const getProblemPostById = async (postId: number): Promise<ProblemPostResponse> => {
  const { data } = await axios.get<ProblemPostResponse>(`${BASE_URL}/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
};

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
  const { data } = await axios.get<ProblemPostListResponse>(`${BASE_URL}/search`, { params });
  return data;
}; 