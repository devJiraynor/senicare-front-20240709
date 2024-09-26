import React, { ChangeEvent, useState } from 'react';
import './style.css';
import { usePagination } from 'src/hooks';
import Pagination from 'src/components/Pagination';
import { Customer } from 'src/types';
import { useSignInUserStore } from 'src/stores';

// interface: 고객 리스트 아이템 컴포넌트 Properties //
interface TableRowProps {
    customer: Customer
}

// component: 고객 리스트 아이템 컴포넌트 //
function TableRow({ customer }: TableRowProps) {

    // state: 로그인 유저 상태 //
    const { signInUser } = useSignInUserStore();

    // variable: 담당자 여부 //
    const isCharger = signInUser !== null && signInUser.userId === customer.chargerId;
    
    // render: 고객 리스트 아이템 컴포넌트 렌더링 //
    return (
        <div className='tr'>
            <div className='td-customer-number'>{customer.customerNumber}</div>
            <div className='td-customer-name'>{customer.name}</div>
            <div className='td-customer-age'>{}</div>
            <div className='td-customer-location'>{customer.location}</div>
            <div className='td-customer-charger'>{customer.chargerName}</div>
            {isCharger ? 
            <div className='td-buttons'>
                <div className='td-edit'>
                    <div className='icon-button edit'></div>
                </div>
                <div className='td-delete'>
                    <div className='icon-button trash'></div>
                </div>
            </div>
            :
            <div></div>
            }
            
        </div>
    )
}

// component: 고객 관리 리스트 화면 컴포넌트 //
export default function CS() {

    // state: 검색어 상태 //
    const [searchWord, setSearchWord] = useState<string>('');

    // state: 페이징 관련 상태 //
    const {
        currentPage, totalPage, totalCount, viewList,
        setTotalList, initViewList, ...paginationProps
    } = usePagination<Customer>();

    // event handler: 검색어 변경 이벤트 처리 함수 //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchWord(value);
    };

    // event handler: 검색 버튼 클릭 이벤트 처리 함수 //
    const onSearchButtonClickHandler = () => {

    };
    
    // render: 고객 관리 리스트 화면 컴포넌트 렌더링 //
    return (
        <div id='cs-wrapper'>
            <div className='top'>
                <div className='top-text'>전체 <span className='emphasis'>{totalCount}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
            </div>
            <div className='main'>
                <div className='table'>
                    <div className='th'>
                        <div className='td-customer-number'>고객번호</div>
                        <div className='td-customer-name'>고객명</div>
                        <div className='td-customer-age'>나이</div>
                        <div className='td-customer-location'>지역</div>
                        <div className='td-customer-charger'>담당자</div>
                        <div className='td-buttons'>
                            <div className='td-edit'>수정</div>
                            <div className='td-delete'>삭제</div>
                        </div>
                    </div>
                    {viewList.map((customer, index) => <TableRow key={index} customer={customer} />)}
                </div>
            </div>
            <div className='bottom'>
                <Pagination currentPage={currentPage} {...paginationProps} />
                <div className='search-box'>
                    <input className='search-input' value={searchWord} placeholder='검색어를 입력하세요.' onChange={onSearchWordChangeHandler} />
                    <div className='button disable' onClick={onSearchButtonClickHandler}>검색</div>
                </div>
            </div>
        </div>
    )
}
