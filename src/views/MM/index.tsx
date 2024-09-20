import React from 'react'
import './style.css';

// component: 용품 등록 컴포넌트 //
function PostBox() {

    // render: 용품 등록 컴포넌트 렌더링 //
    return (
        <div className='post-patch-box'>
            <div className='post-patch-input-container'>
                <div className='input-box'>
                    
                </div>
                <div></div>
                <div></div>
            </div>
            <div className='button primary'>등록</div>
            <div className='button disable'>취소</div>
        </div>
    )

}

// component: 용품 수정 컴포넌트 //
function PatchBox() {

    // render: 용품 수정 컴포넌트 렌더링 //
    return (
        <div className='post-patch-box'></div>
    )

}

// component: 용품 관리 리스트 컴포넌트 //
export default function MM() {

    // render: 용품 관리 리스트 컴포넌트 렌더링 //
    return (
        <div id='mm-wrapper'>
            <PostBox />
            <PatchBox />
            <div className='top'></div>
            <div className='main'></div>
            <div className='bottom'></div>
        </div>
    )
}
