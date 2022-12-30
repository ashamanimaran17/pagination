import React,{useContext, useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import axios from "axios";
import {PageContext} from "./pageContext";
import {takeRight, take} from "lodash";

const BeerDiv = styled.div`
display: flex;
flex-direction: column;
padding: 5px;
border: 1px solid black;
margin: 5px;
`
const PageDiv = styled.div`
padding: 5px;
`
export const Beers = () => {
    const url="https://api.punkapi.com/v2/beers?";
    const [data, setData] = useState([]);
    const per_page = 25;
    const [page, setSupress] = useContext(PageContext);
    const prevPage = useRef(0);
    const [elementToFocus, setElementToFocus] = useState();
    useEffect(() => {
      if(prevPage.current !== page.pageNumber){
        prevPage.current = page.pageNumber;
        setSupress(true);
        axios({
           method: "GET",
           url: url,
           params:{
            page: page.pageNumber,
            per_page:per_page
           }
        }).then((response)=> {
          if(response.data.length){
            if(page.scrollDirection === "down"){//append data and keep the last 3 pages
              setData((prevData) => {
                const lastElementId = prevData[prevData.length - 1]?.id;
                setElementToFocus(lastElementId);
                let temp = [...prevData, ...response.data];
                temp = takeRight(temp, per_page*3);
                return temp;
              })
            }
            if(page.scrollDirection === "up"){//prepend data and keep the first 3 pages
              setData((prevData) => {
           const firstElementId = prevData[0]?.id;
           setElementToFocus(firstElementId);
              let temp = [...response.data, ...prevData];
              temp = take(temp, per_page*3);
              return (temp);
            })
            }
          }
        }).catch((err)=> {
            console.log(err)
        });
      }
    }, [page]);

    useEffect(()=> {
      if(elementToFocus){
        if(page.scrollDirection === "down"){
          document.getElementById(elementToFocus).scrollIntoView(false);//keep focussed element in bottom
        }else{
          document.getElementById(elementToFocus).scrollIntoView(true);//keep focussed element in top
        }
      };

      setSupress(false);
    },[data])

  return (
    <PageDiv>
      {data.map((beer, index) => {
        return (<BeerDiv id={beer.id}>
          <div>id: {beer.id}</div>
          <div>name: {beer.name}</div>
          <div>tagline: {beer.tagline}</div>
          <div>first_brewed: {beer.first_brewed}</div>
          <div>description: {beer.description}</div>
          <div>image_url: {beer.image_url}</div>
        </BeerDiv>)
      })}
    </PageDiv>
  )
}

