const eventList = document.getElementById("event-list");
const selectElement = document.getElementById("subject");

selectElement.addEventListener("change", function() {
  const selectedOption = selectElement.value;

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
          eventList.innerHTML = "";

          // 데이터를 처리하며 이벤트 항목 추가
          photos.forEach((photoURL, index) => {
            const title = titles[index];
            const description = descriptions[index];

            const eventItem = document.createElement("div");
            eventItem.className = "event-item";
            eventItem.innerHTML = `
              <img src="${photoURL}" alt="사진">
              <h1 class= "event-title">${title}</h1>
              <div>${description}</div>
            `;
            const titleElement = eventItem.querySelector(".event-title");
            titleElement.addEventListener("click", function () {
            // 게시판 페이지로 이동하는 로직 구현
              const postId = filteredData.subject;
              const boardURL = `/board.html?id=${postId}`;
              window.location.href = boardURL;
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
  const dataURL = '서버에서 데이터를 가져올 URL';
  xhr.open('GET', dataURL);
  xhr.send();
});
