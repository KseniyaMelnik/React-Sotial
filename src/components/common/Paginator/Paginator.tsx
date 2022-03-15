import React from "react";
import {Pagination} from "antd";

type PaginatorPropsType = {
    totalCount: number,
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PaginatorPropsType>= ({totalCount,onPageChanged}) => {
    return <Pagination onChange={onPageChanged} total={totalCount} />
}

export default Paginator