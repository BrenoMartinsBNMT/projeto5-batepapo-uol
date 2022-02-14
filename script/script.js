let condicionalInit;
let chatRoll = [];
function logarChat() {
  let LoginDiv = document.querySelector(".login-input ");
  let inputDiv = LoginDiv.querySelector("input");
  condicionalInit = inputDiv.value;

  let peopleInChat = axios
    .post("https://mock-api.driven.com.br/api/v4/uol/participants ", {
      name: condicionalInit,
    })
    .then((sucess) => {
      if (sucess.status === 200) {
        document
          .querySelector(".login-screen")
          .classList.add("visibility-hidden");
        showMesseges();
      }
    })
    .catch((error) => {
      return alert("esse nickname ja existe!");
    });
}
function showMesseges() {
  stayInChat();
  setInterval(() => {
    let promesaMSG = axios
      .get("https://mock-api.driven.com.br/api/v4/uol/messages")
      .then((awnser) => {
        imprimir(awnser);
      });
  }, 3000);
}
function stayInChat() {
  setInterval(() => {
    let renewStatus = axios.post(
      "https://mock-api.driven.com.br/api/v4/uol/status",
      { name: condicionalInit }
    );
  }, 5000);
}
function teste() {
  document.querySelector(".right-bar").classList.remove("visibility-show");
  document.querySelector(".right-bar").classList.add("visibility-hidden");
}
function imprimir(ver) {
  let mensagens = document.querySelector(".messenger");
  let peopleList = document.querySelector(".chosePeople");

  if (mensagens.childNodes.length >= 100) {
    for (let i = 98; i < 100; i++) {
      if (ver.data[i].to === "Todos") {
        mensagens.innerHTML += `<div class="messenger-line "><span id="time-messenger"
                > ${ver.data[i].time}  </span> <span id="whoSend"
                  > ${ver.data[i].from}  </span> para <span id="Tosend"> ${ver.data[i].to}:</span> 
                  <span id="messenger-content"> ${ver.data[i].text}</span></div>`;
      }
      if (ver.data[i].type === "private_message") {
        if (ver.data[i].to === condicionalInit) {
          console.log(ver.data[i].type);
          mensagens.innerHTML += `<div class="messenger-line " data-identifier="message"><span id="time-messenger"
              > ${ver.data[i].time}  </span> <span id="whoSend"
                > ${ver.data[i].from}  </span> para <span id="Tosend"> ${ver.data[i].to}:</span> 
                <span id="messenger-content"> ${ver.data[i].text}</span></div>`;
        }
      }
    }
  } else {
    for (let i = 0; i < 100; i++) {
      if (ver.data[i].to === "Todos") {
        mensagens.innerHTML += `<div class="messenger-line " data-identifier="message"><span id="time-messenger"
              > ${ver.data[i].time}  </span> <span id="whoSend"
                > ${ver.data[i].from}  </span> para <span id="Tosend"> ${ver.data[i].to}:</span> 
                <span id="messenger-content"> ${ver.data[i].text}</span></div>`;
      }
      if (ver.data[i].type === "private_message") {
        if (ver.data[i].to === condicionalInit) {
          console.log(ver.data[i].type);
          mensagens.innerHTML += `<div class="messenger-line " data-identifier="message"><span id="time-messenger"
              > ${ver.data[i].time}  </span> <span id="whoSend"
                > ${ver.data[i].from}  </span> para <span id="Tosend"> ${ver.data[i].to}:</span> 
                <span id="messenger-content"> ${ver.data[i].text}</span></div>`;
        }
      }
    }
  }

  for (let i = 0; i < mensagens.childNodes.length; i++) {
    if (
      mensagens.childNodes[i].childNodes[6].innerHTML == " entra na sala..." ||
      mensagens.childNodes[i].childNodes[6].innerHTML == " sai da sala..."
    ) {
      mensagens.childNodes[i].attributes[0].value += " color-background-text";
    }
  }

  mensagens.scrollIntoView({ block: "end" });
}
function sendMsg() {
  let boxMsgDiv = document.querySelector(".box-mensager");
  let valueInput = boxMsgDiv.querySelector("input");

  axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", {
    from: condicionalInit,
    to: "Todos",
    text: valueInput.value,
    type: "message", // ou "private_message" para o bônus
  });
  valueInput.value = "";
  showMesseges();
}

function showSideBar() {
  let showBar = document.querySelector(".right-bar");

  showBar.classList.remove("visibility-hidden");
  showBar.classList.add("visibility-show");
}
function choseModMsg() {
  let showBar = document.querySelector(".visibility-hidden");
  showBar.classList.add("visibility-hidden");
  showBar.classList.remove("visibility-show ");
}
