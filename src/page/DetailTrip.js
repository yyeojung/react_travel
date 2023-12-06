import React, { useCallback, useEffect, useState } from 'react'
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
    
    & .add_list {
        font-size:0;
        width:5rem;
        height:5rem;
        display:block;
        margin: 5rem auto;
        background:url(${props => props.theme.addBox.plusIcon})center/ 100% no-repeat;
    }
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
    margin-bottom:3rem;
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
    const [hasSchedule, setHasSchedule] = useState(false);

    //데이터 가져오기
    useEffect(() => {
        const trips = JSON.parse(localStorage.getItem('trips')) || [];
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
                    Money: selectTrip.Money,
                    day: selectTrip.day
                }));
                //day가 있으면 가계부 리스트 보이기
                if (selectTrip.day) {
                    setHasSchedule(true);
                  } 
                }
            }
        }, [tripId])

    //총 지출금액 계산
    const tripTotalCost = () => {
        let totalCost = 0;
        if (tripData.day) {
            const days = Object.values(tripData.day);
            days.forEach((day) => {
                const deleteComma = day.totalCost.replace(/\D/g, ''); // 콤마 제거
                const costNum = parseFloat(deleteComma); // 숫자로 변환
                if(!isNaN(costNum)) {
                    totalCost += costNum;
                }
            });
        }
        return totalCost.toLocaleString();
    }
    //남은 돈 계산
    const remainingMoney = () => {
        const totalBudget = tripData.Checkbox ? 
        (tripData.VisibleBudget ? tripData.VisibleBudget.toString().replace(/\D/g, '') : '') :
        (tripData.Budget ? tripData.Budget.toString().replace(/\D/g, '') : '');

        const deleteCommaCost = tripTotalCost().replace(/\D/g, '');
        const calculateMoney = totalBudget - deleteCommaCost;
        return calculateMoney.toLocaleString();
    }
    //새일정 추가
    const naviagteAddDay = useCallback(
        () => navigate(`/detail/${tripId}/day`), [navigate, tripId]
    )

    //국내여행시에는 화폐단위가 원
    const currency = tripData.Checkbox ? tripData.Money : '원';

    //가계부 수정페이지 이동
    const navigateDayHistory = useCallback((e) => {
        const keyValue = e.currentTarget.dataset.key;
        navigate(`/detail/${tripId}/${keyValue}`);
    }, [navigate, tripId]);    

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
                            {currency}
                        </li>
                    </ul>
                    <Money>
                        <ul>
                            <li>총지출</li>
                            <li><strong>{tripTotalCost()}{currency}</strong></li>
                        </ul>
                        <ul>
                            <li>남은 돈</li>
                            <li><strong>{remainingMoney()}{currency}</strong></li>
                        </ul>
                    </Money>
                </TripInfo>
                <DetailMoney>
                {hasSchedule ? 
                <>
                    {tripData.day && Object.keys(tripData.day).map((dayKey) => (
                        <History key={dayKey} onClick={navigateDayHistory} data-key={dayKey}>
                            <h3>{tripData.day[dayKey].dayTitle}</h3>
                            <MoneyList>
                                <table>
                                    <colgroup>
                                        <col />
                                        <col style={{width:'30%'}}/>
                                    </colgroup>
                                    <tbody>
                                        {tripData.day[dayKey].daySchedule.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.schedule}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Total>
                                    <span>총 지출금액 : <strong>{tripData.day[dayKey].totalCost}</strong>{currency}</span>
                                </Total>
                            </MoneyList>
                        </History>
                    ))}
                    <button 
                        className="add_list"
                        onClick={naviagteAddDay}
                    >추가하기
                    </button>

                </>
                    :
                    <Empty>
                        <h3>일정을 추가해보세요!</h3>
                        <AddBox
                            onClick={naviagteAddDay}
                        />
                    </Empty>
                }
                </DetailMoney>            
            </Wrap>
        </>
    )
}

export default DetailTrip