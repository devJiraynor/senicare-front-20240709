import React from 'react';
import './style.css';

// component: 인사 정보 상세 보기 컴포넌트 //
export default function HRDetail() {

    // render: 인사 정보 상세 보기 컴포넌트 렌더링 //
    return (
        <div id='hr-detail-wrapper'>
            <div className='top'>
                <div className='info-box'>
                    <div className='label'>아이디</div>
                    <div className='text'></div>
                </div>
                <div className='info-box'>
                    <div className='label'>이름</div>
                    <div className='text'></div>
                </div>
                <div className='info-box'>
                    <div className='label'>전화번호</div>
                    <div className='text'></div>
                </div>
            </div>
            <div className='middle'>
                <div className='title'>관리 중인 고객 리스트</div>
                <div className='table'>
                    <div className='th'>
                        <div className='td-customer-number'>고객번호</div>
                        <div className='td-customer-name'>고객명</div>
                        <div className='td-customer-age'>나이</div>
                        <div className='td-customer-location'>지역</div>
                    </div>
                    <div className='tr'>
                        <div className='td-customer-number'></div>
                        <div className='td-customer-name'></div>
                        <div className='td-customer-age'></div>
                        <div className='td-customer-location'></div>
                    </div>
                </div>
                <div className='middle-bottom'></div>
            </div>
            <div className='bottom'>
                <div className='button primary'>목록</div>
                <div className='button second'>수정</div>
            </div>
        </div>
    )
}
