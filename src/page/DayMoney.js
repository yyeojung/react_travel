import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';//uuid import
import styled from 'styled-components';
import Header from '../components/Header'

const Wrap = styled.div`
    background:${props => props.theme.homeBg};
    min-height:100vh;
`
const DayWrap = styled.div`
    padding: 3.2rem 1.6rem;
    & input.day_title {
        background:transparent;
        border-radius:0;
        height:auto;
        width:auto;
        min-width:20rem;
        font-weight:bold;
        color:${props => props.theme.mainColor};
    }
`
const MoneyBox = styled.form`
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
            border-radius:0;
        }     
        & input:-webkit-autofill,
        & input:-webkit-autofill:hover,
        & input:-webkit-autofill:focus,
        & input:-webkit-autofill:active {
            -webkit-text-fill-color:${props => props.theme.mainColor};
            -webkit-box-shadow: 0 0 0px 100rem ${props => props.theme.modal.bgColor} inset;
            box-shadow: 0 0 0px 100rem ${props => props.theme.modal.bgColor} inset;
            transition: background-color 5000s ease-in-out 0s;
        } 
        .delete {
            display:inline-block;
            font-size:0;
            width:2rem;
            height:2rem;
            vertical-align:bottom;
            margin-left:.8rem;
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
`
const Total = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
    color:${props => props.theme.mainColor};
    & div.input_wrap {
        min-width:5rem;
        max-width:20rem;
        padding:0;
        border-radius:0;
        height:2rem;
        position:relative;
        span {
            display:block;
            height:2rem;
            min-width:5rem;
            font-weight: bold;
            text-align:right;
        }
        input {
            position:absolute;
            font-size:0;
            top:0;
            left:0;
            background:transparent;
            padding:0;
            height:2rem;
            width: 100%;
        }
    }
`
const BtnBox = styled.div`
    margin-top:2rem;
    display:flex;
    justify-content:space-between;
    & button {
        width: calc(50% - 6rem);
        height: 4rem;
        border-radius:1rem;
        font-weight:bold;
        color:${props => props.theme.mainColor};
        background:${props => props.theme.modal.bgColor};
    }
    & .save_btn {
    }
