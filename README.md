# my-app (Expo React Native 프로젝트)

## 프로젝트 소개
이 프로젝트는 Expo 기반의 React Native 앱입니다. 위치 권한, 카메라 접근 등 다양한 디바이스 기능을 활용할 수 있도록 초기 세팅되어 있습니다.

---

## 폴더 구조
```
my-app/
  App.js                # 앱의 진입점
  index.js              # 엔트리포인트
  app.json              # Expo 설정 파일
  package.json          # 프로젝트 의존성 및 스크립트
  assets/               # 이미지, 폰트 등 정적 파일
  src/
    components/         # 재사용 가능한 UI 컴포넌트
    screens/            # 각 화면(페이지) 컴포넌트
    store/              # 상태관리 관련 코드
  node_modules/         # 설치된 라이브러리
  .gitignore            # Git 관리 제외 파일 목록
  README.md             # 프로젝트 설명 파일(본 파일)
```

---

## 주요 명령어
| 명령어                | 설명                       |
|----------------------|----------------------------|
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
- **expo**: Expo 프레임워크
- **react, react-native**: 리액트 네이티브 핵심
- **@react-navigation/native, native-stack, bottom-tabs**: 화면 이동(네비게이션)
- **@reduxjs/toolkit, react-redux**: 상태 관리
- **axios**: API 통신
- **expo-location**: 위치 권한 및 위치 정보
- **expo-camera**: 카메라 접근
- **expo-image-picker**: 갤러리/이미지 선택
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