import React from 'react';
import './style.css';

// component: 고객 정보 작성 화면 컴포넌트 //
export default function CSWrite() {

    // render: 고객 정보 작성 화면 컴포넌트 렌더링 //
    return (
        <div id='cs-write-wrapper'>
            <div className='main'>
                <div className='profile-image'></div>
                <div className='input-container'>
                    <div className='input-box'>
                        <div className='input-label'>담당자</div>
                        <input className='input' placeholder='담당자를 선택하세요.' />
                        <div className='button-box'>
                            <div className='button second'>자신</div>
                            <div className='button disable'>검색</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <div className='button primary'>목록</div>
                <div className='button second'>등록</div>
            </div>
        </div>
    )
}
