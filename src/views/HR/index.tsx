import React, { useEffect, useState } from 'react'
import './style.css';
import { usePagination } from 'src/hooks';
import { Nurse } from 'src/types';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { getNurseListRequest } from 'src/apis';
import { GetNurseListResponseDto } from 'src/apis/dto/response/nurse';
import { ResponseDto } from 'src/apis/dto/response';
import Pagination from 'src/components/Pagination';

// interface: 요양사 리스트 아이템 컴포넌트 Properties //
interface TableRowProps {
    nurse: Nurse;
}

// component: 요양사 리스트 아이템 컴포넌트 //
function TableRow({ nurse }: TableRowProps) {

    // render: 요양사 리스트 아이템 컴포넌트 렌더링 //
    return (
        <div className='tr'>
            <div className='td-nurse-infos'>
                <div className='td-nurse-id'>{nurse.nurseId}</div>
                <div className='td-nurse-name'>{nurse.name}</div>
                <div className='td-nurse-tel'>{nurse.telNumber}</div>
            </div>
            <div className='td-buttons'>
                <div className='td-edit'>
                    <div className='icon-button edit'></div>
                </div>
            </div>
        </div>
    )
}

// component: 인사 관리 리스트 컴포넌트 //
export default function HR() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 원본 리스트 상태 //
    const [originalList, setOriginalList] = useState<Nurse[]>([]);

    // state: 페이징 관련 상태 //
    const {
        currentPage, totalPage, totalCount, viewList,
        setTotalList, initViewList, ...paginationProps
    } = usePagination<Nurse>();

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

    // effect: 컴포넌트 로드시 요양사 리스트 불러오기 함수 //
    useEffect(() => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;

        getNurseListRequest(accessToken).then(getNurseListResponse);
    }, []);

    // render: 인사 관리 리스트 컴포넌트 렌더링 //
    return (
        <div id='hr-wrapper'>
            <div className='top'>
                <div className='top-text'>
                    전체 <span className='emphasis'>{totalCount}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span>
                </div>
            </div>
            <div className='main'>
                <div className='table'>
                    <div className='th'>
                        <div className='td-nurse-infos'>
                            <div className='td-nurse-id'>요양사 ID</div>
                            <div className='td-nurse-name'>요양사 이름</div>
                            <div className='td-nurse-tel'>전화번호</div>
                        </div>
                        <div className='td-buttons'>
                            <div className='td-edit'>수정</div>
                        </div>
                    </div>
                    {viewList.map((nurse, index) => <TableRow key={index} nurse={nurse} />)}
                </div>
            </div>
            <div className='bottom'>
                <Pagination currentPage={currentPage} {...paginationProps} />
            </div>
        </div>
    )
}
