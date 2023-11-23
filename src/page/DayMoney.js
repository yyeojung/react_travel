import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
    background:${props => props.theme.homeBg};
    height:100vh;
`
const DayWrap = styled.div`
    padding: 3.2rem 1.6rem;
    & input {
        background:transparent;
        border-radius:0;
        height:auto;
        width:auto;
    }
`
function DayMoney() {    
    const navigate = useNavigate();

    return (
        <Wrap>        
            <Header
                subTitle={"일정별 가계부"}
                onClick={() => {navigate(-1)}}
            />
            <DayWrap>
                <input type="text" 
                    placeholder='여행일을 입력해주세요.'
                />
            </DayWrap>
        </Wrap>
    )
}

export default DayMoney