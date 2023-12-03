import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AddBox from '../components/AddBox';

const Wrap = styled.div`
    background:${props => props.theme.subPage.bgColor};
`
const TripInfo = styled.div`
    height:23.5rem;
    padding : 2rem 1.6rem;
    color:${props => props.theme.mainColor};
    & li ~ li {
        margin-top:1rem;
    }
    & li.title {
        font-weight:bold;
    }
`
const Money = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    position:relative;
    height:10rem;
    margin-top:2rem;
    &::before {
        position:absolute;
        left:50%;
        transform:translate(-50%);
        display:inline-block;
        clear:both;
        content:"";
        width:.1rem;
        height:6rem;
        background:${props => props.theme.subPage.divideLine};
    }
    & li {
        text-align: center;
    }
`
const DetailMoney = styled.div`
    padding: 3rem 1.6rem;
    border-radius:2rem 2rem 0 0;
    min-height:calc(100vh - 29.1rem);
    background:${props => props.theme.subPage.detailBg};
`
const Empty = styled.div`
    & h3 {
        color:#707070;
        font-size:1.6rem;
        text-align:center;
        margin-bottom:2.4rem;
    }
`
const History = styled.div`
    & h3 {
        color:${props => props.theme.mainColor};
        font-size:1.6rem;
        font-weight:bold;
    }
`
const MoneyList = styled.div`
    cursor:pointer;
    border-radius:1.5rem;
    padding:2rem;
    margin-top:1rem;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    background:${props => props.theme.modal.input};
    color:${props => props.theme.mainColor};
    & table {
        width:100%;
    }
    & table tr td {
        padding:1rem 0;
    }
    & table td {
        border-bottom:.1rem solid ${props => props.theme.subPage.divideLine};
    }
    & table tr td:last-child {
        text-align:right;
    }
`
const Total = styled.div` 
    margin-top:1rem;
    text-align:right;
`

function DetailTrip() {
    const navigate = useNavigate();
    const {tripId} = useParams();
    const [tripData, setTripData] = useState([]);

    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    //데이터 가져오기
    useEffect(() => {
        if(tripId) {
            const selectTrip = trips.find(trip => trip.id === tripId);
            if(selectTrip) {
                setTripData(prev => ({
                    ...prev,
                    Title: selectTrip.Title,
                    Date: selectTrip.Date,
                    Period: selectTrip.Period,
                    Rate: selectTrip.Rate,
                    Budget: selectTrip.Budget,
                    VisibleBudget: selectTrip.VisibleBudget,
                    Checkbox: selectTrip.Checkbox,
                    Money: selectTrip.Money
                }))
            }
        }
    }, [tripId])



    return (
        <>
            <Header
                subTitle={"여행 지출내역"}
                onClick={() => {navigate(-1)}}
            />
            <Wrap>
                <TripInfo>
                    <ul>
                        <li className='title'>{tripData.Title}</li>
                        <li>{tripData.Date} (<span>{tripData.Period}</span>)</li>
                        <li>총예산 : 
                            <span>{
                                tripData.Checkbox ?
                                tripData.VisibleBudget :
                                tripData.Budget
                            }</span>
                            {tripData.Money}
                        </li>
                    </ul>
                    <Money>
                        <ul>
                            <li>총지출</li>
                            <li><strong>0{tripData.Money}</strong></li>
                        </ul>
                        <ul>
                            <li>남은 돈</li>
                            <li><strong>0{tripData.Money}</strong></li>
                        </ul>
                    </Money>
                </TripInfo>
                <DetailMoney>
                    <Empty>
                        <h3>일정을 추가해보세요!</h3>
                        <AddBox/>
                    </Empty>
                    {/* <History>
                        <h3>ddd</h3>
                        <MoneyList>
                            <table>
                                <colgroup>
                                    <col />
                                    <col style={{width:'30%'}}/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                    <tr>
                                        <td>호핑투어</td>
                                        <td>100페소</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Total>
                                <span>총 지출금액 : <strong>2000페소</strong></span>
                            </Total>
                        </MoneyList>
                    </History> */}
                </DetailMoney>            
            </Wrap>
        </>
    )
}

export default DetailTrip