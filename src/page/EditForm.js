import { useNavigate } from 'react-router-dom';
import HomeModal from '../components/HomeModal'
import Header from './../components/Header';
import styled from 'styled-components';

const EditWrap = styled.div`
    min-height: 100vh;
    background:${props => props.theme.modal.bgColor};
`
const ModalWrap = styled.div`
    margin-top:6rem;
`
function EditForm() {
    const navigate = useNavigate();

    return (
        <EditWrap>
            <Header
                subTitle={"여행지 수정"}
                onClick={() => {navigate(-1)}}
            />
            <ModalWrap>
                <HomeModal
                    leftBtn={"삭제"}
                    rightBtn={"수정"}
                    saveForm = {() => {navigate(-1)}}
                />
            </ModalWrap>
        </EditWrap>
    )
}

export default EditForm