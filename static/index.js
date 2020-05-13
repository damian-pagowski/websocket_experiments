document.addEventListener("DOMContentLoaded", () => {
  // Connect to websocket
  const socket = io.connect(
    location.protocol + "//" + document.domain + ":" + location.port
  );

  // on connect
  socket.on("connect", () => {
    const button = document.querySelector("#send");
    button.onclick = () => {
      const message = document.querySelector("#message").value;
      const username = document.querySelector("#username").value;
      username.value="" 
      socket.emit("submit_message", { message, username });
    };
  });

  // a new message is received
  socket.on("new_message", (data) => {
    document.getElementById("history").value = data;
  });
});
