# frontend (Expo React Native 프로젝트)

## 프로젝트 소개
이 프로젝트는 Expo 기반의 React Native 앱으로, 박물관 작품 정보 업로드, 영상 생성, 위치 기반 서비스, 카메라 촬영 등 다양한 기능을 제공합니다. 상태 관리는 Redux, 화면 이동은 React Navigation을 사용하며, Expo의 다양한 디바이스 API를 적극 활용합니다.

---

## 폴더 구조
```
frontend/
  App.js                # 앱의 진입점(최상위 네비게이션 및 Provider)
  index.js              # 엔트리포인트
  app.json              # Expo 설정 파일
  package.json          # 프로젝트 의존성 및 스크립트
  yarn.lock             # 의존성 버전 고정(lock 파일)
  assets/               # 이미지, 폰트, 아이콘 등 정적 리소스
    backgrounds/        # 배경 이미지
    logos/              # 앱/서비스 로고
    icons/              # 각종 아이콘
    fonts/              # 커스텀 폰트
    Onboarding/         # 온보딩 관련 이미지
    Demo/               # 데모용 이미지
    splash/             # 스플래시 이미지
  src/
    api/                # API 통신 모듈(현재 비어 있음)
    components/         # 재사용 가능한 UI 컴포넌트
      Home/             # 홈/박물관 관련 컴포넌트
      Library/          # 라이브러리(영상/작품) 관련 컴포넌트
      Onboarding/       # 온보딩 관련 컴포넌트
      photo_upload/     # 사진 업로드 관련 컴포넌트
      Profile/          # 프로필 관련 컴포넌트
      PlayerControls.js # 플레이어 컨트롤러
      ArtworkInfoPanel.js # 작품 정보 패널
    config/             # 환경설정(현재 비어 있음)
    constants/          # 상수 정의(현재 비어 있음)
    context/            # React Context(현재 비어 있음)
    hooks/              # 커스텀 훅(현재 비어 있음)
    navigation/         # 네비게이션 관련(탭 등)
      MainTabs.js       # 하단 탭 네비게이터
    screens/            # 각 화면(페이지) 컴포넌트
      Home/             # 홈/박물관/온보딩/카메라/로딩 등
      Library/          # 라이브러리(영상 상세 등)
      Profile/          # 프로필 화면
      LoginScreen.js    # 로그인 화면
    services/           # 서비스/비즈니스 로직(현재 비어 있음)
    store/              # Redux 상태관리
      store.js          # Redux 스토어 설정
      photoSlice.js     # 사진 관련 상태
      authSlice.js      # 인증 관련 상태
    utils/              # 유틸리티 함수(현재 비어 있음)
  node_modules/         # 설치된 라이브러리
  .gitignore            # Git 관리 제외 파일 목록
  README.md             # 프로젝트 설명 파일(본 파일)
```

---

## 주요 기능
- 박물관 선택 및 위치 기반 안내
- 사진 촬영 및 업로드, 크롭, 삭제
- Google Vision OCR(예정)
- 영상 생성 및 상세 정보 확인
- 온보딩, 로그인, 프로필 관리
- 상태 관리(Redux), 네비게이션(React Navigation)
- Expo 기반의 카메라, 위치, 이미지 등 디바이스 API 활용

---

## 주요 명령어
| 명령어                | 설명                       |
|----------------------|----------------------------|
| npm install          | 의존성 설치                |
| npm start            | Expo 개발 서버 실행        |
| npx expo start       | Expo 개발 서버 실행 (공식 권장, 전역 설치 불필요) |
| npm run android      | 안드로이드 에뮬레이터 실행 |
| npm run ios          | iOS 시뮬레이터 실행        |
| npm run web          | 웹 브라우저에서 실행       |

> **참고:**
> - `npm start`는 package.json의 start 스크립트(`expo start`)를 실행합니다.
> - `npx expo start`와 `npm start` 모두 동일하게 Expo 개발 서버를 실행합니다.
> - expo CLI가 전역에 설치되어 있지 않아도 `npx expo start`로 실행할 수 있습니다.

---

## 설치된 주요 라이브러리
- **expo**: Expo 프레임워크 및 디바이스 API
- **react, react-native**: 리액트 네이티브 핵심
- **@react-navigation/native, native-stack, bottom-tabs**: 화면 이동(네비게이션)
- **@reduxjs/toolkit, react-redux**: 상태 관리
- **axios**: API 통신
- **expo-location**: 위치 권한 및 위치 정보
- **expo-camera**: 카메라 접근
- **expo-image-picker**: 갤러리/이미지 선택
- **expo-blur**: 블러 효과
- **react-native-reanimated**: 애니메이션
- **react-native-safe-area-context, react-native-screens**: 네비게이션 및 안전 영역 지원

---

## 권한 설정(app.json)
Android에서 위치, 카메라 등 권한을 사용하려면 app.json에 아래와 같이 추가해야 합니다:
```json
{
  "expo": {
    ...
    "android": {
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ]
    }
  }
}
```

---

## 개발 시작 방법
1. 의존성 설치
   ```bash
   npm install
   ```
2. Expo 개발 서버 실행
   ```bash
   npm start
   # 또는
   npx expo start
   ```
3. QR코드를 Expo Go 앱(모바일)으로 스캔하거나, 에뮬레이터/웹에서 실행

---

## 참고
- 폴더 구조, 코드 스타일, 추가 라이브러리 등은 프로젝트 성격에 맞게 자유롭게 확장/수정 가능합니다.
- 궁금한 점이나 개선할 점이 있으면 README.md에 추가로 기록해 주세요. 