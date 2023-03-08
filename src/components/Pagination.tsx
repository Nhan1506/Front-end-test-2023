import React, { FC, useEffect } from "react"
import Pagination from "react-bootstrap/Pagination"

type TPaginations = {
  itemsCount: number
  itemsPerPage: number
  currentPage: number
  setCurrentPage: (number: number) => void
  alwaysShown: boolean
}
export const Paginations: FC<TPaginations> = (props) => {
  const { itemsCount, itemsPerPage, currentPage, setCurrentPage, alwaysShown = true } = props

  const pagesCount = Math.ceil(itemsCount / itemsPerPage)
  const isPaginationShown = alwaysShown ? true : pagesCount > 1
  const isCurrentPageFirst = currentPage === 1
  const isCurrentPageLast = currentPage === pagesCount

  const changePage = (number: any) => {
    if (currentPage === number) return
    setCurrentPage(number)
  }

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber)
  }

  const onPreviousPageClick = () => {
    changePage((currentPage: number) => currentPage - 1)
  }

  const onNextPageClick = () => {
    changePage((currentPage: number) => currentPage + 1)
  }

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount)
    }
  }

  let isPageNumberOutOfRange: boolean

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1
    const isPageNumberFirst = pageNumber === 1
    const isPageNumberLast = pageNumber === pagesCount
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2

    if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
      isPageNumberOutOfRange = false
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      )
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true
      return <Pagination.Ellipsis key={pageNumber} className="muted" />
    }

    return null
  })

  useEffect(setLastPageAsCurrent, [currentPage, pagesCount, setCurrentPage])

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.Prev onClick={onPreviousPageClick} disabled={isCurrentPageFirst} />
          {pageNumbers}
          <Pagination.Next onClick={onNextPageClick} disabled={isCurrentPageLast} />
        </Pagination>
      )}
    </>
  )
}
