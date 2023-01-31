import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useTrans from "../hooks/useTrans";

interface IPagination {
  itemsPerPage: number,
  total: number,
  offset: number, 
  handleClickSearch: any,
}


export const PaginatedItems = ({ 
  itemsPerPage = 0,
  total = 0,
  offset = 0, 
  handleClickSearch  
}: IPagination) => {

// export const PaginatedItems = ({ 
//     itemsPerPage = 0,
//     total = 0,
//     offset = 0, 
//     handleClickSearch 

// }) => {
 
    const { language } = useTrans()
    
    const [ pageCount, setPageCount ] = useState(0)

    useEffect(() => {
        const endOffset = offset + itemsPerPage
        setPageCount(Math.ceil(total / itemsPerPage))
    }, [offset, itemsPerPage, total])

    const handlePageClick  = (e: any) => {
        handleClickSearch(e, e.selected + 1)
    } 
  
    return (
      <> 
        <ReactPaginate
          breakLabel="..."
          nextLabel={ language.pagination.next }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={ language.pagination.previous } 
          activeLinkClassName="bg-orange-500 p-4 rounded-md text-white"
          className="flex  justify-center space-x-4 mt-8" 
        />
      </>
    );
  }