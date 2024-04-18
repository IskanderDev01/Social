import React, { FC, useState } from 'react'
import style from './paginator.module.css'

type PropsType = {
    totalItemsCount: number 
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount/pageSize)

    let pages = []
    for(let i = 1; i<= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNubmer, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNubmer - 1) * portionSize + 1
    let reightPortionNumber = portionNubmer * portionSize

    return (
        <div className={style.paginator}>
            {portionNubmer > 1 && 
                <button onClick={()=>(setPortionNumber(portionNubmer -1))}><i className='bx bx-left-arrow'></i></button> }
                <div className={style.counts}>
                    {
                        pages 
                            .filter(p => p >= leftPortionNumber && p <= reightPortionNumber)
                            .map((p) => {
                                return <div 
                                            className={currentPage === p ? style.activeNum : ''}
                                            key={p}
                                            onClick={() => {onPageChanged(p)}}
                                            >{p}</div>
                            })
                    }
                </div>
                
            {portionCount > portionNubmer && 
                <button onClick={() => {setPortionNumber(portionNubmer + 1)}}><i className='bx bx-right-arrow' ></i></button>}
        </div>
    )
}

export default Paginator