# 카카오 로그인

- CRA 로 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름.
- Vite 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름.

## 1. 카카오 개발자 등록하기 / 로그인하기

- https://developers.kakao.com/
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 애플리케이션 등록하기

- 상단의 주메뉴에서 `앱` 선택 후 이동
  <img width="1083" height="375" alt="Image" src="https://github.com/user-attachments/assets/a2395374-6444-4eb7-b1b4-36feb37aee80" />

- 내용 작성하기
  <img width="631" height="727" alt="Image" src="https://github.com/user-attachments/assets/701deb54-afcf-4171-824f-7f791ef896b2" />
  <img width="614" height="655" alt="Image" src="https://github.com/user-attachments/assets/772477dc-810d-498a-a3f9-4da3eda22904" />
- 목록 확인하기
  <img width="1260" height="535" alt="Image" src="https://github.com/user-attachments/assets/f0aa673c-b990-4964-8fc9-dd7072e795a8" />
- 비즈 앱 등록하기
  <img width="1535" height="773" alt="Image" src="https://github.com/user-attachments/assets/191234b5-4e6f-4966-9d7b-7d4812a312c4" />
- 동의하기
  <img width="1538" height="732" alt="Image" src="https://github.com/user-attachments/assets/13248e49-bd92-402b-867b-7866b9b3b54c" />
- 비즈 앱 전환하기
  <img width="1529" height="750" alt="Image" src="https://github.com/user-attachments/assets/c98f538b-a787-4b54-8727-2f54a565797a" />
  <img width="1186" height="727" alt="Image" src="https://github.com/user-attachments/assets/ccdb1f70-83fe-4c96-8f27-0b37f0d3cf1e" />
- 복사하기
  <img width="684" height="351" alt="Image" src="https://github.com/user-attachments/assets/bbe07e87-d8e0-4214-873d-688b3df09b63" />

## 3. Rest API 및 JS 키 관리

- `외부노출 금지`
- / 폴더에 `.env` 파일 생성
- `생성되는 파일 위치 절대 주의`
  <img width="197" height="284" alt="Image" src="https://github.com/user-attachments/assets/718223c9-1521-454e-8040-933d4c2faeeb" />

### 3.1. 접두어는 `REACT_APP_` 으로 `약속`됨.

- 예) Next.js 프로젝트에서는 `NEXT_APP_` 으로 약속됨.
- 예) Vite 프로젝트에서는 `VITE_` 로 약속됨.
- ...\_APP 뒤에는 마음대로 해도됨.

```txt
REACT_APP_KKO_LOGIN_REST_API_KEY=본인키
REACT_APP_KKO_LOGIN_JS_API_KEY=본인키
```

### 3.2. `.gitignore` 확인

- `.env` 내용으로 작성 확인
  <img width="284" height="517" alt="Image" src="https://github.com/user-attachments/assets/8dd5ae05-b36b-43d3-8873-6d033d3f1921" />

## 4. 카카오 로그인 플랫폼 설정하기

<img width="917" height="794" alt="Image" src="https://github.com/user-attachments/assets/51fd32a0-0585-48f1-a064-7a9d6fdbe214" />

### 4.1. 리다이랙트 URL 설정

- http://localhost:3000 : CRA 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인
  <img width="675" height="516" alt="Image" src="https://github.com/user-attachments/assets/dfab61fd-c124-4b04-b5d5-d6e523edc5ab" />
  <img width="723" height="262" alt="Image" src="https://github.com/user-attachments/assets/fb592316-2cf6-4553-a254-211fb5c1856b" />

## 5. 동의 항목 설정

<img width="1474" height="602" alt="Image" src="https://github.com/user-attachments/assets/51bbb4db-db38-4e08-b186-60ad15e57b60" />
<img width="621" height="734" alt="Image" src="https://github.com/user-attachments/assets/992a9763-5a70-4098-87b9-0ff5ce570a3d" />
<img width="1422" height="516" alt="Image" src="https://github.com/user-attachments/assets/67a9312a-d62c-48a1-8dbb-af76a3635cef" />

## 6. 카카오 로그인 구현

- /src/kko 폴더 생성
- /src/kko/kkoapi.js 생성

### 6.1. 1단계

```js
// git 에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;
// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";
// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2. 2단계 : access Token 활용

- 정보 호출

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체 코드 (`추후 axios 로 변경 권장`)

```js
// git 에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";

// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.4. 코드 반영

- /src/pages/LoginPage.jsx 생성

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";

function LoginPage() {
  // js 자리
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  console.log(kkoLoginUrl);
  // jsx 자리
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={kkoLoginUrl}>카카오 로그인</Link>
    </div>
  );
}

export default LoginPage;
```

- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 파일 생성

```jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

#### 6.4.1. Router 셋팅

- /src/App.js

```js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="member/kko" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. Recoil 활용해 보기

- /src/atoms/kkologinAton.js 파일생성

```js
const { atom } = require("recoil");

export const KKOLgoinAtom = atom({
  key: "KKOLgoinAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
```

## 8. 로그아웃 처리

```jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../../atoms/kkoLoginAtom";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useRecoilState(KKOLoginAtom);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo({
      id: info.id,
      nickname: info.kakao_account.profile.nickname,
      thumbnail_image_url: info.kakao_account.profile.thumbnail_image_url,
      email: info.kakao_account.email,
    });
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.id) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo.nickname}</div>
      <div>이메일 : {userInfo.email}</div>
      <div>
        <img src={userInfo.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

## 9. 로그인 없이 페이지 접근시 처리

- 강재로 navigate("/login")
- 조건문으로 안내메시지 및 버턴으로 이동권장
