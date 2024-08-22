import React from 'react';
import './style.css';

interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    buttonName?: string;
}

export default function InputBox({ label, type, placeholder, buttonName }: Props) {

    return (
        <div className="input-box">
            <div className="label">{label}</div>
            <div className="input-area">
                <input type={type} placeholder={placeholder} />
                {buttonName && <div className="input-button disable">{buttonName}</div>}
            </div>
            <div className="message"></div>
        </div>
    )

}
