
**Next.js + Keycloak**을 이용한 로그인 프로세스를 세팅  
`config`, `provider`, `middleware` 세 파일로 구성하여 기본 인증 흐름을 구성.

---

## 1. `src/auth/config/keycloak.ts`
Keycloak 인스턴스 초기화, 로그인/로그아웃/토큰 관련 함수 정의.

```ts
import Keycloak from 'keycloak-js';

type KeycloakConfig = { url: string; realm: string; clientId: string; };

const keycloakConfig: KeycloakConfig = {
  url: process.env.NEXT_PUBLIC_AUTH_URL || 'https://auth.hookedsnap.com',
  realm: process.env.NEXT_PUBLIC_AUTH_REALM || 'hookedsnap-admin-dev',
  clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT || 'hookedsnap-admin-app',
};

let keycloak: Keycloak;

if (typeof window !== 'undefined') {
  keycloak = new Keycloak(keycloakConfig);
}

let isInitialized = false;

export const initKeycloak = () => {
  if (!isInitialized && keycloak) {
    isInitialized = true;
    return keycloak
      .init({ onLoad: 'check-sso', checkLoginIframe: false })
      .then(authenticated => authenticated)
      .catch(err => {
        isInitialized = false;
        console.error('Failed to initialize Keycloak', err);
        throw err;
      });
  } else {
    return Promise.resolve(keycloak?.authenticated ?? false);
  }
};

export const login = () => keycloak?.login();
export const logout = () => keycloak?.logout();
export const register = () => keycloak?.register();

export const getToken = async () => {
  if (keycloak?.isTokenExpired()) {
    try {
      await keycloak.updateToken(30);
    } catch (error) {
      console.error('Failed to refresh the token', error);
      keycloak.logout();
      return null;
    }
  }
  return keycloak?.token ?? null;
};

export { keycloak };
```

	•	환경변수 기반 Keycloak 설정
	•	check-sso 모드로 자동 세션 체크
	•	토큰 만료 시 자동 갱신 처리

⸻

## 2. src/auth/provider/KeycloakProvider.tsx

React Context로 인증 상태를 전역에 제공.
```ts
'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { initKeycloak, keycloak, login, logout, register } from '../config/keycloak';

interface User {
  name?: string;
  email?: string;
}

interface KeycloakContextType {
  initialized: boolean;
  authenticated: boolean;
  user?: User;
  login: () => void;
  logout: () => void;
  register: () => void;
}

const defaultContext: KeycloakContextType = {
  initialized: false,
  authenticated: false,
  user: undefined,
  login: () => {},
  logout: () => {},
  register: () => {},
};

const KeycloakContext = createContext<KeycloakContextType>(defaultContext);

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initKeycloak()
        .then((auth) => {
          setAuthenticated(auth);
          if (keycloak && auth) {
            setUser({
              name: keycloak.tokenParsed?.preferred_username,
              email: keycloak.tokenParsed?.email,
            });
          }
          setInitialized(true);
        })
        .catch(err => console.error('Failed to initialize Keycloak', err));
    }
  }, []);

  return (
    <KeycloakContext.Provider value={{ initialized, authenticated, user, login, logout, register }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
```

📌 핵심 포인트
	•	initialized / authenticated 상태 관리
	•	토큰에서 사용자 정보(preferred_username, email) 파싱
	•	Context + Hook으로 인증 상태 접근 용이

⸻

## 3. src/auth/middleware/withAuth.tsx

HOC(High-Order Component)로 컴포넌트를 인증 필요 상태로 감싸기.
```ts
import React, { ComponentType } from 'react';
import { useKeycloak } from '../provider/KeycloakProvider';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const ComponentWithAuth = (props: P) => {
    const { initialized, authenticated, login } = useKeycloak();

    if (!initialized) {
      return <div>Loading...</div>;
    }

    if (!authenticated) {
      return (
        <div>
          <button onClick={login}>Login</button>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
```

	•	초기화 중이면 로딩 표시
	•	미인증 상태면 로그인 버튼 제공
	•	인증 완료 시 원래 컴포넌트 렌더링

⸻

	•	Keycloak JS SDK를 사용하면 SPA 환경에서도 쉽게 OIDC 인증을 구현 가능
	•	Provider 패턴으로 인증 상태를 전역 공유하면 라우트 보호와 UI 제어가 용이
	•	withAuth HOC를 활용하면 컴포넌트를 인증 필수로 손쉽게 감쌀 수 있음
	•	Realm / Client 설정과 redirect URI를 Keycloak 관리자 콘솔에서 일치 시켜야함

---
