function uploadPhoto() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('photo', file);

    // 서버로 사진을 업로드하는 요청을 보냅니다.
    // 이 부분은 서버 환경에 따라 구현해야 합니다.
    // 여기에서는 간단한 예시로 콘솔에 파일 정보를 출력합니다.
    console.log('업로드할 파일:', file);
  } else {
    console.log('파일을 선택해주세요.');
  }
}
