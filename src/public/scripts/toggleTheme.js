document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("checkbox");
  const video = document.getElementById("background-video");
  const logo = document.querySelector(".header-navbar__logo");

  if (checkbox.checked) {
    video.src = "/assets/video-background-ditto-light.mp4";
    logo.src = "/assets/logo-ditto-preto.png";
  } else {
    video.src = "/assets/video-background-ditto-dark.mp4";
    logo.src = "/assets/logo-ditto-branco.png";
  }

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      video.src = "/assets/video-background-ditto-light.mp4";
      logo.src = "/assets/logo-ditto-preto.png";
    } else {
      video.src = "/assets/video-background-ditto-dark.mp4";
      logo.src = "/assets/logo-ditto-branco.png";
    }
  });
});
