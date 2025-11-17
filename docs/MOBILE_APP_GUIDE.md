# UniPath 모바일 앱 개발 가이드

## 📱 개요

UniPath의 모바일 앱은 React Native + Expo를 사용하여 iOS/Android 크로스 플랫폼으로 개발할 수 있습니다.

## 🚀 프로젝트 초기 설정

### 1. Expo 프로젝트 생성

```bash
# 새 디렉토리 생성
mkdir unipath-mobile
cd unipath-mobile

# Expo 프로젝트 초기화
npx create-expo-app . --template blank-typescript

# 의존성 설치
npm install
```

### 2. 필수 라이브러리 설치

```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-paper react-native-vector-icons

# State Management
npm install @tanstack/react-query zustand

# Supabase (백엔드 연동)
npm install @supabase/supabase-js
npm install @react-native-async-storage/async-storage
npm install react-native-url-polyfill

# WebRTC (화상 수업)
npm install react-native-webrtc

# 환경 변수
npm install react-native-dotenv
```

## 📂 프로젝트 구조

```
unipath-mobile/
├── App.tsx                 # 앱 진입점
├── app.json               # Expo 설정
├── src/
│   ├── navigation/        # 네비게이션 설정
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/           # 화면 컴포넌트
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── student/
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── ScheduleScreen.tsx
│   │   │   └── AIConsultingScreen.tsx
│   │   ├── tutor/
│   │   │   └── TutorDashboardScreen.tsx
│   │   └── common/
│   │       └── VideoClassroomScreen.tsx
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── services/          # API 및 서비스
│   │   ├── supabase.ts
│   │   ├── webrtc.ts
│   │   └── api.ts
│   ├── hooks/             # Custom Hooks
│   │   ├── useAuth.ts
│   │   └── useWebRTC.ts
│   ├── store/             # 전역 상태 관리
│   │   └── authStore.ts
│   ├── types/             # TypeScript 타입
│   │   └── index.ts
│   └── utils/             # 유틸리티 함수
│       └── helpers.ts
└── assets/                # 이미지, 폰트 등
```

## 🔧 핵심 화면 구현

### 1. 로그인 화면 (LoginScreen.tsx)

```typescript
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../services/supabase';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      // 로그인 성공 - 자동으로 네비게이션 처리됨
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">UniPath 로그인</Text>

      <TextInput
        label="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      >
        로그인
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
      >
        회원가입
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});
```

### 2. 대시보드 화면 (DashboardScreen.tsx)

```typescript
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { supabase } from '../services/supabase';

export const DashboardScreen = ({ navigation }) => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('status', 'scheduled')
      .order('scheduled_at', { ascending: true })
      .limit(5);

    setUpcomingSessions(data || []);
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium">내 대시보드</Text>

      {/* 다가오는 수업 */}
      <Card style={styles.card}>
        <Card.Title title="다가오는 수업" />
        <Card.Content>
          {upcomingSessions.map((session) => (
            <View key={session.id} style={styles.sessionItem}>
              <Text>{session.subject}</Text>
              <Text variant="bodySmall">
                {new Date(session.scheduled_at).toLocaleString('ko-KR')}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* AI 입시 컨설팅 */}
      <Card style={styles.card}>
        <Card.Title title="AI 입시 컨설팅" />
        <Card.Content>
          <Text>맞춤형 대학 추천을 받아보세요</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('AIConsulting')}>
            시작하기
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  sessionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
```

### 3. 화상 수업 화면 (VideoClassroomScreen.tsx)

```typescript
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import { IconButton, FAB } from 'react-native-paper';
import { useWebRTC } from '../hooks/useWebRTC';

export const VideoClassroomScreen = ({ route }) => {
  const { sessionId } = route.params;
  const { localStream, remoteStream, toggleMic, toggleCamera } = useWebRTC(sessionId);

  return (
    <View style={styles.container}>
      {/* 원격 비디오 (전체 화면) */}
      {remoteStream && (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={styles.remoteVideo}
        />
      )}

      {/* 로컬 비디오 (PIP) */}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.localVideo}
        />
      )}

      {/* 컨트롤 바 */}
      <View style={styles.controls}>
        <IconButton icon="microphone" onPress={toggleMic} />
        <IconButton icon="video" onPress={toggleCamera} />
        <FAB
          icon="phone-hangup"
          style={styles.hangup}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  remoteVideo: {
    flex: 1,
  },
  localVideo: {
    position: 'absolute',
    width: 120,
    height: 160,
    top: 20,
    right: 20,
    borderRadius: 8,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  hangup: {
    backgroundColor: '#f44336',
  },
});
```

## 🔑 환경 변수 설정

`.env` 파일 생성:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_OPENAI_API_KEY=your-openai-key
```

## 📦 빌드 및 배포

### 개발 빌드

```bash
# iOS
expo run:ios

# Android
expo run:android
```

### 프로덕션 빌드

```bash
# EAS Build 설치
npm install -g eas-cli

# EAS 로그인
eas login

# 빌드 설정
eas build:configure

# iOS 빌드
eas build --platform ios

# Android 빌드
eas build --platform android
```

### 앱 스토어 배포

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

## 📱 주요 기능 구현 팁

### 1. Push 알림

```bash
npm install expo-notifications
```

### 2. 카메라 및 갤러리 접근

```bash
npm install expo-image-picker
```

### 3. 파일 다운로드

```bash
npm install expo-file-system
```

### 4. 결제 (TossPayments)

```bash
npm install react-native-webview
# WebView를 통해 TossPayments 위젯 표시
```

## 🎯 다음 단계

1. ✅ 프로젝트 초기 설정
2. ✅ 로그인/회원가입 화면
3. ✅ 대시보드 구현
4. → 화상 수업 기능
5. → AI 컨설팅 화면
6. → Push 알림 설정
7. → 앱 스토어 배포

## 📚 참고 자료

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Supabase React Native](https://supabase.com/docs/guides/getting-started/quickstarts/react-native)
- [React Native WebRTC](https://github.com/react-native-webrtc/react-native-webrtc)

---

**작성일**: 2025-11-17
**버전**: 1.0.0