`
function DayMoney() {    
    const navigate = useNavigate();
    const {tripId, keyValue} = useParams();
    const [cost, setCost] = useState('0'); //지출금액
    const [dayTitle, setDayTitle] = useState('');
    const [list, setList] = useState([ //가계부 리스트 
        {schedule: '', price: ''}
    ]);
    
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    const currentId = trips.find(trip => trip.id === tripId); // 로컬스토리지 현재 id

    //가계부 저장 이벤트
    const handleSave = () => {
        const emptyInput = list.some(item => !item.schedule || !item.price);
        if (emptyInput) {
            alert("빈 항목을 입력해주세요!");
            return;
        } else if (!dayTitle) {
            alert("여행일을 입력해주세요!");
            return;
        }
        if (keyValue) {//가계부 수정 저장
            if (trips) {
                const updatedSchedule = trips.map(trip => {
                    if (trip.id === tripId) {
                        return {
                            ...trip,
                            day: {
                                ...trip.day,
                                [keyValue]: {
                                    ...trip.day[keyValue],
                                    totalCost: cost,
                                    dayTitle: dayTitle,
                                    daySchedule: list.map(item => ({
                                        schedule: item.schedule,
                                        price: item.price
                                    }))
                                }
                            }
                        };
                    }
                    return trip;
                })
                localStorage.setItem('trips', JSON.stringify(updatedSchedule));
            }
        } else {
            const updatedTrips = trips.map((trip) => {
                if (trip.id === tripId) {
                    const updatedDay = {
                        totalCost: cost,
                        dayTitle: dayTitle,
                        daySchedule: list.map(item => ({
                            schedule: item.schedule,
                            price: item.price
                        }))
                    }
                    const newDayKey = uuidv4(); //일정별 키값 uuid로 설정
                    return {
                        ...trip,
                        day: {
                            ...trip.day, //기존 일정
                            [newDayKey]: updatedDay //새 일정
                        }
                    };
                }
                return trip;
            });
            localStorage.setItem('trips', JSON.stringify(updatedTrips));
        }
        navigate(-1);
    }

    //가계부 삭제 이벤트
    const deleteDayPage = () => {
        if (keyValue) {
            const confirm = window.confirm('정말 삭제하시겠습니까?');
            if (confirm) {
                const updatedDay = trips.map(trip => {
                    if (trip.id === tripId && trip.day[keyValue]) {
                        const { [keyValue]: deletedDay, ...restOfDays } = trip.day;
                        return {
                            ...trip,
                            day: restOfDays
                        };
                    }
                    return trip
                })
                localStorage.setItem('trips', JSON.stringify(updatedDay))
            }
        }
        navigate(-1);
    }

    //가계부 수정 페이지
    useEffect(() => {                
        if(keyValue) {
            const dayKeys = Object.keys(currentId.day);
            const currentKey = dayKeys.find((dayKey) => dayKey === keyValue);              
            const editSchedule = currentId.day[currentKey];
            if (currentKey) {
                const newList = editSchedule.daySchedule.map(item => ({
                    schedule: item.schedule,
                    price: item.price
                }));
    
                setList(newList);            
            }
            setDayTitle(editSchedule.dayTitle)
        }
    }, []) //처음 렌더링 될 떄만 실행하게 함

    //지출금액 변경시마다 실행
    useEffect(() => {
        // 총 지출금액 계산 함수
        const totalCost = () => {
            let total = 0;
            list.forEach((item) => {
                const priceDeleteComma = item.price.replace(/,/g, ''); // 콤마 제거
                const priceNum = parseFloat(priceDeleteComma); // 숫자로 변환
                if(!isNaN(priceNum)) {
                    total += priceNum;
                }
            });
            return total.toLocaleString();
        }
        setCost(totalCost());
    }, [list])

    //추가하기 버튼 이벤트
    const handleAddList = () => { 
        setList([...list, {schedule: '', price: ''}]);
    }

    //일정 제목 이벤트
    const handleInputTitle = (e) => {
        const value = e.target.value;
        setDayTitle(value)
    }

    //일정 input 이벤트
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newList = [...list]; 
        newList[index][name] = value;
        
        //가격 숫자 콤마 추가
        if (name === 'price') {
            const [integerPart, decimalPart] = value.split('.'); //소수점 구분
            let processedValue = integerPart.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if (decimalPart !== undefined) { //소수점 있을 때
                processedValue += '.' + decimalPart.replace(/\D/g, '');
            }
            newList[index][name] = processedValue;
        }
        setList(newList);
    }

    //일정 엔터 누르면 일정 삭제되는 이벤트 막기
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    //일정 삭제 이벤트
    const handleDeleteList = (index) => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    }

    //총 지출금액 이벤트
    const updatedPrice = (e) => {
        const value = e.target.value;
        setCost(value)
    }

    //form 
    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Wrap>        
            <Header
                subTitle={"일정별 가계부"}
                onClick={() => {navigate(-1)}}
            />
            <DayWrap>
                <input 
                    type="text" 
                    className='day_title'
                    placeholder='여행일을 입력해주세요.✏️'
                    value={dayTitle}
                    onChange={handleInputTitle}
                />
                <MoneyBox onSubmit={onSubmit}>
                    <table>
                        <colgroup>
                            <col style={{width:"70%"}}/>
                            <col style={{width:"30%"}}/>
                        </colgroup>
                        <tbody>
                            {list.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input 
                                            type='text'
                                            placeholder='일정을 입력해주세요.'
                                            name='schedule'
                                            value={item.schedule}
                                            onChange={(e) => handleInputChange(index, e)}
                                            onKeyDown={handleKeyPress}
                                        />
                                    </td>
                                    <td className='price'>
                                        <input 
                                            type='text'
                                            placeholder='가격'
                                            name='price'
                                            value={item.price}
                                            onChange={(e) => handleInputChange(index, e)}
                                            onKeyDown={handleKeyPress}
                                        />
                                        <button 
                                            className='delete'
                                            onClick={() => handleDeleteList(index)}
                                        >
                                            삭제버튼
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className='add_plan'>
                                    <button
                                        onClick={handleAddList}
                                    >
                                        <i/>
                                        추가하기
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Total>
                        <span>총 지출금액 :</span> 
                        <div className="input_wrap">
                            <span>{cost}</span>
                            <input 
                                type='text'
                                value={cost}
                                onChange={updatedPrice}
                                readOnly
                            />
                        </div>
                        <span>{currentId.Checkbox ? currentId.Money : '원'}</span>
                    </Total>
                </MoneyBox>
                <BtnBox>
                    <button 
                        className="close_btn"
                        onClick={deleteDayPage}
                    >
                    {keyValue ? '삭제' : '취소'}
                    </button>
                    <button 
                        className="save_btn" 
                        onClick={handleSave}
                    >
                    저장
                    </button>
                </BtnBox>
            </DayWrap>
        </Wrap>
    )
}

export default DayMoney

