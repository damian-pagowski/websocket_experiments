document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("user").addEventListener("click", (evt) => {
    $("#userNameModal").modal({
      show: true,
    });
  });

  document.getElementById("username").addEventListener("input", (evt) => {
    if (evt.target.value.length > 0) {
      document.getElementById("submit-username").removeAttribute("disabled");
    } else {
      document.getElementById("submit-username").setAttribute("disabled", true);
    }
  });

  document.getElementById("message").addEventListener("input", (evt) => {
    if (evt.target.value.length > 0) {
      document.getElementById("send").removeAttribute("disabled");
    } else {
      document.getElementById("send").setAttribute("disabled", true);
    }
  });

  document.getElementById("message").addEventListener("keypress", (evt) => {
    console.log(evt.key);
    if (evt.key === "Enter") {
      evt.preventDefault();
      console.log(evt.target.value);
      if (evt.target.value.length > 0) {
        const event = new Event("click");
        document.querySelector("#send").onclick();
      }
    }
  });

  document.getElementById("submit-username").addEventListener("click", () => {
    console.log("Clicked");
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
  });

  if (!localStorage.getItem("username")) {
    $("#userNameModal").modal({
      show: true,
    });
  }
  // Connect to websocket
  const socket = io.connect(
    location.protocol + "//" + document.domain + ":" + location.port
  );

  // on connect
  socket.on("connect", () => {
    const button = document.querySelector("#send");
    button.onclick = () => {
      const message = document.querySelector("#message").value;
      const username = localStorage.getItem("username", "Anonymus");

      socket.emit("submit_message", { message, username });
      document.querySelector("#message").value = null;
    };
  });

  // a new message is received
  socket.on("new_message", (data) => {
    const history = document.getElementById("history");
    history.value = data;
    history.scrollTop = history.scrollHeight - history.clientHeight;
  });
});
