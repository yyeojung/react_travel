import React, { useEffect, useRef, useState } from 'react'
import {options} from '../data/selectData';
import styled from 'styled-components'

const SelectBox = styled.div`
    position:relative;
    width:calc(50% - 3.3rem);  
    height:4.8rem;
    display:inline-block;
    vertical-align:middle;
    border-radius:1rem;
    cursor:pointer;
    margin-left:${props => props.$marLeft ? '1rem' : '0'};
    background:${props => props.theme.modal.input};
    color:${props => props.disabled ? props.theme.modal.disabledTxt : props.theme.mainColor};
    border:${props => props.theme.modal.inputBorder};
    &::before {
        width:2rem;
        height:2rem;
        display:block;
        clear:both;
        content:"";
        position:absolute;
        top:1.5rem;
        right:1rem;
        transition: all .3s;
        background:url(${props => props.theme.modal.selectArrow})center center/ 2rem no-repeat;
    }
    &.active {
        border:.1rem solid #6491ff;
        &::before {
            transform:rotate(180deg)
        }
    }
`;
const Label = styled.label`
    font-size: 1.6rem;
    line-height:4.8rem;
    padding-left:1rem;
`;
const SelectOptions = styled.ul`
  position: absolute;
  top: 4.8rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 12rem;
  display: ${(props) => (props.$show ? "block" : "none")};
  padding: 0;
  border-radius: 8px;
  background:${props => props.theme.modal.input};
  border:${props => props.theme.modal.inputBorder};
  color: #fefefe;
  z-index:10;
  overflow-y:scroll;
`;
const Option = styled.li`
  font-size: 1.6rem;
  padding: 1rem;
  height:4rem;
  color:${props => props.theme.mainColor};
  &:hover {
    background:rgba(100,145,255,0.3);
  }
`;
  
function Select(props) {
    const [showOption, setShowOptions] = useState(false);
    const [currentValue, setCurrentValue] = useState("1달러");
    const selectRef = useRef(null); //셀렉트 영역 밖 클릭해도 닫힘

    const handleSelectValue = (e) => {
        const {innerText} = e.target;
        setCurrentValue(innerText);
        props.getCurrentValue(innerText);
    }

    const handleOutside = (e) => {
        if (selectRef.current && !selectRef.current.contains(e.target)) {
            setShowOptions(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
        }
    }, []);

    return (
        <SelectBox 
            $marLeft={props.$marLeft} 
            className={showOption ? 'active' : ''} //셀렉트 active 상태에서의 스타일을 위해 추가
            ref={selectRef}//셀렉트 영역 밖 클릭해도 닫힘
            onClick={() => setShowOptions((prev) => !prev)}
        >
            <Label>{currentValue}</Label>
            <SelectOptions $show={showOption}>
            {options.map((option, index) => (
                <Option key={index} onClick={handleSelectValue}>
                    1{option}
                </Option>
            ))}
            </SelectOptions>
        </SelectBox>
    )
}

export default Select