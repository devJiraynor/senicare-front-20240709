import React, { ChangeEvent } from 'react';
import './style.css';

interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    buttonName?: string;

    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
}

export default function InputBox({ 
    label, 
    type, 
    placeholder, 
    value, 
    buttonName, 
    onChange,
    onButtonClick,
}: Props) {

    return (
        <div className="input-box">
            <div className="label">{label}</div>
            <div className="input-area">
                <input value={value} type={type} placeholder={placeholder} onChange={onChange} />
                {buttonName && <div className={`input-button ${value ? 'active' : 'disable'}`} onClick={onButtonClick}>{buttonName}</div>}
            </div>
            <div className="message"></div>
        </div>
    )

}
