import React, { ChangeEvent, useState } from 'react'
import './style.css';

// interface: 용품 등록 컴포넌트 Properties //
interface PostBoxProps {
    unShow: () => void;
}

// component: 용품 등록 컴포넌트 //
function PostBox({ unShow }: PostBoxProps) {

    // state: 용품 인풋 상태 //
    const [name, setName] = useState<string>('');
    const [purpose, setPurpose] = useState<string>('');
    const [count, setCount] = useState<string>('');

    // event handler: 용품 이름 변경 이벤트 처리 함수 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    // render: 용품 등록 컴포넌트 렌더링 //
    return (
        <div className='post-patch-box'>
            <div className='post-patch-input-container'>
                <div className='input-box'>
                    <div className='input-label'>용품명</div>
                    <input className='input' value={name} placeholder='용품명을 입력해주세요' onChange={onNameChangeHandler} />
                </div>
                <div className='input-box' style={{ flex: 1 }}>
                    <div className='input-label'>용도</div>
                    <input className='input' placeholder='용도를 입력해주세요' />
                </div>
                <div className='input-box'>
                    <div className='input-label'>개수</div>
                    <input className='input' placeholder='개수를 입력해주세요' />
                </div>
            </div>
            <div className='button primary'>등록</div>
            <div className='button disable' onClick={unShow}>취소</div>
        </div>
    )

}

// component: 용품 수정 컴포넌트 //
function PatchBox() {

    // render: 용품 수정 컴포넌트 렌더링 //
    return (
        <div className='post-patch-box'>
            <div className='post-patch-input-container'>
                <div className='input-box'>
                    <div className='input-label'>용품명</div>
                    <input className='input' placeholder='용품명을 입력해주세요' />
                </div>
                <div className='input-box' style={{ flex: 1 }}>
                    <div className='input-label'>용도</div>
                    <input className='input' placeholder='용도를 입력해주세요' />
                </div>
                <div className='input-box'>
                    <div className='input-label'>개수</div>
                    <input className='input' placeholder='개수를 입력해주세요' />
                </div>
            </div>
            <div className='button second'>수정</div>
            <div className='button disable'>취소</div>
        </div>
    )

}

// component: 용품 관리 리스트 컴포넌트 //
export default function MM() {

    // state: 등록 및 수정 박스 뷰 상태 //
    const [showPostBox, setShowPostBox] = useState<boolean>(false);
    const [showPatchBox, setShowPatchBox] = useState<boolean>(false);

    // function: 등록 박스 뷰 상태 변경 함수 //
    const unShowPostBox = () => setShowPostBox(false);

    // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
    const onPostButtonClickHandler = () => {
        setShowPostBox(true);
        setShowPatchBox(false);
    }

    // render: 용품 관리 리스트 컴포넌트 렌더링 //
    return (
        <div id='mm-wrapper'>
            {showPostBox && <PostBox unShow={unShowPostBox} />}
            {showPatchBox && <PatchBox />}
            <div className='top'>
                <div className='top-text'>전체 <span className='emphasis'>150건</span> | 페이지 <span className='emphasis'>1/100</span></div>
                {!showPostBox && !showPatchBox && <div className='button primary' onClick={onPostButtonClickHandler}>등록</div>}
            </div>
            <div className='main'></div>
            <div className='bottom'></div>
        </div>
    )
}
