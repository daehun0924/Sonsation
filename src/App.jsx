import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IntroScreen from './components/IntroScreen';
import Sidebar from './components/Sidebar';
import VideoModeSwitcher from './components/VideoModeSwitcher';
import QuizPage from './components/Quiz';
import Category from './components/Category';
import SearchResult from './components/SearchResult';

import './App.css';

// ✅ useLocation은 BrowserRouter 안쪽 컴포넌트에서 사용
function AppContent() {
    const [showIntro, setShowIntro] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // ✅ location이 "/"일 때 intro 다시 켜기
    useEffect(() => {
        if (location.pathname === '/') {
            setShowIntro(true);
        } else {
            setShowIntro(false);
        }
    }, [location.pathname]);

    if (showIntro && location.pathname === '/') {
        return <IntroScreen onEnter={() => setShowIntro(false)} />;
    }

    return (
        <div className="app-wrapper">
            {/* ⬆️ 네비게이션 */}
            <div className="main-navbar">
                <div className="navbar-content">
                    <div className="navbar-left">
                        <span className="hamburger-icon" onClick={() => setSidebarOpen(true)}>
                            ☰
                        </span>
                    </div>
                    <div className="site-logo">
                        Son<span className="quote">'</span>sation
                    </div>
                    <div className="navbar-right" />
                </div>
            </div>

            {/* ⬅️ 사이드바 */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* 🏠 페이지 내용 */}
            <main className="page-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/video" element={<VideoModeSwitcher />} />
                    <Route path="/video/:id" element={<VideoModeSwitcher />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/search" element={<SearchResult />} />
                </Routes>
            </main>

            {/* ⬇️ 푸터 */}
            <footer className="footer-info">
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>© 2025 Sonsation Team</p>
            </footer>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent /> {/* ✅ 여기서 useLocation 접근 가능 */}
        </BrowserRouter>
    );
}
