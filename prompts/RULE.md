# phonevault

### 화면 픽셀
- 1280 X 780
- 반응형 없이, 모든 페이지, 화면은 오직 1280 X 780 태블릿을 가로로 놓고 사용하는 경우만 생각
- 프로토타입이며, 실제 웹사이트라기보다는 모바일 애플리케이션의 생김새와 구조를 가짐.
- 화면은 절대로 스크롤되면 안된다. 이 말인즉슨, 화면의 높이나 너비가 1280 X 780 을 넘어서는 안된다는 뜻.

### Project Description
- 모든 기능과 메뉴에 대하여, '프로토타입' 임에 충실하기 위해서 더미 데이터를 표시하거나, 어떤 상태나 정보를 저장해야 할 경우에, 브라우저 Local Storage 를 이용한다.

### Project Structure
.
├── prompts
│   ├── RULE.md
│   └── TASK.md
├── .gitignore
├── index.html
├── package.json
├── public
│   └── vite.svg
└── src
    ├── App.css
    ├── App.jsx
    ├── assets
    │   ├── NanumGothic-Regular.ttf
    │   └── react.svg
    ├── components
    │   ├── SessionWatcher.jsx
    │   ├── TestButton.jsx
    │   └── TestButton.module.css
    ├── index.css
    ├── main.jsx
    ├── pages
    │   ├── Call.jsx
    │   ├── Call.module.css
    │   ├── Contacts.jsx
    │   ├── Contacts.module.css
    │   ├── Home.jsx
    │   ├── Home.module.css
    │   ├── IncomingAlarm.jsx
    │   ├── IncomingAlarm.module.css
    │   ├── IncomingCall.jsx
    │   ├── IncomingCall.module.css
    │   ├── MainMenu.jsx
    │   ├── MainMenu.module.css
    │   ├── OutgoingCall.jsx
    │   ├── OutgoingCall.module.css
    │   ├── Outing.jsx
    │   ├── Outing.module.css
    │   ├── SettingDetails.jsx
    │   ├── SettingDetails.module.css
    │   ├── SettingsMain.jsx
    │   ├── SettingsMain.module.css
    │   ├── Simulation.jsx
    │   ├── Simulation.module.css
    │   ├── Unlock.jsx
    │   ├── Unlock.module.css
    │   ├── Warning.jsx
    │   └── Warning.module.css
    └── utils
        └── vaultStorage.js
