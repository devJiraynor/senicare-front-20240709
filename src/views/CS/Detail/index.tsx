import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, CS_ABSOLUTE_PATH, CS_UPDATE_ABSOLUTE_PATH } from 'src/constants';
import { deleteCustomerRequest, getCareRecordListRequest, getCustomerRequest, getToolListRequest } from 'src/apis';
import { GetCareRecordResponseDto, GetCustomerResponseDto } from 'src/apis/dto/response/customer';
import { ResponseDto } from 'src/apis/dto/response';
import { useSignInUserStore } from 'src/stores';
import { usePagination } from 'src/hooks';
import { CareRecord, Tool } from 'src/types';
import { GetToolListResponseDto } from 'src/apis/dto/response/tool';

// component: 고객 정보 상세 보기 컴포넌트 //
export default function CSDetail() {

    // state: 고객 번호 경로 변수 상태 //
    const { customerNumber } = useParams();

    // state: 로그인 사용자 상태 //
    const { signInUser } = useSignInUserStore();

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 고객 정보 상태 //
    const [profileImage, setProfileImage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [charger, setCharger] = useState<string>('');
    const [chargerName, setChargerName] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    // state: 페이징 관련 상태 //
    const {
        currentPage, totalPage, totalCount, viewList,
        setTotalList, initViewList, ...paginationProps
    } = usePagination<CareRecord>();

    // state: 용품 선택 셀렉터 오픈 여부 상태 //
    const [showSelector, setShowSelector] = useState<boolean>(false);

    // state: 선택한 용품 상태 //
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    // state: 관리 기록 내용 상태 //
    const [recordContents, setRecordContents] = useState<string>('');
    // state: 사용 용품 개수 상태 //
    const [usedToolCount, setUsedToolCount] = useState<string>('');

    // state: 사용 가능한 용품 리스트 상태 //
    const [toolList, setToolList] = useState<Tool[]>([]);

    // variable: 담당자 여부 //
    const isCharger = charger === signInUser?.userId;

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: get customer response 처리 함수 //
    const getCustomerResponse = (responseBody: GetCustomerResponseDto | ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '잘못된 접근입니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NC' ? '존재하지 않는 고객입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            navigator(CS_ABSOLUTE_PATH);
            return;
        }

        const { profileImage, name, birth, chargerId, chargerName, address } = responseBody as GetCustomerResponseDto;
        setProfileImage(profileImage);
        setName(name);
        setBirth(birth);
        setCharger(chargerId);
        setChargerName(chargerName);
        setAddress(address);
    };

    // function: get care record list response 처리 함수 //
    const getCareRecordListResponse = (responseBody: GetCareRecordResponseDto | ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '잘못된 접근입니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { careRecords } = responseBody as GetCareRecordResponseDto;
        setTotalList(careRecords);
    };

    // function: get tool list response 처리 함수 //
    const getToolListResponse = (responseBody: GetToolListResponseDto | ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { tools } = responseBody as GetToolListResponseDto;
        const toolList = tools.filter(tool => tool.count > 0);
        setToolList(toolList);
    };

    // function: delete customer response 처리 함수 //
    const deleteCustomerResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' : 
            responseBody.code === 'VF' ? '잘못된 접근입니다.' : 
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NC' ? '존재하지 않는 고객입니다.' :
            responseBody.code === 'NP' ? '권한이 없습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        navigator(CS_ABSOLUTE_PATH);
    };

    // event handler: 관리 기록 내용 변경 이벤트 처리 //
    const onRecordContentsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecordContents(value);
    };

    // event handler: 사용 용품 개수 변경 이벤트 처리 //
    const onUsedToolCountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!selectedTool) return;

        const { value } = event.target;
        const regexp = /^\d*$/;
        const isMatched = regexp.test(value);
        if (!isMatched) return;
        setUsedToolCount(value);
    };

    // event handler: 셀렉터 오픈 이벤트 처리 //
    const onSelectorClickHandler = () => {
        setShowSelector(!showSelector);
    };

    // event handler: 용품 선택 이벤트 처리 //
    const onToolSelectHandler = (tool: Tool | null) => {
        setSelectedTool(tool);
        if (!tool) setUsedToolCount('');
        setShowSelector(false);
    };

    // event handler: 관리 기록 버튼 클릭 이벤트 처리 //
    const onRecordButtonClickHandler = () => {
        if (!recordContents) {
            alert('내용을 입력하세요.');
            return;
        }

        if (selectedTool && !usedToolCount) {
            alert('개수를 입력하세요.');
            return;
        }

        
    };

    // event handler: 목록 버튼 클릭 이벤트 처리 //
    const onListButtonClickHandler = () => {
        navigator(CS_ABSOLUTE_PATH);
    };

    // event handler: 수정 버튼 클릭 이벤트 처리 //
    const onUpdateButtonClickHandler = () => {
        if (!isCharger) return;
        if (!customerNumber) return;
        navigator(CS_UPDATE_ABSOLUTE_PATH(customerNumber));
    };

    // event handler: 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteButtonClickHandler = () => {
        if (!isCharger) return;

        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        if (!customerNumber) return;

        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;

        deleteCustomerRequest(customerNumber, accessToken).then(deleteCustomerResponse);
    };

    // effect: 고객 번호 변경 시 고객 정보 요청 함수 //
    useEffect(() => {
        if (!customerNumber) return;
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;
        
        getCustomerRequest(customerNumber, accessToken).then(getCustomerResponse);
        getCareRecordListRequest(customerNumber, accessToken).then(getCareRecordListResponse);
        getToolListRequest(accessToken).then(getToolListResponse);
    }, [customerNumber]);

    // render: 고객 정보 상세 보기 컴포넌트 렌더링 //
    return (
        <div id="cs-detail-wrapper">
            <div className='top'>
                <div className='profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div>
                <div className='info-box'>
                    <div className='info-item'>
                        <div className='info-label'>고객 이름</div>
                        <div className='info-text'>{name}</div>
                    </div>
                    <div className='info-item'>
                        <div className='info-label'>생년월일</div>
                        <div className='info-text'>{birth}</div>
                    </div>
                    <div className='info-item'>
                        <div className='info-label'>담당자</div>
                        <div className='info-text'>{chargerName}</div>
                    </div>
                    <div className='info-item'>
                        <div className='info-label'>주소</div>
                        <div className='info-text'>{address}</div>
                    </div>
                </div>
            </div>
            <div className='middle'>
                <div className='title'>관리 기록</div>
                <div className='main'>
                    <div className='table'>
                        <div className='th'>
                            <div className='td-record-date'>날짜</div>
                            <div className='td-record-contents'>내용</div>
                            <div className='td-used-tool'>사용용품</div>
                            <div className='td-used-tool-count'>개수</div>
                        </div>
                        {viewList.map((careRecord, index) =>
                        <div key={index} className='tr'>
                            <div className='td-record-date'>{careRecord.recordDate}</div>
                            <div className='td-record-contents'>{careRecord.contents}</div>
                            <div className='td-used-tool'>{careRecord.usedToolName}</div>
                            <div className='td-used-tool-count'>{careRecord.count}</div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='middle'>
                <div className='title'>기록 작성</div>
                <div className='record-write-box'>
                    <div className='record-write-content-box'>
                        <div className='input-box' style={{ flex: 1 }}>
                            <div className='label'>내용</div>
                            <input className='input' value={recordContents} placeholder='내용을 입력하세요.' onChange={onRecordContentsChangeHandler} />
                        </div>
                        <div className='button disable'>기록</div>
                    </div>
                    <div className='record-write-tool-box'>
                        <div className='input-box'>
                            <div className='label'>사용 용품</div>
                            {showSelector ? 
                            <div className='selector open'>
                                <div className='selected-item'>{selectedTool ? selectedTool.name : '사용 용품'}</div>
                                <div className='arrow-up-button' onClick={onSelectorClickHandler}></div>
                                <div className='selector-box'>
                                    <div className='selector-option' onClick={() => onToolSelectHandler(null)}>사용 안함</div>
                                    {toolList.map((tool, index) => 
                                    <div key={index} className='selector-option' onClick={() => onToolSelectHandler(tool)}>{tool.name}</div>
                                    )}
                                </div>
                            </div> :
                            <div className='selector close'>
                                <div className='selected-item'>{selectedTool ? selectedTool.name : '사용 용품'}</div>
                                <div className='arrow-down-button' onClick={onSelectorClickHandler}></div>
                            </div>
                            }
                        </div>
                        <div className='input-box'>
                            <div className='label'>개수</div>
                            <input className='input' value={usedToolCount} placeholder='개수를 입력하세요.' onChange={onUsedToolCountChangeHandler} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <div className='button primary' onClick={onListButtonClickHandler}>목록</div>
                {isCharger &&
                <div className='button-box'>
                    <div className='button second' onClick={onUpdateButtonClickHandler}>수정</div>
                    <div className='button error' onClick={onDeleteButtonClickHandler}>삭제</div>
                </div>
                }
            </div>
        </div>
    )
}
