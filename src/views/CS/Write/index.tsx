import React, { ChangeEvent, useRef, useState } from 'react';
import './style.css';

// variable: 기본 프로필 이미지 URL //
const defaultProfileImageUrl = 'https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png';

// component: 고객 정보 작성 화면 컴포넌트 //
export default function CSWrite() {

    // state: 이미지 입력 참조 //
    const imageInputRef = useRef<HTMLInputElement|null>(null);

    // state: 프로필 미리보기 URL 상태 //
    const [previewUrl, setPreviewUrl] = useState<string>(defaultProfileImageUrl);

    // state: 고객 정보 상태 //
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [charger, setCharger] = useState<string>('');
    const [chargerName, setChargerName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    // event handler: 프로필 이미지 클릭 이벤트 처리 //
    const onProfileImageClickHandler = () => {
        const { current } = imageInputRef;
        if (!current) return;
        current.click();
    };

    // event handler: 이미지 변경 이벤트 처리 함수 //
    const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || !files.length) return;

        const file = files[0];
        setProfileImageFile(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setPreviewUrl(fileReader.result as string);
        };
    };

    // event handler: 이름 변경 이벤트 처리 함수 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    // event handler: 생년월일 변경 이벤트 처리 함수 //
    const onBirthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const regexp = /^\d{0,6}$/;
        const isMatched = regexp.test(value);
        if (!isMatched) return;
        setBirth(value);
    };

    // render: 고객 정보 작성 화면 컴포넌트 렌더링 //
    return (
        <div id='cs-write-wrapper'>
            <div className='main'>
                <div className='profile-image' style={{ backgroundImage: `url(${previewUrl})` }} onClick={onProfileImageClickHandler}>
                    <input ref={imageInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={onImageInputChangeHandler} />
                </div>
                <div className='input-container'>
                    <div className='input-box'>
                        <div className='input-label'>고객 이름</div>
                        <input className='input' value={name} placeholder='고객 이름을 입력하세요.' onChange={onNameChangeHandler} />
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>생년월일</div>
                        <input className='input' value={birth} placeholder='6자리 생년월일을 입력하세요.' onChange={onBirthChangeHandler} />
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>담당자</div>
                        <input className='input' readOnly placeholder='담당자를 선택하세요.' />
                        <div className='button-box'>
                            <div className='button second'>자신</div>
                            <div className='button disable'>검색</div>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>주소</div>
                        <input className='input' readOnly placeholder='주소를 선택하세요.' />
                        <div className='button-box'>
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
