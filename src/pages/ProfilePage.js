// ProfilePage.js
import UserProfileCard from "../components/UserProfileCard";
import RepoList from "../components/RepoList"; // 추가
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserData, getUserRepos } from "../services/github";

const ProfilePage = () => {
  const { username } = useParams();

  const { data: repodata } = useQuery({
    queryKey: ["repo", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
    staleTime: 600000,
  });

  const { data: userdata } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUserData(username),
    enabled: !!username,
    staleTime: 600000,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <span className="font-bold">← back</span>
          </Link>
          <h1 className="text-2xl font-bold text-center text-header">
            Git-View
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="pt-20 px-4">
        <UserProfileCard userdata={userdata} repodata={repodata} />

        {/* RepoList 컴포넌트 추가 */}
        {repodata && username && (
          <div className="mt-6">
            <RepoList username={username} repodata={repodata} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
