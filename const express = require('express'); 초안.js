const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;

const app = express();

// 클라이언트 ID 및 비밀키를 설정합니다.
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const NAVER_CLIENT_ID = 'YOUR_NAVER_CLIENT_ID';
const NAVER_CLIENT_SECRET = 'YOUR_NAVER_CLIENT_SECRET';

// Passport 설정
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback' // 콜백 URL 설정
    },
    (accessToken, refreshToken, profile, done) => {
      // 구글 인증 처리
      // 필요한 작업을 수행하고 사용자 정보를 저장하거나 콜백을 호출하여 다음 단계로 진행합니다.
    }
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: NAVER_CLIENT_ID,
      clientSecret: NAVER_CLIENT_SECRET,
      callbackURL: '/auth/naver/callback' // 콜백 URL 설정
    },
    (accessToken, refreshToken, profile, done) => {
      // 네이버 인증 처리
      // 필요한 작업을 수행하고 사용자 정보를 저장하거나 콜백을 호출하여 다음 단계로 진행합니다.
    }
  )
);

// 구글 인증 요청
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// 구글 인증 콜백 처리
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // 인증 성공 후 리디렉션 또는 사용자에게 보여줄 페이지로 이동합니다.
    res.redirect('/dashboard');
  }
);

// 네이버 인증 요청
app.get('/auth/naver', passport.authenticate('naver'));

// 네이버 인증 콜백 처리
app.get(
  '/auth/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/login' }),
  (req, res) => {
    // 인증 성공 후 리디렉션 또는 사용자에게 보여줄 페이지로 이동합니다.
    res.redirect('/dashboard');
  }
);

// 서버 실행
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
