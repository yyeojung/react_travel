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

export const lightTheme = {
    logo: `${logoLight}`,
    homeBg: `linear-gradient(to bottom, #bddff6 0%, #fcf5ec 100%)`,
    mainColor: '#000',
    settingIcon:`${setting}`,
    arrowIcon: `${arrow}`,
    addBox: {
        bgColor:'rgba(255,255,255,0.2)',
        border: '.1rem solid #fff',
        plusIcon:`${plus}`
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
    }
}
export const darkTheme = {
    logo: `${logoDark}`,
    homeBg: '#02050e',
    mainColor: '#f0f1f2',
    settingIcon:`${settingDark}`,
    arrowIcon: `${arrowDark}`,
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
        btn:`#6f747a`,
    }
}

export const theme = {
    lightTheme,
    darkTheme
}

export default theme;