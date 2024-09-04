import React from 'react'
import { Outlet } from 'react-router'

// component: 메인 레이아웃 컴포넌트 //
export default function MainLayout() {

    // render: 메인 레이아웃 컴포넌트 렌더링 //
    return (
        <div>
            <div>로고</div>
            <div>상단</div>
            <div>좌측 네비게이션</div>
            <Outlet />
        </div>
    )
}
