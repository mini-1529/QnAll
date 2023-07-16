function uploadPhoto() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('photo', file);

    const 박스1 = document.getElementById('박스1').value;
    const 박스2 = document.getElementById('박스2').value;
    const 과목 = document.querySelector('select[name="과목"]').value;

    formData.append('박스1', 박스1);
    formData.append('박스2', 박스2);
    formData.append('과목', 과목);

    const url = 'https://qnall.kro.kr/'; // 실제 파일을 업로드하고 처리할 서버의 URL로 변경해야 합니다.

    // AJAX 요청 보내기
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log('파일 업로드 성공:', response);
        // 업로드 성공 시 추가 작업을 수행할 수 있습니다.
      },
      error: function (xhr, status, error) {
        console.error('파일 업로드 실패:', error);
        // 업로드 실패 시 처리할 내용을 여기에 작성할 수 있습니다.
      }
    });
  } else {
    console.log('파일을 선택해주세요.');
  }
}
