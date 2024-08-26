import React from 'react';
import './style.css';

interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    buttonName?: string;
}

export default function InputBox({ label, type, placeholder, value, buttonName }: Props) {

    // 이름
    // 아이디
    // 비밀번호

    return (
        <div className="input-box">
            <div className="label">{label}</div>
            <div className="input-area">
                <input value={value} type={type} placeholder={placeholder} />
                {buttonName && <div className="input-button disable">{buttonName}</div>}
            </div>
            <div className="message"></div>
        </div>
    )

}
