import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Abdominals from './components/Abdominals'; // 定义为腹肌的详细页面
import Obliques from './components/Obliques'; // 定义为腹外斜肌的详细页面

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="Abdominals" element={<Abdominals />} />
                    <Route path="Obliques" element={<Obliques />} />
                    {/* 其他页面 */}
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
