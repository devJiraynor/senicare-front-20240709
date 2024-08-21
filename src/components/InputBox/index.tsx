import React from 'react';
import './style.css';

interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    buttonName?: string;
}

export default function InputBox() {
    return (
        <div className="input-box">
            <div className="label">인증번호</div>
            <div className="input-area">
                <input type="text" placeholder="인증번호 4자리를 입력해주세요." />
                <div className="input-button disable">인증 확인</div>
            </div>
            <div className="message"></div>
        </div>
    )
}
