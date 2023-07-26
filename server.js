const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// POST 요청을 처리하는 엔드포인트
app.post('/naver/callback', async (req, res) => {
  const accessToken = req.body.token;

  try {
    // 네이버 API와 통신하여 원하는 작업 수행
    const response = await axios.get('https://naverapi.com/endpoint', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // 작업 결과를 클라이언트에 반환
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 오류');
  }
});

app.listen(port, () => {
  console.log(`서버 실행 중. 포트: ${port}`);
});
