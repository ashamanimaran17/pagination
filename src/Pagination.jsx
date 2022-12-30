import React, { useState } from 'react'
import styled from 'styled-components';
import {PageContext} from "./pageContext";
const PaginationDiv =styled.div`
    top:0;
    left:0;
    min-height:100vh;
    min-width: 100vw;
`

export const Pagination = (props) => {

    const [page, setPage] = useState({pageNumber: 1, scrollDirection: "down"});
    const [supress, setSupress] = useState(false);

  window.addEventListener('scroll', function() {
    if(!supress){//supress reacting to scroll events until the data set is adjusted(prepend/append remove more than 3 pages)
      //adjusting the data set while leaving the scroller in the same top/bottom position will initiate another fetch so before adjusting the 
      //data set supess to true. After adjusting move the scroller to the element which previously had focus and then set supress to false
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
        setPage({pageNumber: page.pageNumber+1,scrollDirection: "down" })
     }
     if(window.scrollY === 0){
       console.log("you're at the top of the page");
       if(page.pageNumber >1){
         setPage({pageNumber: page.pageNumber-1,scrollDirection: "up" })
       }
     }
    }
   }); 

  return (
    <>
    <PageContext.Provider value={[page, setSupress]}> 
    <PaginationDiv id="paginationDiv">
    {props.children}
    </PaginationDiv>
    </PageContext.Provider>
    </>
  )
}
