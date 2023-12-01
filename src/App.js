import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { darkTheme, lightTheme } from './style/theme';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
//page
import Home from './page/Home';
import Setting from "./page/Setting";
import EditForm from "./page/EditForm";
import DetailTrip from "./page/DetailTrip";
import DayMoney from "./page/DayMoney";

const Button = styled.button`
    position:absolute;
    top:0;
    right:0;
    border:1px solid red;
`

function App() {
    const [theme, setTheme] = useState(true);
    
    const lightMode = () => {
      setTheme(true);
    }
    const darkMode = () => {
      setTheme(false);
    }

    return (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>    
            <div className="App">
                <Router basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/detail/:tripId" element={<DetailTrip/>}></Route>
                        <Route path="/day" element={<DayMoney/>}></Route>
                        <Route path="/setting" element={<Setting lightMode={lightMode} darkMode={darkMode}/>}></Route>
                        <Route path="/trip/:tripId" element={<EditForm/>}></Route>
                    </Routes>
                </Router>    
                <Button onClick={darkMode}>dark</Button>        
                <Button onClick={lightMode} style={{right:"50px"}}>light</Button>        
            </div>
        </ThemeProvider>
    );
}

export default App;
