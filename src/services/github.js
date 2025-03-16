import axios from "axios";

const BASE_URL = "https://api.github.com";

const githubAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export const getUserData = async (username) => {
  try {
    console.log(`Requesting: ${BASE_URL}/users/${username}`); // 요청 URL 로깅
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`GitHub 사용자 '${username}'을(를) 찾을 수 없습니다.`);
      throw new Error(`GitHub 사용자 '${username}'을(를) 찾을 수 없습니다.`);
    }
    console.error(
      "GitHub API 요청 오류:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getUserRepos = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}/repos`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching repository data: `, err);
    throw err;
  }
};

export const getRepoDetails = async (username, repoName) => {
  try {
    const response = await githubAPI.get(`/repos/${username}/${repoName}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching repository details: `, err);
    throw err;
  }
};

export const getRepoReadme = async (username, repoName) => {
  try {
    const response = await githubAPI.get(
      `/repos/${username}/${repoName}/readme`
    );
    // README 내용은 base64로 인코딩되어 있으므로 디코딩이 필요
    const content = atob(response.data.content);
    return content;
  } catch (err) {
    console.error(`Error fetching repository README: `, err);
    throw err;
  }
};
