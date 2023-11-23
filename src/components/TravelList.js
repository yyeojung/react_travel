import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const ListWrap = styled.div`
    margin-top:6rem;
    position:relative;
    & ul {
        padding-top:3rem;
    }
    & ul li ~ li {
        margin-top: 2rem;
    }
`;
const List = styled.li`
    width:100%;
    background:${props => props.theme.travelList.boxColor};
    color: ${props => props.theme.mainColor};
    border: ${props => props.theme.travelList.boxBorder};
    border-radius:1.5rem;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
    padding:2rem;
    position:relative;
    & p { //총지출
        text-align:right;
        margin-top:6rem;
        span {
            color:${props => props.theme.travelList.emphasis};
            font-weight:bold;
        }
    }
`;
const Edit = styled.button`
    display:block;
    width:2rem;
    height:2rem;
    background:url(${props => props.theme.travelList.editIcon})center center/100% no-repeat;
    position:absolute;
    top:1rem;
    right:1rem;
`;
const Title = styled.h3`
    font-size:1.6rem;
`;
const Date = styled.span`
    margin-top:1rem;
    display:inline-block;
`;
const AddBtn = styled.button`
    color:${props => props.theme.travelList.btnColor};
    position:absolute;
    right:0;
    &::before {
        display:inline-block;
        content:"";
        clear:both;
        width:1.6rem;
        height:1.6rem;
        vertical-align:middle;
        margin:0 1rem .3rem 0;
        background:url(${props => props.theme.travelList.plusIcon})center center/ 100% no-repeat;
    }
`
const Country = styled.div`
    position:absolute;
    top:1rem;
    right:4rem;
    & input {
        display:none
    }
    & label {
        display:inline-block;
        cursor: pointer;
        width:3.2rem;
        height:1.8rem;
        border-radius:.9rem;
        background:${props => props.theme.travelList.toggleBg};
    }
    & label::before {
        display:inline-block;
        clear:both;
        content:"";
        margin:.2rem;
        width:1.4rem;
        transition:all .3s;
        height:1.4rem;
        border-radius:50%;
        background:${props => props.theme.travelList.btnColor};
    }
    & input:checked + label {
        background:rgba(100, 145, 255, 0.4);
    } 
    & input:checked + label::before {
        background:#6491ff;
        margin-left:1.6rem;
    } 
`
function TravelList(props) {
    const navigate = useNavigate();
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    // trips를 날짜(Date) 기준으로 내림차순으로 정렬
    const tripDate = (dateString) => {
        const startDate = dateString.split(' - ')[0].replace(/\./g, ''); // "YYYY.MM.DD"에서 앞의 날짜 추출하고 점 제거
        return parseInt(startDate); // 숫자로 변환하여 반환
    };
    
    const sortedTrips = trips.sort((a, b) => {
        const startDateA = tripDate(a.Date);
        const startDateB = tripDate(b.Date);
        return startDateB - startDateA;
    });

    const navigateDetail = useCallback(
        (tripId) => navigate('/trip/' + tripId), [navigate]
    )
    return (
        <ListWrap>
            <AddBtn onClick={props.onClick}>추가하기</AddBtn>
            <ul>
                {sortedTrips.map((trip) => (
                    <List
                        key={trip.id}    
                    >
                        {trip.Checkbox &&
                            <Country>
                                <input type="checkbox" id={trip.id} />
                                <label htmlFor={trip.id}></label>
                            </Country>                            
                        }
                        <Edit 
                            onClick={() => navigateDetail(trip.id)}
                        /> 
                        <div>
                            <Title>{trip.Title}</Title>
                            <Date>{trip.Date}<span>({trip.Period})</span></Date>
                        </div>
                        <p>총지출 : <span>13,000,000원</span></p>
                    </List>
                ))}
            </ul>
        </ListWrap>
    )
}

export default TravelList