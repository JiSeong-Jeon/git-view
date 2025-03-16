import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />{" "}
        {/* 새 라우트 추가 */}
        {/* 다른 라우트들... */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
