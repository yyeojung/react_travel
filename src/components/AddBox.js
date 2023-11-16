import React from 'react'
import styled from 'styled-components'

const Add = styled.button` 
    width:100%;
    height:18rem;
    border-radius:1.5rem;
    background:${props => props.theme.addBox.bgColor};
    border:${props => props.theme.addBox.border};
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    position:relative;
`;
const Plus = styled.i`
    width:5rem;
    height:5rem;
    display:block;
    background:url(${props => props.theme.addBox.plusIcon})center center/100% no-repeat;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
`;
function AddBox(props) {
  return (
    <Add onClick={props.onClick}>
        <Plus/>
    </Add>
  )
}

export default AddBox