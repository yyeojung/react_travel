import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './../components/Header';
import AddBox from './../components/AddBox';
import { Link, useNavigate } from 'react-router-dom';
import HomeModal from '../components/HomeModal';
import ModalBg from '../components/ModalBg';
import TravelList from '../components/TravelList';

const Wrap = styled.div`
    background:${props => props.theme.homeBg};
    min-height:100vh;
`;
const Contents = styled.div`
    position:relative;
    padding:0 1.6rem 6rem;
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
    const [isOpen, setIsOpen] = useState(false);
    const [hasData, setHasData ] = useState(false);

    //로컬스토리지에 값이 없으면 여행지 생성 박스 노출
    useEffect(() => {
        const trips = JSON.parse(localStorage.getItem('trips')) || [];
        setHasData(trips.length > 0);
    }, []);

    const addModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const saveData = () => { // 저장이벤트 따로 주기 위해 만듦
        setHasData(true);
        setIsOpen(false)
    }
    return (
        <Wrap>
            <Header 
                isMainPage={true}
            />
            <Contents>
                <Link to={"/setting"}>
                    <Setting/>
                </Link>
                <MainTitle>어디로 여행가시나요?</MainTitle>
                {
                    hasData ?
                    <TravelList onClick={addModal}></TravelList>
                :
                    <>
                        <SubTitle>여행지를 추가해보세요!</SubTitle>
                        <AddBox
                            onClick={addModal}
                        />
                    </>                    
                }
            </Contents>
            {isOpen && <ModalBg onClick={closeModal}/>}
            <HomeModal
                onClick={closeModal}
                saveForm={saveData}
                leftBtn={"취소"}
                rightBtn={"추가"}
                popup={isOpen ? {bottom: '0'} : {bottom : '-100%'}}
            />
        </Wrap>
    )
}

export default Home