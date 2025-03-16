import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserProfile from "../components/UserProfile";
import { getUserData } from "../services/github";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const [searchedUsername, setSearchedUsername] = useState("");

  const {
    data: userData,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["user", searchedUsername],
    queryFn: () => (searchedUsername ? getUserData(searchedUsername) : null),
    enabled: !!searchedUsername, // 사용자명이 있을 때만 쿼리 활성화
    staleTime: 600000, // 10분
  });

  const handleSearch = (username) => {
    console.log(`부모 컴포넌트에서 검색어 받음 : ${username}`);
    setSearchedUsername(username);
  };

  const lastUpdated = new Date(dataUpdatedAt).toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center py-4 rounded-lg text-header">
          Git-View
        </h1>
      </header>

      {/* 메인 콘텐츠 (헤더 높이만큼 패딩 추가) */}
      <main className="pt-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-center mb-8">GitHub 프로필 탐색기</p>

          <SearchBar onSearch={handleSearch} />

          {/* 검색 결과 표시 영역 */}
          <div className="mt-8">
            {isLoading && <p className="text-center">검색 중...</p>}

            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                <p>오류 발생: {error.message}</p>
              </div>
            )}

            {userData && (
              <UserProfile userData={userData} lastUpdated={lastUpdated} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
