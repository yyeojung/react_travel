import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import checkIcon from '../image/icon/check.png'
import {v4 as uuidv4} from 'uuid';//uuid import
//components
import Select from './Select';
import Calendar from './Calendar';

const ModalWrap = styled.form`
    width:100%;
    background:${props => props.theme.modal.bgColor};
    position:fixed;
    border-radius:2rem 2rem 0 0;
    padding:2rem;
    transition:all .3s; /* transition 효과 추가 */
`;
const InputWrap = styled.div`
    display:${props => props.visible ? 'none' : 'block'};
    margin-top:1rem;
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
    const [currentValue, setCurrentValue] = useState(''); //화폐 value 가져오기
    const [visible, setVisible] = useState(false); // 해외여행 토글
    const [period, setPeriod] = useState('');
    const [inputValues, setInputValues] = useState({ //콤마  추가 input
        exchangeRate: '', 
        visibleBudget: '',
        budget: '',
        exchangeWon : ''
    });
    const [formData, setFormData] = useState({ //data 저장 input
        sendTitle: '', 
        sendDate: '',
        sendPeriod: '',
        sendRate : '',
        sendBudget : ''
    });
    const tripData = JSON.parse(localStorage.getItem('trip')) || [];

    //여행지 저장
    const saveForm = () => { //!!!!로컬스테이지 저장부터 해야함
        if ()
    }
    //form 이벤트 막기
    const onSubmit = (e) => { 
        e.preventDefault();
    }

    //datepicker 여행기간
    const travelPeriod = (e) => {
        setPeriod(e.target.value)
    }

    //select 화폐 가져오기
    const getCurrentValue = (value) => { 
        setCurrentValue(value.substring(1));
    }

    //해외여행 체크
    const changeTrip = () => { 
        setVisible(!visible)
    }

    //콤마 추가 이벤트, 환율 계산 이벤트
    const handleInputChange = (e) => { 
        const {name, value} = e.target;
        const [integerPart, decimalPart] = value.split('.'); //소수점 구분
        let processedValue = integerPart.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if (decimalPart !== undefined) { //소수점 있을 때
            processedValue += '.' + decimalPart.replace(/\D/g, '');
        }
        setInputValues({
            ...inputValues,
            [name]: processedValue
        })
    };
    useEffect(() => { // 환율 계산
        setInputValues((prev) => {
            const visibleBudget = parseFloat(prev.visibleBudget.replace(/[^\d.]/g, ''));
            const exchangeRate = parseFloat(prev.exchangeRate.replace(/[^\d.]/g, ''));
    
            if (!isNaN(visibleBudget) && !isNaN(exchangeRate)) {
                const total = visibleBudget * exchangeRate;
                const totalprice = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 소수점 이하 2자리까지 표시하고 쉼표 추가
                return {
                    ...prev,
                    exchangeWon: totalprice
                };
            }    
            return prev;
        });
    }, [inputValues.visibleBudget, inputValues.exchangeRate]); //노란줄 오류가 나와서 찾아봤더니 의존성 배열을 추가하라고 해서 setInputValues 추가함.
    
    useEffect(() => { // 셀렉트 값 변경되면 input value 빈칸으로
        setInputValues(prev => ({
            ...prev,
            exchangeRate: '', 
            visibleBudget: '',
            exchangeWon: ''
        }));
    }, [currentValue]);

    return (
        <ModalWrap onSubmit={onSubmit} style={props.popup}>
            <InputWrap>
                <InputTitle>여행지</InputTitle>
                <Input 
                    type='text'
                    $isfull={true} // 오류가 나와서 $붙임
                    placeholder='여행지를 입력해주세요'
                />
            </InputWrap>
            <InputWrap>
                <InputTitle>날짜</InputTitle>
                    <Calendar
                        setPeriod={setPeriod}
                    />
                <SubWrap>
                    <Input 
                        type='text'
                        value={period}
                        onChange={travelPeriod}
                    />
                    <CheckBox>
                        <Input id='trip' type='checkbox'/>
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
                            name='exchangeRate'
                            value={inputValues.exchangeRate}
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
                        name='visibleBudget'
                        value={inputValues.visibleBudget}
                        onChange={handleInputChange}
                        maxLength={13}
                    />
                    <span>{currentValue}</span>
                </FixTxt>
                <FixTxt $isdisabled={true}>
                    <Input 
                        type='text'
                        $isleft={true}
                        name='exchangeWon'
                        value={inputValues.exchangeWon}
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
                        name='budget'
                        value={inputValues.budget}
                        onChange={handleInputChange}
                        maxLength={13}
                    />
                    <span>원</span>
                </FixTxt>            
            }
            </InputWrap>
            <BtnWrap>
                <Button
                    $isCancel={true}
                    onClick={props.onClick}
                >취소</Button>
                <Button>{props.btnTxt}</Button>
            </BtnWrap>
        </ModalWrap>
    )
}

export default HomeModal