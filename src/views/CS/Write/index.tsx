import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { useSignInUserStore } from 'src/stores';
import { usePagination } from 'src/hooks';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, CS_ABSOLUTE_PATH } from 'src/constants';
import { fileUploadRequest, getNurseListRequest, postCustomerRequest } from 'src/apis';
import { GetNurseListResponseDto } from 'src/apis/dto/response/nurse';
import { ResponseDto } from 'src/apis/dto/response';
import { Nurse } from 'src/types';
import Pagination from 'src/components/Pagination';
import { useNavigate } from 'react-router';
import PostCustomerRequestDto from 'src/apis/dto/request/customer/post-customer.request.dto';

// variable: 기본 프로필 이미지 URL //
const defaultProfileImageUrl = 'https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png';

// component: 고객 정보 작성 화면 컴포넌트 //
export default function CSWrite() {

    // state: 로그인 유저 상태 //
    const { signInUser } = useSignInUserStore();

    // state: 이미지 입력 참조 //
    const imageInputRef = useRef<HTMLInputElement|null>(null);

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 프로필 미리보기 URL 상태 //
    const [previewUrl, setPreviewUrl] = useState<string>(defaultProfileImageUrl);
    // state: 모달 팝업 상태 //
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // state: 고객 정보 상태 //
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [charger, setCharger] = useState<string>('');
    const [chargerName, setChargerName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    // state: 검색어 상태 //
    const [searchWord, setSearchWord] = useState<string>('');

    // state: 원본 리스트 상태 //
    const [originalList, setOriginalList] = useState<Nurse[]>([]);

    // state: 페이징 관련 상태 //
    const {
        currentPage, totalPage, totalCount, viewList,
        setTotalList, initViewList, ...paginationProps
    } = usePagination<Nurse>();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: 다음 주소 검색 팝업 함수 //
    const daumPostcodePopup = useDaumPostcodePopup();

    // function: 다음 주소 검색 완료 처리 함수 //
    const daumPostcodeComplete = (result: Address) => {
        const { address, sigungu } = result;
        setAddress(address);
        setLocation(sigungu);
    };

    // function: get nurse list response 처리 함수 //
    const getNurseListResponse = (responseBody: GetNurseListResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { nurses } = responseBody as GetNurseListResponseDto;
        setTotalList(nurses);
        setOriginalList(nurses);
    };

    // function: post customer response 처리 함수 //
    const postCustomerResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' : 
            responseBody.code === 'VF' ? '모두 입력해주세요.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NI' ? '존재하지 않는 요양사입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        navigator(CS_ABSOLUTE_PATH);
    };

    // event handler: 프로필 이미지 클릭 이벤트 처리 //
    const onProfileImageClickHandler = () => {
        const { current } = imageInputRef;
        if (!current) return;
        current.click();
    };

    // event handler: 이미지 변경 이벤트 처리 함수 //
    const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || !files.length) return;

        const file = files[0];
        setProfileImageFile(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setPreviewUrl(fileReader.result as string);
        };
    };

    // event handler: 이름 변경 이벤트 처리 함수 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    // event handler: 생년월일 변경 이벤트 처리 함수 //
    const onBirthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const regexp = /^\d{0,6}$/;
        const isMatched = regexp.test(value);
        if (!isMatched) return;
        setBirth(value);
    };

    // event handler: 주소 검색 버튼 클릭 이벤트 처리 //
    const onAddressButtonClickHandler = () => {
        daumPostcodePopup({ onComplete: daumPostcodeComplete });
    };

    // event handler: 담당자 본인 선택 이벤트 처리 //
    const onChargerSelfButtonClickHandler = () => {
        if (!signInUser) return;
        setCharger(signInUser.userId);
        setChargerName(signInUser.name);
    };

    // event handler: 모달 오픈 이벤트 처리 //
    const onModelOpenHandler = () => {
        setModalOpen(!modalOpen);
    };

    // event handler: 검색어 변경 이벤트 처리 //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchWord(value);
    };

    // event handler: 검색어 키다운 이벤트 처리 //
    const onSearchWordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        if (key === 'Enter') onSearchButtonClickHandler();
    };

    // event handler: 검색 버튼 클릭 이벤트 처리 //
    const onSearchButtonClickHandler = () => {
        const searchedNurseList = originalList.filter(nurse => nurse.name.includes(searchWord));
        setTotalList(searchedNurseList);
        initViewList(searchedNurseList);
    };

    // event handler: 요양사 선택 이벤트 처리 //
    const onNurseSelectHandler = (nurse: Nurse) => {
        setCharger(nurse.nurseId);
        setChargerName(nurse.name);
        setModalOpen(false);
    };

    // event handler: 목록 버튼 클릭 이벤트 처리 //
    const onListButtonClickHandler = () => {
        navigator(CS_ABSOLUTE_PATH);
    };

    // event handler: 등록 버튼 클릭 이벤트 처리 //
    const onPostClickHandler = async () => {
        if (!name || !birth || !charger || !address || !location) return;

        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;

        let url: string | null = null;
        if (profileImageFile) {
            const formData = new FormData();
            formData.append('file', profileImageFile);
            url = await fileUploadRequest(formData);
        }
        url = url ? url : defaultProfileImageUrl;

        const requestBody: PostCustomerRequestDto = {
            profileImage: url,
            name, birth, charger, address, location
        };
        postCustomerRequest(requestBody, accessToken).then(postCustomerResponse);

    };

    // effect: 첫 로드시 요양사 리스트 불러오기 함수 //
    useEffect(() => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;
        getNurseListRequest(accessToken).then(getNurseListResponse);
    }, []);

    // effect: 모달 오픈 상태가 바뀔 시 스크롤 여부 함수 //
    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [modalOpen]);


    // render: 고객 정보 작성 화면 컴포넌트 렌더링 //
    return (
        <div id='cs-write-wrapper'>
            <div className='main'>
                <div className='profile-image' style={{ backgroundImage: `url(${previewUrl})` }} onClick={onProfileImageClickHandler}>
                    <input ref={imageInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={onImageInputChangeHandler} />
                </div>
                <div className='input-container'>
                    <div className='input-box'>
                        <div className='input-label'>고객 이름</div>
                        <input className='input' value={name} placeholder='고객 이름을 입력하세요.' onChange={onNameChangeHandler} />
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>생년월일</div>
                        <input className='input' value={birth} placeholder='6자리 생년월일을 입력하세요.' onChange={onBirthChangeHandler} />
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>담당자</div>
                        <input className='input' value={chargerName} readOnly placeholder='담당자를 선택하세요.' />
                        <div className='button-box'>
                            <div className='button second' onClick={onChargerSelfButtonClickHandler}>자신</div>
                            <div className='button disable' onClick={onModelOpenHandler}>검색</div>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>주소</div>
                        <input className='input' value={address} readOnly placeholder='주소를 선택하세요.' />
                        <div className='button-box'>
                            <div className='button disable' onClick={onAddressButtonClickHandler}>검색</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <div className='button primary' onClick={onListButtonClickHandler}>목록</div>
                <div className='button second' onClick={onPostClickHandler}>등록</div>
            </div>
            {modalOpen &&
            <div className='modal'>
                <div className='modal-box'>
                    <div className='modal-top'>
                        <div className='modal-label'>담당자 이름</div>
                        <div className='modal-input-box'>
                            <input className='modal-input' value={searchWord} placeholder='이름을 입력하세요.' onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeydownHandler} />
                            <div className='button disable' onClick={onSearchButtonClickHandler}>검색</div>
                        </div>
                    </div>
                    <div className='modal-main'>
                        <div className='table'>
                            <div className='th'>
                                <div className='td-nurse-id'>ID</div>
                                <div className='td-nurse-name'>이름</div>
                                <div className='td-nurse-tel-number'>전화번호</div>
                            </div>
                            {viewList.map((nurse, index) => 
                            <div key={index} className='tr' onClick={() => onNurseSelectHandler(nurse)}>
                                <div className='td-nurse-id'>{nurse.nurseId}</div>
                                <div className='td-nurse-name'>{nurse.name}</div>
                                <div className='td-nurse-tel-number'>{nurse.telNumber}</div>
                            </div>
                            )}
                        </div>
                        <div className='modal-pagination-box'>
                            <Pagination currentPage={currentPage} {...paginationProps} />
                        </div>
                    </div>
                    <div className='modal-bottom'>
                        <div className='button disable' onClick={onModelOpenHandler}>닫기</div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
