import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components'

const Headers = styled.header`
    height:5.6rem;
    padding: 0 1.6rem;
    display:flex;
    align-items:center;
    position: relative;
`;
const Logo = styled.img`
    height:3.5rem;
`;
const Arrow = styled.i`
    background:url(${props => props.theme.arrowIcon})center center/ 100% no-repeat;
    display:block;
    width: 2rem;
    height: 2rem;
`;
const SubTxt = styled.h2`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    font-size:1.6rem;
    color:${props => props.theme.mainColor};
`;

function Header(props) {
    const theme = useContext(ThemeContext);
    return (
        <Headers>
            {props.isMainPage ? 
                <h1>
                    <Logo src={theme.logo}></Logo>
                </h1> :
                <>
                    <Link to="#" onClick={props.onClick}>
                        <Arrow/>
                    </Link>
                    <SubTxt>{props.subTitle}</SubTxt>
                </>
            }
        </Headers>
    )
}

export default Header