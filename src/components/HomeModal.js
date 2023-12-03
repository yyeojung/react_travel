import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import {v4 as uuidv4} from 'uuid';//uuid import
//components
import checkIcon from '../image/icon/check.png'
import Select from './Select';
import Calendar from './Calendar';

const ModalWrap = styled.form`
    width:100%;
    max-width:76.8rem;
    background:${props => props.theme.modal.bgColor};
    position:fixed;
    border-radius:2rem 2rem 0 0;
    padding:2rem;
    transition:all .3s; /* transition 효과 추가 */
`;
const InputWrap = styled.div`
    display:${props => props.visible ? 'none' : 'block'};
    margin-top:1rem;
    
    & input:-webkit-autofill,
    & input:-webkit-autofill:hover,
    & input:-webkit-autofill:focus,
    & input:-webkit-autofill:active {
        -webkit-text-fill-color:${props => props.theme.mainColor};
        -webkit-box-shadow: 0 0 0px 100rem ${props => props.theme.modal.input} inset;
        box-shadow: 0 0 0px 100rem ${props => props.theme.modal.input} inset;
        transition: background-color 5000s ease-in-out 0s;
    }
`;
const SubWrap = styled.div`
    width:calc(100% - 5.6rem);
    margin:1.2rem 0 0 5.6rem;
    input {width:calc(50% - .5rem);}
`
const InputTitle = styled.span`
    color:#6491ff;
    width:5.6rem;
    display:inline-block;
`;
const FixTxt = styled.div`
    display:inline-block;
    width:calc(50% - 3.3rem);
    position:relative;
    input {width:100%; padding-right:4rem;};
    span {
        position:absolute; 
        right:1rem; 
        top:1.5rem;
        color:${props => props.$isdisabled ? props.theme.modal.disabledTxt : props.theme.mainColor};
    }
`;
const Input = styled.input`
    width:${props => (
        props.$isfull 
        ? 'calc(100% - 5.6rem)'
        : 'calc(50% - 3.3rem)')};
    margin-left:${props => (
        props.$isleft 
        ? '1rem'
        : '0')};
    height:4.8rem;
    background:${props => props.disabled ? props.theme.modal.disabled : props.theme.modal.input};
    color:${props => props.disabled ? props.theme.modal.disabledTxt : props.theme.mainColor};
    border:${props => props.theme.modal.inputBorder};
    &:focus {border:.1rem solid #6491ff};
`;
const CheckBox = styled.div`
    display:inline-block;
    vertical-align:middle;
    input {display:none};
`;
const Label = styled.label`
    margin-left:1rem;
    display:inline-block;
    min-height:2rem;
    padding-left:3rem;
    background:url(${props => props.theme.modal.emptyCheck})left center/ 2rem no-repeat;
    ${Input}:checked + & {
        background:url(${checkIcon})left center/ 2rem no-repeat;
    }
    color:${props => props.theme.mainColor};
`;
const Desc = styled.p`
    color:#6491ff;
    font-size:1.2rem;
    margin:.5rem 0 0 5.6rem;
`
const BtnWrap = styled.div`
    margin-top:14rem;
    display: flex;
    justify-content: space-between;
`;
const Button = styled.button`
    width:calc(50% - .5rem);
    height:4.8rem;
    border-radius:1rem;
    font-weight:bold;
    color:${props => props.$isCancel ? '#6491ff' : '#fff'};
    border:${props => props.$isCancel ? '.1rem solid #6491ff' : 'none'};
    background:${props => props.$isCancel ? props => props.theme.modal.bgColor : props => props.theme.modal.btn};
`;

