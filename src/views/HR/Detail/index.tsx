import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, HR_ABSOLUTE_PATH } from 'src/constants';
import { getChargedCustomerRequest, getNurseRequest } from 'src/apis';
import { GetChargedCustomerResponseDto, GetNurseResponseDto } from 'src/apis/dto/response/nurse';
import { ResponseDto } from 'src/apis/dto/response';
import { usePagination } from 'src/hooks';
import Pagination from 'src/components/Pagination';
import { ChargerdCustomer } from 'src/types';
import { calculateAge } from 'src/utils';

// component: 인사 정보 상세 보기 컴포넌트 //
export default function HRDetail() {

    // state: 요양사 아이디 상태 //
    const { userId } = useParams();

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 요양사 정보 상태 //
    const [name, setName] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');

    // state: 페이징 관련 상태 //
    const {
        currentPage, totalPage, totalCount, viewList,
        setTotalList, initViewList, ...paginationProps
    } = usePagination<ChargerdCustomer>();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: get nurse response 처리 함수 //
    const getNurseResponse = (responseBody: GetNurseResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' : 
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NI' ? '존재하지 않는 요양사입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            navigator(HR_ABSOLUTE_PATH);
            return;
        }

        const { name, telNumber } = responseBody as GetNurseResponseDto;
        setName(name);
        setTelNumber(telNumber);
    };

    // function: get charged customer response 처리 함수 //
    const getChargedCustomerResponse = (responseBody: GetChargedCustomerResponseDto | ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' : 
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { customers } = responseBody as GetChargedCustomerResponseDto;
        setTotalList(customers);
    };

    // effect: 요양사 아이디가 변경될 시 실행할 함수 //
    useEffect(() => {
        if(!userId) return;
        const accessToken = cookies[ACCESS_TOKEN];
        if(!accessToken) return;

        getNurseRequest(userId, accessToken).then(getNurseResponse);
        getChargedCustomerRequest(userId, accessToken).then(getChargedCustomerResponse);
    }, [userId]);

    // render: 인사 정보 상세 보기 컴포넌트 렌더링 //
    return (
        <div id='hr-detail-wrapper'>
            <div className='top'>
                <div className='info-box'>
                    <div className='label'>아이디</div>
                    <div className='text'>{userId}</div>
                </div>
                <div className='info-box'>
                    <div className='label'>이름</div>
                    <div className='text'>{name}</div>
                </div>
                <div className='info-box'>
                    <div className='label'>전화번호</div>
                    <div className='text'>{telNumber}</div>
                </div>
            </div>
            <div className='middle'>
                <div className='title'>관리 중인 고객 리스트</div>
                <div className='table'>
                    <div className='th'>
                        <div className='td-customer-number'>고객번호</div>
                        <div className='td-customer-name'>고객명</div>
                        <div className='td-customer-age'>나이</div>
                        <div className='td-customer-location'>지역</div>
                    </div>
                    {viewList.map((customer, index) => 
                    <div key={index} className='tr'>
                        <div className='td-customer-number'>{customer.customerNumber}</div>
                        <div className='td-customer-name'>{customer.name}</div>
                        <div className='td-customer-age'>{calculateAge(customer.birth)}</div>
                        <div className='td-customer-location'>{customer.location}</div>
                    </div>
                    )}
                </div>
                <div className='middle-bottom'>
                    <Pagination currentPage={currentPage} {...paginationProps} />
                </div>
            </div>
            <div className='bottom'>
                <div className='button primary'>목록</div>
                <div className='button second'>수정</div>
            </div>
        </div>
    )
}
