import React from 'react'
import { Outlet } from 'react-router';
import './style.css';

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

    // render: 상단 컴포넌트 //
    return (
        <div id='layout-top'>
            <div className='path'>고객 관리</div>
            <div className='button second'>로그아웃</div>
        </div>
    );

}

// component: 좌측 네비게이션 컴포넌트 //
function SideNavigation() {

    // render: 좌측 네비게이션 컴포넌트 //
    return (
        <div id='layout-side-navigation'></div>
    );

}

// component: 메인 레이아웃 컴포넌트 //
export default function MainLayout() {

    // render: 메인 레이아웃 컴포넌트 렌더링 //
    return (
        <div id='main-layout'>
            <Logo />
            <Top />
            <SideNavigation />
            <Outlet />
        </div>
    );
}
