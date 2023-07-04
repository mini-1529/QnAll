const express = require('express');
const app = express();

// 정적 파일 제공을 위한 폴더 설정
app.use(express.static('public'));

// 라우트 설정 등 다른 백엔드 코드 작성

// 서버 실행
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
