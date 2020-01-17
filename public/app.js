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

function smoothScroll(target, duration) {
  var target = document.querySelector(target);
  var targetPostion = target.getBoundingClientRect().top;

  var startPosition = window.pageYOffset;

  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, targetPostion, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  }

  requestAnimationFrame(animation);
}

window.onscroll = function() {
  var scrollBarPosition = window.pageYOffset | document.body.scrollTop;

  // At specifiv position do what you want
  if (scrollBarPosition > document.querySelector("#tasks").offsetTop + 120) {
    // add sticky nav
    document.querySelector("#sticky-nav").classList.remove("u-display-none");
    setTimeout(function() {
      document.querySelector("#sticky-nav").style.opacity = 1;
    }, 200);
  } else {
    // remove sticky nav
    document.querySelector("#sticky-nav").style.opacity = 0;
    setTimeout(function() {
      document.querySelector("#sticky-nav").classList.add("u-display-none");
    }, 200);
  }
};

// Buttons won't get focused on click
document.addEventListener("click", function(e) {
  if (
    document.activeElement.toString() == "[object HTMLButtonElement]" ||
    document.activeElement.toString() == "javascript:void(0)"
  ) {
    document.activeElement.blur();
  }
});

document.querySelectorAll(".info").forEach(function(item) {
  item.addEventListener("click", function() {
    this.classList.toggle("open");

    document.querySelectorAll(".info img").forEach(function(item) {
      if (item.parentElement.classList.contains("open")) {
        item.src = "/img/up-arrow.svg";
      } else {
        item.src = "/img/down-arrow.svg";
      }
    });
  });
});
