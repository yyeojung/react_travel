//datepicker
import { ko } from "date-fns/esm/locale";
import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import icon from '../image/icon/datepicker.png';

//같은 속성이 반복되서 변수 선언함
const bgColor = (props) => props.theme.modal.input;
const txtColor = (props) => props.theme.mainColor;
const borderColor = (props) => props.theme.modal.inputBorder;

const DatePickerWrap = styled.div`//datepicker 스타일링을 위해 추가!
    position:relative;
    width:calc(100% - 5.6rem);
    display:inline-block;
    .react-datepicker-wrapper {width:100%}
    .react-datepicker__input-container::before { //input에 적용하는 건 안되서(대체요소때문) 상위 객체에 아이콘 적용
        display:block; content:""; clear: both;
        position:absolute;
        top: 1.5rem;
        right: 1rem;
        width:2rem;
        height:2rem;
        background:url(${icon})center center/2rem no-repeat;
    }
    button.example-custom-input { //datepicker input창
        width:100%;
        height: 4.8rem;
        text-align:left;
        padding:1rem;
        border-radius:1rem;
        background:${bgColor};
        color:${txtColor};
        border:${borderColor};
        &:focus {border:.1rem solid #6491ff};
    }
    .react-datepicker-popper[data-placement^=bottom] {padding-top:0}
    .react-datepicker__triangle {display:none;}
    .react-datepicker {
        border-radius:1rem;
        background:${bgColor};
        color:${txtColor};
        border:${borderColor};
        font-family: "NanumGothic";
        font-size: 1.2rem;
        box-shadow: ${props => props.theme.datepicker.dateShadow};
    }
    .react-datepicker__navigation-icon::before {
        height:.6rem;
        width:.6rem;
        border-width:.2rem .2rem 0 0;
        top:1.1rem;
    }
    .react-datepicker__current-month {
        font-size:1.3rem;
        line-height:4rem;
        border-bottom:${borderColor};
        color:${txtColor};
    }
    .react-datepicker__header {
        background:${bgColor};
        color:${txtColor};
        border:none;
        border-radius:1rem;
        padding:0;
    }
    .react-datepicker__day-names {
        margin-bottom:-.6rem;
    }
    .react-datepicker__day-name,.react-datepicker__day  {
        width:3rem;
        line-height:3rem;
        color:${txtColor};
    }
    .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {
        background:rgb(100,145,255,0.5);
    }
    .react-datepicker__day--keyboard-selected, .react-datepicker__day--range-end, .react-datepicker__day--range-start  {
        background:#6491ff;
    }
    .react-datepicker__day:hover  {
        background:${props => props.theme.datepicker.hover};
    }
    .react-datepicker__day-name {
        font-weight:bold;
    }
`;

function Calendar(props) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
          {value}
        </button>
      ));
    
    const handleDateChange = (dates) => {
        setDateRange(dates);
        const period = calDate(dates);
            if (period) {
                props.setPeriod(period);
        }
    }
    const calDate = (dates) => {
        if (dates[0] && dates[1]) {
            const diffTime = dates[1].getTime() - dates[0].getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const diffNights = diffDays;

            return `${diffNights}박 ${diffDays + 1}일`
        }
    }

    return (
        //datepicker 스타일링을 위해 추가!
        <DatePickerWrap>        
            <DatePicker  
                locale={ko}
                dateFormat='yyyy.MM.dd'
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                customInput={<ExampleCustomInput />}
                shouldCloseOnOutsideClick 
                placeholderText='출발일, 도착일을 설정해주세요.'
            />
        </DatePickerWrap>
    )
}

export default Calendar