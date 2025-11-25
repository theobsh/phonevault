import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import MainMenu from "./pages/MainMenu.jsx";
import Contacts from "./pages/Contacts.jsx";
import SettingsMain from "./pages/SettingsMain.jsx";
import SettingDetails from "./pages/SettingDetails.jsx";
import Unlock from "./pages/Unlock.jsx";
import IncomingCall from "./pages/IncomingCall.jsx";
import IncomingAlarm from "./pages/IncomingAlarm.jsx";
import OutgoingCall from "./pages/OutgoingCall.jsx";
import Call from "./pages/Call.jsx";

function App() {

  const location = useLocation();

  return (
    <>
      <div className="App">
        {(location.pathname !== "/") && <Header />}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/menu' element={<MainMenu/>} />
          <Route path='/contacts' element={<Contacts/>} />
          <Route path='/settings' element={<SettingsMain/>} />
          <Route path='/settings/:category' element={<SettingDetails/>} />
          <Route path='/unlock' element={<Unlock/>} />
          <Route path='/incoming-call' element={<IncomingCall/>} />
          <Route path='/incoming-alarm' element={<IncomingAlarm/>} />
          <Route path='/outgoing-call' element={<OutgoingCall/>} />
          <Route path='/call' element={<Call/>} />
        </Routes>
      </div>
    </>
    )
  }

export default App