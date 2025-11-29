# ISSUES

> You Should Obey /prompts/RULE.md

> 고정시간, 자율모드 등 로직에 대해서는 
/src/components/TestButton.jsx,
/src/components/SessionWatcher.jsx,
/src/pages/Home.jsx,
/src/pages/SettingDetails.jsx,
/src/pages/Simulation.jsx,
/src/pages/Unlock.jsx,
/src/utils/vaultStorage.js
등 을 참고하라.

- Home.jsx
  - 고정시간 모드에서, 홈에서 “보관하기” 클릭하면, 여전히 아래로 조금 넘침.
  - 홈에서 보관하기 버튼 위치를 한 단계 위로 올리기 (현재 위치가 어색함).
  - 꺼내기 상태일 경우, Home 화면 클릭 안되고, 보관하기 버튼만 클릭 가능하게 수정. 
- Simulation.jsx
  - 버튼이 네개인데, 많아서 아래로 넘침, 스크롤 필요
- Warning.jsx
  - 지금 보관하기 누르면 다음 액션들 (보관 확인중, 보관 확인 됨) 에 대해서 화면이 아래로 넘침 : 수정 필요
- SettingDetails.jsx
  - 자율시간 모드 -> 고정시간 모드 변경 시에, 로컬 스토리지의 고정시간 남은 시간을 고정 시간 기본 설정값, 또는 고정 시간 별도 설정 값으로 초기화 해야함.