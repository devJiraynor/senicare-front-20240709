import React from 'react';
import './style.css';

// interface: 페이지네이션 컴포넌트 properties //
interface PaginationProp {
    pageList: number[];
    currentPage: number;
    onPageClickHandler: (page: number) => void;
    onPreSectionClickHandler: () => void;
    onNextSectionClickHandler: () => void;
}

// component: 페이지네이션 컴포넌트 //
export default function Pagination({ 
    pageList,
    currentPage,
    onPageClickHandler,
    onPreSectionClickHandler,
    onNextSectionClickHandler,
}: PaginationProp) {

    // render: 페이지네이션 컴포넌트 렌더링 //
    return (
        <div className='pagination-box'>
            <div className='round-left-button' onClick={onPreSectionClickHandler}></div>
            <div className='page-list'>
                {pageList.map(page => <div key={page} className={page === currentPage ? 'page active' : 'page'} onClick={() => onPageClickHandler(page)}>{page}</div>)}
            </div>
            <div className='round-right-button' onClick={onNextSectionClickHandler}></div>
        </div>
    )
}
