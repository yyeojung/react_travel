import React from 'react'
import styled from 'styled-components'
import Header from './../components/Header';
import AddBox from './../components/AddBox';
import { Link } from 'react-router-dom';
import HomeModal from '../components/HomeModal';

const Wrap = styled.div`
    background:${props => props.theme.homeBg};
    height:100vh;
    position:realative;
`;
const Contents = styled.div`
    position:relative;
    padding:0 1.6rem;
`;
const Setting = styled.i`
    display:block;
    width:2rem;
    height:2rem;
    background:url(${props => props.theme.settingIcon})center center/ 100% no-repeat;
    position:absolute;
    top:1rem;
    right:1rem;
`;
const MainTitle = styled.h2`
    text-align:center;
    color:${props => props.theme.mainColor};
    font-size:2rem;
    padding-top: 6rem;
`;
const SubTitle = styled.h3`
    font-size:1.6rem;
    color:#707070;
    text-align:center;
    margin:6rem 0 2.4rem 0;
`;
function Home() {
  return (
    <Wrap>
        <Header 
            isMainPage={true}
            subTitle={"dhdh"}
        />
        <Contents>
            <Link to={"/setting"}>
                <Setting/>
            </Link>
            <MainTitle>어디로 여행가시나요?</MainTitle>
            <>
                <SubTitle>여행지를 추가해보세요!</SubTitle>
                <AddBox/>
            </>
            {/* {
                empty ?
                <>
                    <SubTitle>여행지를 추가해보세요!</SubTitle>
                    <AddBox/>
                </>
             :
                <TravelList></TravelList>
            } */}
        </Contents>
        <HomeModal
            btnTxt={"추가"}
        />
    </Wrap>
  )
}

export default Home