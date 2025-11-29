import './App.css'
import {Route, Routes} from "react-router-dom";
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
import Simulation from "./pages/Simulation.jsx";
import Outing from "./pages/Outing.jsx";
import TestButton from "./components/TestButton.jsx";
import Warning from "./pages/Warning.jsx";
import SessionWatcher from "./components/SessionWatcher.jsx";

function App() {

  return (
    <>
      <div className="App">
        <TestButton />
        <SessionWatcher />
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
          <Route path='/outing' element={<Outing/>} />
          <Route path='/simulation' element={<Simulation/>} />
          <Route path='/warning' element={<Warning/>} />
        </Routes>
      </div>
    </>
    )
  }

export default App
