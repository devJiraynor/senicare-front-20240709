import React, { ChangeEvent, useState } from 'react';
import './style.css';
import InputBox from 'src/components/InputBox';

export default function Auth() {

    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');

    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    };

    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);
    };

    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTelNumber(value);
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
    };

    const onIdCheckClickHandler = () => {
        if (!id) return;
        alert('중복 확인 버튼 클릭!');
    };

    const onTelNumberSendClickHandler = () => {
        if (!telNumber) return;
        alert('인증번호 전송!');
    };

    const onAuthNumberCheckClickHandler = () => {
        if (!authNumber) return;
        alert('인증번호 확인!');
    };
    
    return (
        <div id="auth-wrapper">
            <div className="auth-image"></div>
            <div className="auth-container">
                <div style={{ gap: '16px' }} className="auth-box">
                    <div className="title-box">
                        <div className="title">시니케어</div>
                        <div className="logo"></div>
                    </div>
                    <div className="sns-container">
                        <div className="title">SNS 회원가입</div>
                        <div className="sns-button-container">
                            <div className="sns-button md kakao"></div>
                            <div className="sns-button md naver"></div>
                        </div>
                    </div>
                    <div style={{ width: '64px' }} className="divider"></div>

                    <div className="input-container">
                        <InputBox value={name} label='이름' type='text' placeholder='이름을 입력해주세요.' onChange={onNameChangeHandler} />
                        <InputBox value={id} label='아이디' type='text' placeholder='아이디를 입력해주세요.' buttonName='중복 확인' onChange={onIdChangeHandler} onButtonClick={onIdCheckClickHandler} />
                        <InputBox value={password} label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요.' onChange={onPasswordChangeHandler} />
                        <InputBox value={passwordCheck} label='비밀번호 확인' type='password' placeholder='비밀번호를 입력해주세요.' onChange={onPasswordCheckChangeHandler} />
                        <InputBox value={telNumber} label='전화번호' type='text' placeholder='-빼고 입력해주세요.' buttonName='전화번호 인증' onChange={onTelNumberChangeHandler} onButtonClick={onTelNumberSendClickHandler} />
                        <InputBox value={authNumber} label='인증번호' type='text' placeholder='인증번호 4자리를 입력해주세요.' buttonName='인증 확인' onChange={onAuthNumberChangeHandler} onButtonClick={onAuthNumberCheckClickHandler} />
                    </div>

                    <div className="button-container">
                        <div id="sign-up-button" className="button disable full-width">회원가입</div>
                        <div className="link">로그인</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
