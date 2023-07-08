// 유저 계정 정보
const user = {
  id: "", // 초기값은 빈 문자열로 설정
  name: "" // 초기값은 빈 문자열로 설정
};

// 유저 정보를 표시하는 함수
function displayUserInfo() {
  const currentUserDiv = document.getElementById("currentUser");
  currentUserDiv.innerHTML = `로그인 계정: ${user.name} (${user.id})`;
}

// 유저 정보를 서버에서 받아오는 함수
function fetchUserData() {
  // AJAX 요청
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        const userData = responseData.userData;

        // 유저 정보 업데이트
        user.id = userData.id;
        user.name = userData.name;

        // 유저 정보 표시 업데이트
        displayUserInfo();
      } else {
        // 에러 처리
        console.log('서버에서 유저 데이터를 가져오는 데 실패했습니다.');
      }
    }
  };

  // 실제 유저 데이터를 가져오는 URL로 수정해야 함
  const userDataURL = 'https://qnall.kro.kr/';
  xhr.open('GET', userDataURL);
  xhr.send();
}

// 선택한 과목에 대한 데이터를 가져오는 함수
function fetchDataBySubject(selectedOption) {
  // AJAX 요청
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        const data = responseData.data;

        // 선택한 과목과 일치하는 데이터 필터링
        const filteredData = data.filter(item => item.subject === selectedOption)[0];

        if (filteredData) {
          const photos = filteredData.photos;
          const titles = filteredData.titles;
          const descriptions = filteredData.descriptions;

          // 이전에 추가된 이벤트 항목들 제거
          const eventList = document.getElementById("eventList");
          eventList.innerHTML = "";

          // 데이터를 처리하며 이벤트 항목 추가
          photos.forEach((photoURL, index) => {
            const title = titles[index];
            const description = descriptions[index];

            const eventItem = document.createElement("div");
            eventItem.className = "event-item";
            eventItem.innerHTML = `
              <img src="${photoURL}" alt="사진">
              <h1 class="event-title">${title}</h1>
              <div>${description}</div>
            `;

            // 게시판 항목 클릭 시 이벤트 추가
            const titleElement = eventItem.querySelector(".event-title");
            titleElement.addEventListener("click", function () {
              handlePostClick(filteredData.id);
            });

            eventList.appendChild(eventItem);
          });
        } else {
          // 선택한 과목에 해당하는 데이터가 없는 경우 처리
          console.log('선택한 과목에 대한 데이터가 없습니다.');
        }
      } else {
        // 에러 처리
        console.log('서버에서 데이터를 가져오는 데 실패했습니다.');
      }
    }
  };

  // 실제 데이터를 가져오는 URL로 수정해야 함
  const dataURL = 'https://qnall.kro.kr/';
  xhr.open('GET', dataURL);
  xhr.send();
}

// 선택한 과목 변경 시의 동작
const selectElement = document.getElementById("subject");
selectElement.addEventListener("change", function() {
  const selectedOption = selectElement.value;
  fetchDataBySubject(selectedOption);
});

// 초기 실행 시 유저 정보 표시 및 데이터 받아오기
fetchUserData();
