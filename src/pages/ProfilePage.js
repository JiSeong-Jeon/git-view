import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserData, getUserRepos } from "../services/github";
import PrimaryButton from "../components/PrimaryButton";
import { ReactComponent as BlogSvg } from "../assets/svg/blog.svg";
import { ReactComponent as MailSvg } from "../assets/svg/mail.svg";
import { ReactComponent as TwitterSvg } from "../assets/svg/Twitter.svg";

const ProfilePage = () => {
  const { username } = useParams();

  const [userLanguage, setUserLanguage] = useState([]);

  const { data: repodata } = useQuery({
    queryKey: ["repo", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
    staleTime: 600000, // 10분
  });

  const { data: userdata } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserData(username),
    enabled: !!username,
    staleTime: 600000, // 10분
  });

  useEffect(() => {
    if (repodata && repodata.length > 0) {
      // 모든 저장소에서 언어 추출
      const languages = repodata.map((repo) => repo.language).filter(Boolean); // null, undefined 제거

      // 중복 제거
      const uniqueLanguages = [...new Set(languages)];

      setUserLanguage(uniqueLanguages);
    }
  }, [repodata]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <span className="font-bold">← 홈으로</span>
          </Link>
          <h1 className="text-2xl font-bold text-center text-header">
            Git-View
          </h1>
          <div className="w-20"></div> {/* 오른쪽 여백용 */}
        </div>
      </header>
      <main className="pt-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* 유저 상세화면 */}
          <div className="bg-white rounded-lg shadow-md w-full max-w-3xl flex overflow-hidden">
            {/* 왼쪽 사이드바 */}
            <div className="w-48 bg-gray-50 p-6 flex flex-col items-center border-r">
              <div className="w-30 h-30 rounded-full overflow-hidden bg-gray-200 mb-4">
                <img
                  src={userdata.avatar_url}
                  alt={`${userdata.login} 프로필 이미지`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-sm font-medium text-gray-800">
                {userdata.name}
              </h2>
              <p className="text-xs text-gray-400 mb-1">{userdata.login}</p>
              <PrimaryButton className="text-text-white px-3 py-2 text-xs">
                Send Email
              </PrimaryButton>
              <div className="flex justify-center mt-6 space-x-3">
                <button className="text-gray-400 hover:text-gray-600">
                  <MailSvg width="20" height="20" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <TwitterSvg width="20" height="20" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <BlogSvg width="20" height="20" />
                </button>
              </div>
            </div>
            {/* 오른쪽 메인 콘텐츠 */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-medium text-gray-400">
                  Official Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-800">
                    {userdata.email == null ? "-" : userdata.email}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Git link
                  </label>
                  <a
                    href={userdata.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:underline truncate"
                  >
                    {userdata.html_url}
                  </a>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-4">
                  Personal Information
                </h3>

                <div className="grid grid-cols-3 gap-6 mb-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Repository
                    </label>
                    <p className="text-sm text-gray-800">
                      {userdata.public_repos}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Followers
                    </label>
                    <p className="text-sm text-gray-800">
                      {userdata.followers}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Following
                    </label>
                    <p className="text-sm text-gray-800">
                      {userdata.following}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4">
                  languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userLanguage.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                    >
                      <span className="text-xs text-gray-600 mr-1">{tag}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
