import React from "react";

/**
 * 애플리케이션 전체에서 사용할 수 있는 기본 버튼 컴포넌트
 * @param {string} children - 버튼 내부의 텍스트 또는 요소
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {string} className - 추가 클래스 이름 (선택사항)
 * @param {object} props - 기타 버튼 속성들
 */
const PrimaryButton = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      className={`text-xs px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
