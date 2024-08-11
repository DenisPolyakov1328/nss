import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

//функция для поиска репозиториев по ключевым словам
export const searchRepositories = async (query: string, page: number, perPage: number, sort: string, order: 'asc' | 'desc') => {
    const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
        params: {
            q: query,
            page,
            per_page: perPage,
            sort,
            order
        }
    });
    return response.data;
};

//функция для получения деталей выбранного репозитория
export const getRepositoryDetails = async (owner: string, repo: string) => {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}`);
    return response.data;
};

