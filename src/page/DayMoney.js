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
    & input.day_title {
        background:transparent;
        border-radius:0;
        height:auto;
        width:auto;
        font-weight:bold;
        color:${props => props.theme.mainColor};
    }
`
const MoneyBox = styled.div`
    border-radius : 1.5rem;
    padding:2rem;
    background:${props => props.theme.modal.bgColor};
    & table {
        width: 100%;
    }
    & table tr:first-child td {
        border-top: .1rem solid ${props => props.theme.subPage.divideLine};
    }
    & table tr td {
        border-bottom: .1rem solid ${props => props.theme.subPage.divideLine};
        color:${props => props.theme.mainColor};
        height: 4rem;
        input {
            height:100%;
            padding:0;
            background:transparent;
        }
    }
    & table tr td.price {
        border-left: .1rem solid ${props => props.theme.subPage.divideLine};
        min-width:12rem;
        display:flex;
        align-items:center;
        input {
            text-align:right;
        }     
        span {
            margin:0 .6rem;
        }   
        .delete {
            display:inline-block;
            width:2rem;
            height:2rem;
            vertical-align:bottom;
            background:url(${props => props.theme.day.trashIcon})center/ 2rem no-repeat;
        }
    }
    & table tr td.add_plan {
        text-align:center;
        button {
            color:${props => props.theme.subPage.divideLine};
            line-height:2rem;
            margin:3rem 0;
            i {
                display:inline-block;
                width:2rem;
                vertical-align:bottom;
                height:2rem;
                background:url(${props => props.theme.day.plusIcon})center/ 2rem no-repeat;
                margin-right:1rem;
                vertical-align:bottom;
            }
        }
    }
`;
const Button = styled.button`
    width:100%;
    height: 4rem;
    border-radius:1rem;
    margin-top:2rem;
    font-weight:bold;
    color:${props => props.theme.mainColor};
    background:${props => props.theme.modal.bgColor};
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
                    className='day_title'
                    placeholder='여행일을 입력해주세요.'
                />
                <MoneyBox>
                    <table>
                        <colgroup>
                            <col style={{width:"70%"}}/>
                            <col style={{width:"30%"}}/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        type='text'
                                        placeholder='일정을 입력해주세요.'
                                    />
                                </td>
                                <td className='price'>
                                    <input 
                                        type='text'
                                        placeholder='가격'
                                    />
                                    <span>원</span>
                                    <i className='delete'></i>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className='add_plan'>
                                    <button>
                                        <i/>
                                        추가하기
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </MoneyBox>
                <Button>저장</Button>
            </DayWrap>
        </Wrap>
    )
}

export default DayMoney