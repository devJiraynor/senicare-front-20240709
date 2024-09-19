import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router';
import './style.css';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, CS_ABSOLUTE_PATH, CS_DETAIL_PATH, CS_PATH, HR_ABSOLUTE_PATH, HR_PATH, MM_ABSOLUTE_PATH, MM_PATH, ROOT_ABSOLUTE_PATH } from 'src/constants';

// component: 로고 컴포넌트 //
function Logo() {

    // render: 로고 컴포넌트 렌더링 //
    return (
        <div id='layout-logo'>
            <div className='box'>
                <div className='title'>시니케어</div>
                <div className='icon'></div>
            </div>
        </div>
    );

}

// component: 상단 컴포넌트 //
function Top() {

    // state: path 상태 //
    const { pathname } = useLocation();
    // state: cookie 상태 //
    const [cookies, setCookie, removeCookie] = useCookies();

    // variable: 경로 이름 //
    const path = 
        pathname.startsWith(CS_PATH) ? '고객 관리' :
        pathname.startsWith(MM_PATH) ? '용품 관리' :
        pathname.startsWith(HR_PATH) ? '인사 관리' : '';

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 로그아웃 버튼 클릭 이벤트 처리 //
    const onLogoutButtonClickHandler = () => {
        removeCookie(ACCESS_TOKEN, { path: ROOT_ABSOLUTE_PATH });
        navigator(AUTH_ABSOLUTE_PATH);
    };

    // render: 상단 컴포넌트 //
    return (
        <div id='layout-top'>
            <div className='path'>{path}</div>
            <div className='button second' onClick={onLogoutButtonClickHandler}>로그아웃</div>
        </div>
    );

}

// component: 좌측 네비게이션 컴포넌트 //
function SideNavigation() {

    // state: path 상태 //
    const { pathname } = useLocation();

    // variable: 특정 경로 여부 변수 //
    const isCs = pathname.startsWith(CS_PATH);
    const isMm = pathname.startsWith(MM_PATH);
    const isHr = pathname.startsWith(HR_PATH);

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
    const onItemClickHandler = (path: string) => {
        navigator(path);
    };

    // render: 좌측 네비게이션 컴포넌트 //
    return (
        <div id='layout-side-navigation'>
            <div className='navigation'>
                <div className={`navigation-item ${isCs ? 'active' : ''}`} onClick={() => onItemClickHandler(CS_ABSOLUTE_PATH)}>
                    <div className={`icon ${isCs ? 'cs-active-icon' : 'cs-icon'}`}></div>
                    <div className='item-text'>고객 관리</div>
                </div>
                <div className={`navigation-item ${isMm ? 'active' : ''}`} onClick={() => onItemClickHandler(MM_ABSOLUTE_PATH)}>
                    <div className={`icon ${isMm ? 'mm-active-icon' : 'mm-icon'}`}></div>
                    <div className='item-text'>용품 관리</div>
                </div>
                <div className={`navigation-item ${isHr ? 'active' : ''}`} onClick={() => onItemClickHandler(HR_ABSOLUTE_PATH)}>
                    <div className={`icon ${isHr ? 'hr-active-icon' : 'hr-icon'}`}></div>
                    <div className='item-text'>인사 관리</div>
                </div>
            </div>
        </div>
    );

}

// component: 메인 레이아웃 컴포넌트 //
export default function MainLayout() {

    // state: 쿠키 상태 //
    const [cookies] = useCookies();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // effect: 레이아웃 마운트시 로그인 여부 확인 //
    useEffect(() => {
        // if(!cookies[ACCESS_TOKEN]) navigator(AUTH_ABSOLUTE_PATH);
    }, []);

    // render: 메인 레이아웃 컴포넌트 렌더링 //
    return (
        <div id='main-layout'>
            <Logo />
            <Top />
            <SideNavigation />
            <div id='main-wrapper'>
                <Outlet />
            </div>
        </div>
    );
}
