import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import InputBox from 'src/components/InputBox';

type AuthPath = '회원가입' | '로그인';

interface SnsContainerProps {
    type: AuthPath;
}

function SnsContainer ({ type }: SnsContainerProps) {

    return (
        <div className="sns-container">
            <div className="title">SNS {type}</div>
            <div className="sns-button-container">
                <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}kakao`}></div>
                <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}naver`}></div>
            </div>
        </div>
    );

}

interface AuthComponentProps {
    onPathChange: (path: AuthPath) => void;
}

function SignUp({ onPathChange }: AuthComponentProps) {

    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');

    const [nameMessage, setNameMessage] = useState<string>('');
    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

    const [nameMessageError, setNameMessageError] = useState<boolean>(false);
    const [idMessageError, setIdMessageError] = useState<boolean>(false);
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);

    const [isCheckedId ,setCheckedId] = useState<boolean>(false);
    const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
    const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
    const [isSend, setSend] = useState<boolean>(false);
    const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

    const isComplete = name && id && isCheckedId && password && passwordCheck && isMatchedPassword && isCheckedPassword
        && telNumber && isSend && authNumber && isCheckedAuthNumber;

    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
        setCheckedId(false);
        setIdMessage('');
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        const isMatched = pattern.test(value);

        const message = (isMatched || !value) ? '' : '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요';
        setPasswordMessage(message);
        setPasswordMessageError(!isMatched);
        setMatchedPassword(isMatched);
    };

    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);
    };

    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTelNumber(value);
        setSend(false);
        setTelNumberMessage('');
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setCheckedAuthNumber(false);
        setAuthNumberMessage('');
    };

    const onIdCheckClickHandler = () => {
        if (!id) return;

        const isDuplicated = id === 'qwer1234';
        const message = isDuplicated ? '이미 사용중인 아이디입니다.' : '사용 가능한 아이디입니다.';
        setIdMessage(message);
        setIdMessageError(isDuplicated);
        setCheckedId(!isDuplicated);
    };

    const onTelNumberSendClickHandler = () => {
        if (!telNumber) return;

        const pattern = /^[0-9]{11}$/;
        const isMatched = pattern.test(telNumber);

        if (!isMatched) {
            setTelNumberMessage('숫자 11자 입력해주세요.');
            setTelNumberMessageError(true);
            return;
        }

        setTelNumberMessage('인증번호가 전송되었습니다.');
        setTelNumberMessageError(false);
        setSend(true);
    };

    const onAuthNumberCheckClickHandler = () => {
        if (!authNumber) return;

        const isMatched = authNumber === 'Q1W2';
        const message = isMatched ? '인증번호가 확인되었습니다.' : '인증번호가 일치하지 않습니다.';
        setAuthNumberMessage(message);
        setAuthNumberMessageError(!isMatched);
        setCheckedAuthNumber(isMatched);
    };

    const onSignUpButtonHandler = () => {
        if (!isComplete) return;

        onPathChange('로그인');
    };

    useEffect(() => {
        if (!password || !passwordCheck) return;

        const isEqual = password === passwordCheck;
        const message = isEqual ? '' : '비밀번호가 일치하지 않습니다.';
        setPasswordCheckMessage(message);
        setPasswordCheckMessageError(!isEqual);
        setCheckedPassword(isEqual);
    }, [password, passwordCheck]);
    
    return (
        <div style={{ gap: '16px' }} className="auth-box">
            <div className="title-box">
                <div className="title">시니케어</div>
                <div className="logo"></div>
            </div>
            <SnsContainer type='회원가입' />
            <div style={{ width: '64px' }} className="divider"></div>

            <div className="input-container">
                <InputBox messageError={nameMessageError} message={nameMessage} value={name} label='이름' type='text' placeholder='이름을 입력해주세요.' onChange={onNameChangeHandler} />
                <InputBox messageError={idMessageError} message={idMessage} value={id} label='아이디' type='text' placeholder='아이디를 입력해주세요.' buttonName='중복 확인' onChange={onIdChangeHandler} onButtonClick={onIdCheckClickHandler} />
                <InputBox messageError={passwordMessageError} message={passwordMessage} value={password} label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요.' onChange={onPasswordChangeHandler} />
                <InputBox messageError={passwordCheckMessageError} message={passwordCheckMessage} value={passwordCheck} label='비밀번호 확인' type='password' placeholder='비밀번호를 입력해주세요.' onChange={onPasswordCheckChangeHandler} />
                <InputBox messageError={telNumberMessageError} message={telNumberMessage} value={telNumber} label='전화번호' type='text' placeholder='-빼고 입력해주세요.' buttonName='전화번호 인증' onChange={onTelNumberChangeHandler} onButtonClick={onTelNumberSendClickHandler} />
                {isSend &&
                <InputBox messageError={authNumberMessageError} message={authNumberMessage} value={authNumber} label='인증번호' type='text' placeholder='인증번호 4자리를 입력해주세요.' buttonName='인증 확인' onChange={onAuthNumberChangeHandler} onButtonClick={onAuthNumberCheckClickHandler} />
                }
            </div>

            <div className="button-container">
                <div className={`button ${isComplete ? 'primary' : 'disable'} full-width`} onClick={onSignUpButtonHandler}>회원가입</div>
                <div className="link" onClick={() => onPathChange('로그인')}>로그인</div>
            </div>
        </div>
    )
}

function SignIn({ onPathChange }: AuthComponentProps) {

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string>('');

    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    };

    const onSignInButtonHandler = () => {
        if (!id || !password) return;

        if (id !== 'qwer1234' || password !== 'asdf0987') {
            setMessage('로그인 정보가 일치하지 않습니다.');
            return;
        }

        alert('로그인 성공!');
    };

    useEffect(() => {
        setMessage('');
    }, [id, password]);

    return (
        <div className="auth-box">
            <div className="title-box">
                <div className="title">시니케어</div>
                <div className="logo"></div>
            </div>
            <div className="input-container">
                <InputBox value={id} onChange={onIdChangeHandler} message='' messageError type='text' label='아이디' placeholder='아이디를 입력해주세요.' />
                <InputBox value={password} onChange={onPasswordChangeHandler} message={message} messageError type='password' label='비밀번호' placeholder='비밀번호를 입력해주세요.' />
            </div>
            <div className="button-container">
                <div className="button primary full-width" onClick={onSignInButtonHandler}>로그인</div>
                <div className="link" onClick={() => onPathChange('회원가입')}>회원가입</div>
            </div>
            <div style={{ width: '64px' }} className="divider"></div>
            <SnsContainer type='로그인' />
        </div>
    );

}

export default function Auth() {

    const [path, setPath] = useState<AuthPath>('로그인');

    const onPathChangeHandler = (path: AuthPath) => {
        setPath(path);
    };

    return (
        <div id="auth-wrapper">
            <div className="auth-image"></div>
            <div className="auth-container">
                {path === '로그인' ? 
                <SignIn onPathChange={onPathChangeHandler} /> :
                <SignUp onPathChange={onPathChangeHandler} />
                }
            </div>
        </div>
        
    );

}