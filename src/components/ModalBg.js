import React from 'react'
import styled from 'styled-components';

const Background = styled.div`
    width:100%;
    height:100vh;
    position:absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.5);
`;

function ModalBg(props) {
  return (
    <Background onClick={props.onClick}/>
  )
}

export default ModalBg