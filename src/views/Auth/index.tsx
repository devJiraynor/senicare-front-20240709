import React from 'react';
import './style.css';

export default function Auth() {
    
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

                        <div className="input-box">
                            <div className="label">이름</div>
                            <div className="input-area">
                                <input id="user-name" type="text" placeholder="이름을 입력해주세요." />
                            </div>
                            <div id="user-name-message" className="message"></div>
                        </div>

                        <div className="input-box">
                            <div className="label">아이디</div>
                            <div className="input-area">
                                <input id="user-id" type="text" placeholder="아이디를 입력해주세요." />
                                <div id="user-id-button" className="input-button disable">중복 확인</div>
                            </div>
                            <div id="user-id-message" className="message"></div>
                        </div>

                        <div className="input-box">
                            <div className="label">비밀번호</div>
                            <div className="input-area">
                                <input id="user-password" type="password" placeholder="비밀번호를 입력해주세요." />
                            </div>
                            <div id="user-password-message" className="message"></div>
                        </div>

                        <div className="input-box">
                            <div className="label">비밀번호 확인</div>
                            <div className="input-area">
                                <input id="user-password-check" type="password" placeholder="비밀번호를 입력해주세요." />
                            </div>
                            <div id="user-password-check-message" className="message"></div>
                        </div>

                        <div className="input-box">
                            <div className="label">전화번호</div>
                            <div className="input-area">
                                <input id="user-telnumber" type="text" placeholder="-빼고 입력해주세요." />
                                <div id="user-telnumber-button" className="input-button disable">전화번호 인증</div>
                            </div>
                            <div id="user-telnumber-message" className="message"></div>
                        </div>

                        <div id="auth-number-box" className="input-box" style={{ display: 'none' }}>
                            <div className="label">인증번호</div>
                            <div className="input-area">
                                <input id="auth-number" type="text" placeholder="인증번호 4자리를 입력해주세요." />
                                <div id="auth-number-button" className="input-button disable">인증 확인</div>
                            </div>
                            <div id="auth-number-message" className="message"></div>
                        </div>

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
