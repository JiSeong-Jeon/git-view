import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

const UserProfile = ({ userData, lastUpdated }) => {
  const navigate = useNavigate();
  const handleViewAllClick = () => {
    // View All 버튼 클릭 시 실행할 로직
    console.log("View All 버튼이 클릭되었습니다");
    navigate(`/profile/${userData.login}`);
  };

  if (!userData) return null;
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-start justify-between">
      <div className="flex items-center">
        <img
          src={userData.avatar_url}
          alt={`${userData.login} 프로필 이미지`}
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h2 className="text-xl font-bold flex items-end gap-2">
            {userData.name || userData.login}
          </h2>
          <p className="text-gray-600">@{userData.login}</p>
          {userData.bio && <p className="mt-2">{userData.bio}</p>}
          <div className="mt-3 flex space-x-4">
            <span>저장소: {userData.public_repos}</span>
            <span>팔로워: {userData.followers}</span>
            <span>팔로잉: {userData.following}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-start mr-2">
        <span className="text-gray-500 text-xs mt-1">
          last updated : {lastUpdated}
        </span>
        <PrimaryButton onClick={handleViewAllClick}>View All</PrimaryButton>
      </div>
    </div>
  );
};

export default UserProfile;
