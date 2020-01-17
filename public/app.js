var contactForm = document.querySelector("#contact-form");
var contactMsgSuccess = document.querySelector("#contact-message-success");
var contactMsgErr = document.querySelector("#contact-message-error");
var sendAgain = document.querySelector("#contact-send-again");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  var name = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var message = document.querySelector("#message").value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
      if (xhttp.status === 200) {
        try {
          contactForm.classList.add("u-display-none");
          contactMsgErr.classList.add("u-display-none");
          contactMsgSuccess.classList.remove("u-display-none");
        } catch (e) {}
      } else {
        contactForm.classList.add("u-display-none");
        contactMsgErr.classList.remove("u-display-none");
        contactMsgSuccess.classList.add("u-display-none");
      }
    }
  };
  xhttp.open("POST", "/contact", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({ name: name, email: email, message: message }));
});

sendAgain.addEventListener("click", function() {
  contactForm.classList.remove("u-display-none");
  contactMsgErr.classList.add("u-display-none");
  contactMsgSuccess.classList.add("u-display-none");

  document.querySelector("#message").value = "";
  document.querySelector("#message").focus();
});
