import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import LightIcon from '../image/icon/LightIcon.png';
import DarkIcon from '../image/icon/darkIcon.png';

const Wrap = styled.div`
    background:${props => props.theme.homeBg};
    height:100vh;
`
const ThemeWrap = styled.div`
    width:calc(100% - 3.2rem);
    margin: 9rem auto 0;
    display:flex;
    justify-content:space-between;
`;
const Mode = styled.button`
    width:calc(50% - 1rem);
    height:14.6rem;
    background:${props => props.theme.addBox.bgColor};
    border:${props => props.theme.addBox.border};
    border-radius:1.5rem;
    box-shadow:${props => props.theme.datepicker.dateShadow};
    &.dark {
        background:${props => props.theme.setting.darkBg};
        border:${props => props.theme.setting.darkBorder};
        border: .1rem solid #4d5158;
    }
    &.dark i {
        background-image:url(${DarkIcon})
    }
    & i {
        width:7rem;
        height:7rem;
        display:block;
        margin:auto;
        background:url(${LightIcon})center center/ 100% no-repeat;
    }
    & span {
        color:#707070;
        font-weight:bold;
        display:block;
        margin-top:2rem;
    }
`;
function Setting(props) {
    const navigate = useNavigate();
    const handleLight = () => {
        props.lightMode();
    }
    const handleDark = () => {
        props.darkMode();
    }
    return (
        <Wrap>
            <Header
                subTitle={"테마설정"}
                onClick={() => {navigate(-1)}}
            />
            <ThemeWrap>
                <Mode onClick={handleLight}>
                    <i></i>
                    <span>라이트모드</span>
                </Mode>
                <Mode 
                    className='dark' 
                    onClick={handleDark}
                >
                    <i></i>
                    <span>다크모드</span>
                </Mode>
            </ThemeWrap>
        </Wrap>
    )
}

export default Setting