function HomeModal(props) {
    const [currentValue, setCurrentValue] = useState('달러'); //화폐 value 가져오기
    const [visible, setVisible] = useState(false); // 해외여행 토글
    const {tripId} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ //data 저장 input
        Title: '', 
        Date: '',
        Period: '',
        Rate : '',
        Budget : '',
        VisibleBudget : '',
        ExchangeWon: '',
        Checkbox: '',
    });

    //로컬 스토리지 생성
    const trips = JSON.parse(localStorage.getItem('trips')) || [];

    //여행지 수정
    useEffect(() => {
        if(tripId) {
            const selectTrip = trips.find(trip => trip.id === tripId);
            // console.log(selectTrip)
            if (selectTrip) {
                setFormData(prev => ({
                    ...prev,
                    Title: selectTrip.Title,
                    Date: selectTrip.Date,
                    Period: selectTrip.Period,
                    Rate: selectTrip.Rate,
                    Budget: selectTrip.Budget,
                    VisibleBudget: selectTrip.VisibleBudget,
                    Checkbox: selectTrip.Checkbox,
                }));                
                
                setVisible(selectTrip.Checkbox);// 여행지 정보에서 Checkbox 값에 따라 visible 상태를 설정
                setCurrentValue(selectTrip.Money);// 화폐값 저장
            }
        }
    }, [tripId])
    
    //여행지 저장
    const saveForm = () => { 
        const { Title, Period, Rate, Budget, VisibleBudget } = formData;
        
        // 빈값 확인
        if(visible) {
            if (!Title || !Period || !Rate || !VisibleBudget) {
                alert("빈 항목을 모두 입력해주세요!");
                return;
            }
        } else {
            if (!Title || !Period || !Budget) {
                alert("빈 항목을 모두 입력해주세요!");
                return;
            }
        }
        
        const tripData = {
            Title: formData.Title,
            Period: formData.Period,
            Date: formData.Date,
            Budget: formData.Budget,
            Rate : formData.Rate,
            VisibleBudget : formData.VisibleBudget,
            Checkbox : formData.Checkbox,
            Money: currentValue
        }
        if (tripId) { //여행지 수정 저장
            const getTrip = trips.map(trip => {
                if (trip.id === tripId) {
                    return {
                        ...trip,
                        ...tripData
                    };
                }
                return trip;
            });
            localStorage.setItem('trips', JSON.stringify(getTrip));
        } else {
            const newTrip = {
                id: uuidv4(),
                ...tripData
            };
            const updatedTrips = [...trips, newTrip];
            localStorage.setItem('trips', JSON.stringify(updatedTrips));
        }
        //상위 컴포넌트에서 저장, 수정 이벤트
        props.saveForm();

        // 입력된 값들을 빈 칸으로 초기화
        setFormData({
            Title: '',
            Period: '',
            Date: '',
            Budget: '',
            Rate: '',
            VisibleBudget: '',
            Checkbox: '', // Checkbox가 boolean이면 false로 초기화
            Money: ''
        });
        setCurrentValue('달러');
        setVisible(false)
    };

    //여행지 삭제
    const deleteForm = () => {
        if (tripId) {
            const confirm = window.confirm('정말 삭제하시겠습니까?');
            if(confirm) {
                const updateTrip = trips.filter(trip => trip.id !== tripId)
                localStorage.setItem('trips', JSON.stringify(updateTrip));
                navigate('/');
            }
        } else {
            props.onClick();
        }
    }

    //form 이벤트 막기
    const onSubmit = (e) => { 
        e.preventDefault();
    }

    //datepicker value값 저장
    const handleGetDate = (getdate) => {
        setFormData(prev => ({
            ...prev,
            Date: getdate
        }));
        
    }

    //datepicker 여행기간
    const travelPeriod = (e) => {
        setFormData(prev => ({
            ...prev,
            Period: e.target.value
        }));
    }

    //select 화폐 가져오기
    const getCurrentValue = (value) => { 
        setCurrentValue(value.substring(1));
        // setFormData(prev => ({ //select값 변경되면 input 빈값
        //     ...prev,
        //     Rate: '', 
        //     VisibleBudget: '',
        //     ExchangeWon: ''
        // }));
    }

    //해외여행 체크
    const changeTrip = () => { 
        setVisible(!visible)
    }   
    //해외여행 체크값 저장
    const handleCheck = (e) => {
        setFormData(prev => ({
            ...prev,
            Checkbox: e.target.checked
        }))
    }

    //콤마 추가 이벤트, 환율 계산 이벤트
    const handleInputChange = (e) => { 
        const {name, value} = e.target;
        const [integerPart, decimalPart] = value.split('.'); //소수점 구분
        let processedValue = integerPart.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if (decimalPart !== undefined) { //소수점 있을 때
            processedValue += '.' + decimalPart.replace(/\D/g, '');
        }
        setFormData({
            ...formData,
            [name]: processedValue
        })
    };
    useEffect(() => { // 환율 계산
        setFormData((prev) => {
            const VisibleBudget = parseFloat(prev.VisibleBudget.replace(/[^\d.]/g, ''));
            const Rate = parseFloat(prev.Rate.replace(/[^\d.]/g, ''));
    
            if (!isNaN(VisibleBudget) && !isNaN(Rate)) {
                const total = VisibleBudget * Rate;
                const totalprice = total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 소수점 이하 2자리까지 표시하고 쉼표 추가
                return {
                    ...prev,
                    ExchangeWon: totalprice
                };
            }    
            return prev;
        });
    }, [formData.VisibleBudget, formData.Rate]); //노란줄 오류가 나와서 찾아봤더니 의존성 배열을 추가하라고 해서 inputValues 추가함.
    

    return (
        <ModalWrap onSubmit={onSubmit} style={props.popup}>
            <InputWrap>
                <InputTitle>여행지</InputTitle>
                <Input 
                    type='text'
                    $isfull={true} // 오류가 나와서 $붙임
                    placeholder='여행지를 입력해주세요'
                    value={formData.Title} // 입력 값 표시
                    onChange={(e) => setFormData(prevData => ({
                        ...prevData,
                        Title: e.target.value
                    }))} // 입력 값 변경
                />
            </InputWrap>
            <InputWrap>
                <InputTitle>날짜</InputTitle>
                    <Calendar
                        setDate = {handleGetDate}
                        dateValue = {formData.Date}
                        setFormData={setFormData}
                    />
                <SubWrap>
                    <Input 
                        type='text'
                        value={formData.Period}
                        onChange={travelPeriod}
                    />
                    <CheckBox>
                        <Input id='trip' type='checkbox' 
                            checked={formData.Checkbox}
                            onChange={handleCheck}
                        />
                        <Label htmlFor='trip' onClick={changeTrip}>해외여행</Label>
                    </CheckBox>
                </SubWrap>
            </InputWrap>
            {visible && 
                <InputWrap>
                    <InputTitle>환율</InputTitle>
                    <FixTxt>
                        <Input 
                            type='text'
                            name='Rate'
                            value={formData.Rate}
                            onChange={handleInputChange}
                            maxLength={13}
                        />
                        <span>원</span>
                    </FixTxt>
                    <Select
                        $marLeft={true}
                        getCurrentValue={getCurrentValue}
                    />
                    <Desc>환율을 입력해주세요. ex) 1달러 = 1,312원</Desc>
                </InputWrap>
            }
            <InputWrap>
                <InputTitle>총예산</InputTitle>
            {visible ? 
            <>                
                <FixTxt>
                    <Input 
                        type='text'
                        name='VisibleBudget'
                        value={formData.VisibleBudget}
                        onChange={handleInputChange}
                        maxLength={13}
                    />
                    <span>{currentValue}</span>
                </FixTxt>
                <FixTxt $isdisabled={true}>
                    <Input 
                        type='text'
                        $isleft={true}
                        name='ExchangeWon'
                        value={formData.ExchangeWon}
                        disabled
                        onChange={handleInputChange}
                    />
                    <span>원</span>
                </FixTxt>
            </>
            :
                <FixTxt>
                    <Input 
                        type='text'
                        name='Budget'
                        value={formData.Budget}
                        onChange={handleInputChange}
                        maxLength={13}
                    />
                    <span>원</span>
                </FixTxt>            
            }
            </InputWrap>
            <BtnWrap>
                <Button
                    type='button'
                    $isCancel={true}
                    onClick={deleteForm}
                >{props.leftBtn}</Button>
                <Button
                    type='submit'
                    onClick={saveForm}
                >{props.rightBtn}
                </Button>
            </BtnWrap>
        </ModalWrap>
    )
}

export default HomeModal