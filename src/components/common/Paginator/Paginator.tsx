import React, {useState} from "react";
import s from "./Paginator.module.css"

type PaginatorPropsType = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: React.FC<PaginatorPropsType>= ({totalCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionNumber = portionNumber * portionSize


    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <button onClick={()=> {setPortionNumber(portionNumber-1)}}>PREV</button> }
            {pages
                .filter(p => p >= leftPortionNumber && p<=rightPortionNumber)
                .map(p => <span className={currentPage === p ? s.pageNumber + " " + s.selectedPage : s.pageNumber}
                                key={p}
                                  onClick={() => {
                                      onPageChanged(p)
                                  }}
            >{p}</span> )}
        { portionCount > portionNumber &&
            <button onClick={()=> {setPortionNumber(portionNumber + 1)}}>NEXT</button> }
        </div>
}

export default Paginator