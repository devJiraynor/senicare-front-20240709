import { useEffect } from 'react';
import './Senicare.css';
import Auth from 'src/views/Auth';
import { Route, Routes, useNavigate } from 'react-router';
import MainLayout from './layouts/MainLayout';
import { useCookies } from 'react-cookie';

// component: root path 컴포넌트 //
function Index() {

    // state: 쿠키 상태 //
    const [cookies] = useCookies();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // effect: 마운트 시 경로 이동 effect //
    useEffect(() => {
        if (cookies.accessToken) navigator('/cs');
        else navigator('/auth');
    }, []);

    // render: root path 컴포넌트 렌더링 //
    return (
        <></>
    );
}

// component: Senicare 컴포넌트 //
export default function Senicare() {

    // render: Senicare 컴포넌트 렌더링 //
    return (
        <Routes>
            <Route index element={<Index />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/cs' element={<MainLayout />}>
                <Route index element={<>고객 리스트 보기</>} />
                <Route path='write' element={<>고객 등록</>} />
                <Route path=':customNumber' element={<>고객 정보 보기</>} />
                <Route path=':customNumber/update' element={<>고객 정보 수정</>} />
            </Route>
            <Route path='/mm' element={<MainLayout />}>
                <Route index element={<></>} />
            </Route>
            <Route path='/hr' element={<MainLayout />}>
                <Route index element={<></>} />
                <Route path=':userId' element={<></>} />
                <Route path=':userId/update' element={<></>} />
            </Route>
            <Route path='*' element={<Index />} />
        </Routes>
    );
}
