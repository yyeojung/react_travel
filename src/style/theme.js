import logoLight from '../image/logo.png';
import logoDark from '../image/logo_dark.png';
import setting from '../image/icon/setting.png';
import settingDark from '../image/icon/setting_dark.png';
import arrow from '../image/icon/arrow.png';
import arrowDark from '../image/icon/arrow_dark.png';
import plus from '../image/icon/plus.png';
import plusDark from '../image/icon/plus_dark.png';
import emptyCheck from '../image/icon/emptyCheck.png';
import emptyCheckDark from '../image/icon/emptyCheck_dark.png';
import selectArrow from '../image/icon/selectArrow.png';
import selectArrowDark from '../image/icon/selectArrow_dark.png';
import travelEdit from '../image/icon/travelEdit.png';
import travelEditDark from '../image/icon/travelEdit_dark.png';
import travelPlus from '../image/icon/travelPlus.png';
import travelPlusDark from '../image/icon/travelPlus_dark.png';
import edit from '../image/icon/edit.png';
import editDark from '../image/icon/edit_dark.png';
import dayPlusIcon from '../image/icon/dayMoneyPlus.png';
import dayPlusIconDark from '../image/icon/dayMoneyPlus_dark.png';
import trashIcon from '../image/icon/trash.png';
import trashIconDark from '../image/icon/trash_dark.png';

export const lightTheme = {
    logo: `${logoLight}`,
    homeBg: `linear-gradient(to bottom, #bddff6 0%, #fcf5ec 100%)`,
    mainColor: '#000',
    settingIcon:`${setting}`,
    arrowIcon: `${arrow}`,
    header:`#fff`,
    subPage: {
        bgColor:'#fff',
        divideLine:'#d7d8e9',
        detailBg:'#e7eaf3',
        editImg: `${edit}`
    },
    travelList: {
        btnColor: '#fff',
        boxColor: '#fff',
        boxBorder: 'none',
        editColor: '#bddff6',
        toggleBg: '#d9d9d9',
        emphasis: '#004dff',
        editIcon: `${travelEdit}`,
        plusIcon: `${travelPlus}`
    },
    setting: {
        darkBorder:'#8a8b8e',
        darkBg:'rgba(0,0,0,0.1)'
    },
    addBox: {
        bgColor:'rgba(255,255,255,0.2)',
        border: '.1rem solid #fff',
        plusIcon:`${plus}`,
    },
    modal: {
        bgColor:`#fff`,
        input:'#fff',
        inputBorder:`.1rem solid #d7dde9`,
        emptyCheck:`${emptyCheck}`,
        selectArrow:`${selectArrow}`,
        disabled:`#f7f7fa`,
        disabledBorder:`#d7d8e9`,
        disabledTxt:`#a7afb7`,
        btn:`#6491ff`,
    },
    day: {
        plusIcon: `${dayPlusIcon}`,
        trashIcon: `${trashIcon}`
    },
    datepicker: {
        dateShadow:`0 1px 6px 0 rgba(0, 0, 0, 0.2)`,
        hover:'#f2f2f3',
    }
}
export const darkTheme = {
    logo: `${logoDark}`,
    homeBg: '#02050e',
    mainColor: '#f0f1f2',
    settingIcon:`${settingDark}`,
    arrowIcon: `${arrowDark}`,
    header:`#282929`,
    subPage: {
        bgColor:'#02050e',
        divideLine:'#4d5158',
        detailBg:'#282929',
        editImg: `${editDark}`
    },
    travelList: {
        btnColor: '#f0f1f2',
        boxColor: '#282929',
        boxBorder: '.1rem solid #4d5158',
        editColor: '#f0f1f2',
        toggleBg: 'rgba(217, 217, 217, 0.3);',
        emphasis: '#6491ff',
        editIcon: `${travelEditDark}`,
        plusIcon: `${travelPlusDark}`
    },
    setting: {
        darkBorder:'.1rem solid #4d5158',
        darkBg:'#282929'
    },
    addBox: {
        bgColor:'#282929',
        border: '.1rem solid #4d5158',
        plusIcon:`${plusDark}`
    },
    modal: {
        bgColor:`#303234`,
        input:'#3f4042',
        inputBorder:`.1rem solid #4d5158`,
        emptyCheck:`${emptyCheckDark}`,
        selectArrow:`${selectArrowDark}`,
        disabled:`#393a3c`,
        disabledBorder:`#4d5158`,
        disabledTxt:`#656b71`,
        btn:`#6f747a`
    },
    day: {
        plusIcon: `${dayPlusIconDark}`,
        trashIcon: `${trashIconDark}`
    },
    datepicker: {
        dateShadow:`0 1px 6px 0 rgba(0, 0, 0, 0.1)`,
        hover:'#282929'
    }
}

export const theme = {
    lightTheme,
    darkTheme
}

export default theme;