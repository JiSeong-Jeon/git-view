// 저장소 상세 정보 컴포넌트
const RepoDetailPanel = ({ repoDetails, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-200 ml-20">
        <p className="text-center text-gray-500">상세 정보 로딩 중...</p>
      </div>
    );
  }

  if (!repoDetails) {
    return null;
  }
  console.log(repoDetails);
  return (
    <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4 border-primary-500 ml-20 transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-semibold mb-3 text-primary-600">
        저장소 상세
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">생성일</span>
          <span className="text-sm">
            {new Date(repoDetails.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">최종 업데이트</span>
          <span className="text-sm">
            {new Date(repoDetails.updated_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">이슈</span>
          <span className="text-sm">{repoDetails.open_issues_count} 개</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">사이즈</span>
          <span className="text-sm">
            {Math.round((repoDetails.size / 1024) * 10) / 10} MB
          </span>
        </div>
      </div>

      {repoDetails.license && (
        <div className="mb-3">
          <span className="text-xs text-gray-500 block">라이센스</span>
          <span className="text-sm">{repoDetails.license.name}</span>
        </div>
      )}

      {repoDetails.homepage && (
        <div className="mb-3">
          <span className="text-xs text-gray-500 block">홈페이지</span>
          <a
            href={repoDetails.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            {repoDetails.homepage}
          </a>
        </div>
      )}

      <a
        href={repoDetails.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:underline flex items-center mt-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        GitHub에서 보기
      </a>
    </div>
  );
};

export default RepoDetailPanel;
