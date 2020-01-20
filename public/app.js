var contactForm = document.querySelector("#contact-form");
var contactMsgSuccess = document.querySelector("#contact-message-success");
var contactMsgErr = document.querySelector("#contact-message-error");
var sendAgain = document.querySelector("#contact-send-again");

// Send contact information to server
contactForm.addEventListener("submit", function(e) {
  document.querySelector("#loading").classList.remove("u-display-none");
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
          document.querySelector("#loading").classList.add("u-display-none");
        } catch (e) {}
      } else {
        contactForm.classList.add("u-display-none");
        contactMsgErr.classList.remove("u-display-none");
        contactMsgSuccess.classList.add("u-display-none");
        document.querySelector("#loading").classList.add("u-display-none");
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

// Smooth scrolling to the target element
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

// Open and close Q&A boxes
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

document.querySelectorAll(".skill").forEach(function(item) {
  item.addEventListener("click", function(e) {
    var modal = document.querySelector("#modal-skills");
    document.querySelector("#modal-skills h3").innerHTML =
      this.getAttribute("data-title") || e.target.text;
    document.querySelector(
      "#modal-skills .mdl__body"
    ).innerHTML = this.getAttribute("data-desc");

    modal.classList.remove("u-display-none");
  });
});

document.querySelectorAll(".project").forEach(function(item) {
  item.addEventListener("click", function(e) {
    var modal = document.querySelector("#modal-projects");
    var plink = this.getAttribute("data-plink");
    var slink = this.getAttribute("data-slink");
    var img = this.getAttribute("data-img");
    var title = this.getAttribute("data-title");
    var desc = this.getAttribute("data-text");
    var technologies = this.getAttribute("data-technologies").split("-");

    // Set title
    document.querySelector("#modal-projects h3").innerHTML = title;

    // Set project link
    document.querySelectorAll("#modal-projects .link-complete")[0].href = plink;

    // Add the link to porject source code
    if (slink) {
      document.querySelectorAll(
        "#modal-projects .link-complete"
      )[1].href = slink;
      document
        .querySelectorAll("#modal-projects .link-complete")[1]
        .classList.remove("u-display-none");
    } else {
      document
        .querySelectorAll("#modal-projects .link-complete")[1]
        .classList.add("u-display-none");
    }

    // Set img
    document.querySelector("#modal-projects img").src = img;

    // Set description
    document.querySelector("#modal-projects .mdl__text").innerHTML = desc;

    // Add technologies used
    document.querySelector("#modal-projects .technologies").innerHTML = "";
    technologies.forEach(function(item) {
      var div = document.createElement("div");
      div.setAttribute("class", "skill-sm");
      div.textContent = item;
      document.querySelector("#modal-projects .technologies").append(div);
    });

    modal.classList.remove("u-display-none");
  });
});

document.querySelectorAll(".mdl__close").forEach(function(item) {
  item.addEventListener("click", function(e) {
    var modalId = e.target.getAttribute("data-target");
    document.querySelector("#" + modalId).classList.add("u-display-none");
  });
});
