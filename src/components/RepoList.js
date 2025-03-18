import RepoDetailPanel from "./RepoDetail";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRepoDetails } from "../services/github";

/////////////////////////////////svg///////////////////////////////////////
import { ReactComponent as CppSvg } from "../assets/languages/cpp.svg";
import { ReactComponent as GoSvg } from "../assets/languages/go.svg";
import { ReactComponent as JavaSvg } from "../assets/languages/java.svg";
import { ReactComponent as JSSvg } from "../assets/languages/javascript.svg";
import { ReactComponent as KotlinSvg } from "../assets/languages/kotlin.svg";
import { ReactComponent as PythonSvg } from "../assets/languages/python.svg";
import { ReactComponent as SwiftSvg } from "../assets/languages/swift.svg";
////////////////////////////////////////////////////////////////////////////

// 언어별 아이콘 매핑 함수
const getLanguageIcon = (language) => {
  const iconSize = "w-16 h-16";

  switch (language?.toLowerCase()) {
    case "c++":
    case "cpp":
      return <CppSvg className={iconSize} />;
    case "go":
      return <GoSvg className={iconSize} />;
    case "java":
      return <JavaSvg className={iconSize} />;
    case "javascript":
    case "js":
      return <JSSvg className={iconSize} />;
    case "kotlin":
      return <KotlinSvg className={iconSize} />;
    case "python":
      return <PythonSvg className={iconSize} />;
    case "swift":
      return <SwiftSvg className={iconSize} />;
    default:
      return (
        <div
          className={`${iconSize} rounded-lg bg-gray-200 flex items-center justify-center`}
        >
          <span className="text-gray-600 text-2xl font-medium">
            {language ? language.charAt(0).toUpperCase() : "?"}
          </span>
        </div>
      );
  }
};

const formatRepoData = (repo) => {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || "설명 없음",
    language: repo.language || "언어 없음",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: new Date(repo.updated_at).toLocaleDateString(),
    url: repo.html_url,
    topics: repo.topics || [],
    isPrivate: repo.private,
    size: repo.size,
    visibility: repo.visibility,
  };
};

const RepoList = ({ username, repodata }) => {
  const [formattedRepos, setFormattedRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedRepoName, setSelectedRepoName] = useState("");

  // 선택된 저장소의 상세 정보를 가져오는 쿼리
  const { data: repoDetails, isLoading: isRepoDetailsLoading } = useQuery({
    queryKey: ["repodetail", username, selectedRepoName],
    queryFn: () => getRepoDetails(username, selectedRepoName),
    enabled: !!username && !!selectedRepoName,
    staleTime: 600000,
  });

  // 저장소 목록 포맷팅
  useEffect(() => {
    if (repodata && repodata.length > 0) {
      const formatted = repodata.map(formatRepoData);
      const sorted = [...formatted].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setFormattedRepos(sorted);
    }
  }, [repodata]);

  // 선택된 저장소가 변경되면 저장소 이름 업데이트
  useEffect(() => {
    if (selectedRepo && formattedRepos.length > 0) {
      const selectedRepoData = formattedRepos.find(
        (repo) => repo.id === selectedRepo
      );
      if (selectedRepoData) {
        setSelectedRepoName(selectedRepoData.name);
      }
    }
  }, [selectedRepo, formattedRepos]);

  // 저장소 선택 핸들러
  const handleRepoSelect = (repo) => {
    if (selectedRepo === repo.id) {
      setSelectedRepo(null);
      setSelectedRepoName("");
    } else {
      setSelectedRepo(repo.id);
      setSelectedRepoName(repo.name);
    }
  };

  // 이 함수를 컴포넌트 내부로 이동
  const renderRepoListWithDetails = () => {
    if (!formattedRepos.length) return null;

    const renderedList = [];

    formattedRepos.forEach((repo) => {
      // 리스트 아이템 추가
      renderedList.push(
        <div
          key={`repo-${repo.id}`}
          className={`shadow-md w-full flex items-center p-4 cursor-pointer bg-white rounded-xl mb-3 border transition-all ${
            selectedRepo === repo.id
              ? "border-primary-500 shadow-md"
              : "border-gray-200 hover:border-gray-300 shadow-sm"
          }`}
          onClick={() => handleRepoSelect(repo)}
        >
          {/* 기존 코드 유지 */}
          <div className="flex-shrink-0 mr-4">
            {getLanguageIcon(repo.language)}
          </div>

          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">{repo.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>⭐ {repo.stars}</span>
                <span>forks : {repo.forks}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 my-1">{repo.description}</p>
            <div className="flex items-center mt-2">
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700 mr-2">
                {repo.language}
              </span>
              <span className="text-xs text-gray-500">
                최근 업데이트: {repo.updatedAt}
              </span>
            </div>

            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {repo.topics.slice(0, 3).map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                  >
                    {topic}
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{repo.topics.length - 3}개 더보기
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      );

      // 선택된 저장소의 경우 상세 정보 패널 추가
      if (selectedRepo === repo.id) {
        renderedList.push(
          <RepoDetailPanel
            key={`detail-${repo.id}`}
            repoDetails={repoDetails}
            isLoading={isRepoDetailsLoading}
          />
        );
      }
    });

    return renderedList;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">{renderRepoListWithDetails()}</div>
  );
};

export default RepoList;
