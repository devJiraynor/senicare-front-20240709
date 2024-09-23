import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { PostToolRequestDto } from 'src/apis/dto/request/tool';
import { getToolListRequest, postToolRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { Tool } from 'src/types';
import { GetToolListResponseDto } from 'src/apis/dto/response/tool';

// interface: 용품 등록 컴포넌트 Properties //
interface PostBoxProps {
    unShow: () => void;
}

// component: 용품 등록 컴포넌트 //
function PostBox({ unShow }: PostBoxProps) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 용품 인풋 상태 //
    const [name, setName] = useState<string>('');
    const [purpose, setPurpose] = useState<string>('');
    const [count, setCount] = useState<string>('');

    // function: post tool response 처리 함수 //
    const postToolResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '모두 입력해주세요.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        unShow();
    };

    // event handler: 용품 이름 변경 이벤트 처리 함수 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    // event handler: 용도 변경 이벤트 처리 함수 //
    const onPurposeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPurpose(value);
    };

    // event handler: 개수 변경 이벤트 처리 함수 //
    const onCountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const regexp = /^[0-9]*$/;
        const isNumber = regexp.test(value);
        if (!isNumber) return;
        setCount(value);
    };

    // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
    const onPostButtonClickHandler = () => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;

        if (!name || !purpose || !count) {
            alert('모두 입력해주세요.');
            return;
        }
        const requestBody: PostToolRequestDto = {
            name, purpose, count: Number(count)
        };

        postToolRequest(requestBody, accessToken).then(postToolResponse);
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
                    <input className='input' value={purpose} placeholder='용도를 입력해주세요' onChange={onPurposeChangeHandler} />
                </div>
                <div className='input-box'>
                    <div className='input-label'>개수</div>
                    <input className='input' value={count} placeholder='개수를 입력해주세요' onChange={onCountChangeHandler} />
                </div>
            </div>
            <div className='button primary' onClick={onPostButtonClickHandler}>등록</div>
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

// component: 용품 리스트 아이템 컴포넌트 //
function TableRow() {

    // render: 용품 리스트 아이템 컴포넌트 렌더링 //
    return (
        <div className='tr'>
            <div className='td-tool-number'>용품번호</div>
            <div className='td-name'>용품명</div>
            <div className='td-purpose'>용도</div>
            <div className='td-count'>개수</div>
            <div className='td-buttons'>
                <div className='td-edit'>
                    <div className='icon-button edit'></div>
                </div>
                <div className='td-delete'>
                    <div className='icon-button trash'></div>
                </div>
            </div>
        </div>
    )

}

// component: 용품 관리 리스트 컴포넌트 //
export default function MM() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 등록 및 수정 박스 뷰 상태 //
    const [showPostBox, setShowPostBox] = useState<boolean>(false);
    const [showPatchBox, setShowPatchBox] = useState<boolean>(false);

    // state: 용품 리스트 상태 //
    const [toolList, setToolList] = useState<Tool[]>([]);

    // function: get tool list response 처리 함수 //
    const getToolListResponse = (resposenBody: GetToolListResponseDto | ResponseDto | null) => {
        const message = 
            !resposenBody ? '서버에 문제가 있습니다.' :
            resposenBody.code === 'AF' ? '잘못된 접근입니다.' :
            resposenBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = resposenBody !== null && resposenBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { tools } = resposenBody as GetToolListResponseDto;
        setToolList(tools);
    };

    // function: 등록 박스 뷰 상태 변경 함수 //
    const unShowPostBox = () => setShowPostBox(false);

    // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
    const onPostButtonClickHandler = () => {
        setShowPostBox(true);
        setShowPatchBox(false);
    };

    // effect: 컴포넌트 로드시 용품 리스트 불러오기 함수 //
    useEffect(() => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;
        getToolListRequest(accessToken).then(getToolListResponse);
    }, []);

    // render: 용품 관리 리스트 컴포넌트 렌더링 //
    return (
        <div id='mm-wrapper'>
            {showPostBox && <PostBox unShow={unShowPostBox} />}
            {showPatchBox && <PatchBox />}
            <div className='top'>
                <div className='top-text'>전체 <span className='emphasis'>150건</span> | 페이지 <span className='emphasis'>1/100</span></div>
                {!showPostBox && !showPatchBox && <div className='button primary' onClick={onPostButtonClickHandler}>등록</div>}
            </div>
            <div className='main'>
                <div className='table'>
                    <div className='th'>
                        <div className='td-tool-number'>용품번호</div>
                        <div className='td-name'>용품명</div>
                        <div className='td-purpose'>용도</div>
                        <div className='td-count'>개수</div>
                        <div className='td-buttons'>
                            <div className='td-edit'>수정</div>
                            <div className='td-delete'>삭제</div>
                        </div>
                    </div>
                    {toolList.map((tool, index) => <TableRow key={index} />)}
                </div>
            </div>
            <div className='bottom'>
                <div className='pagination-box'>
                    <div className='round-left-button'></div>
                    <div className='page-list'>
                        <div className='page active'>1</div>
                        <div className='page'>2</div>
                    </div>
                    <div className='round-right-button'></div>
                </div>
                <div className='search-box'>
                    <input className='search-input' placeholder='검색어를 입력하세요.' />
                    <div className='button disable'>검색</div>
                </div>
            </div>
        </div>
    )
}
