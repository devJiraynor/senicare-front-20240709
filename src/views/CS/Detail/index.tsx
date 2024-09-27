import React, { useState } from 'react';
import './style.css';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';

// component: 고객 정보 상세 보기 컴포넌트 //
export default function CSDetail() {

    // state: 고객 번호 경로 변수 상태 //
    const { customerNumber } = useParams();

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 고객 정보 상태 //
    const [profileImage, setProfileImage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [charger, setCharger] = useState<string>('');
    const [chargerName, setChargerName] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    // render: 고객 정보 상세 보기 컴포넌트 렌더링 //
    return (
        <div id="cs-detail-wrapper">
            <div className='top'>
                <div className='profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div>
                <div className='info-box'>
                    <div className='info-item'>
                        <div className='info-label'>고객 이름</div>
                        <div className='info-text'>{name}</div>
                    </div>
                    <div className='info-item'>
                        <div className='info-label'>생년월일</div>
                        <div className='info-text'>{birth}</div>
                    </div>
                    <div className='info-item'>
                        <div className='info-label'>담당자</div>
                        <div className='info-text'>{chargerName}</div>
                    </div>
                    <div className='info-item'>
                        <div className='info-label'>주소</div>
                        <div className='info-text'>{address}</div>
                    </div>
                </div>
            </div>
            <div className='middle'>

            </div>
            <div className='bottom'>

            </div>
        </div>
    )
}
