// غيّر الاسم من هنا فقط
var NAME = "مريم";

document.querySelectorAll(".name").forEach(function (el) {
  el.textContent = NAME;
});

var envelopeBtn = document.getElementById("envelopeBtn");
var askStage = document.getElementById("askStage");
var yesStage = document.getElementById("yesStage");
var yesBtn = document.getElementById("yesBtn");
var noBtn = document.getElementById("noBtn");
var teaseMsg = document.getElementById("teaseMsg");
var restartBtn = document.getElementById("restartBtn");
var song = document.getElementById("song");
var songBtn = document.getElementById("songBtn");

var dodges = 0;
var playing = false;

function show(stage) {
  envelopeBtn.classList.toggle("hidden", stage !== "closed");
  askStage.classList.toggle("hidden", stage !== "asking");
  yesStage.classList.toggle("hidden", stage !== "yes");
}

// إخفاء زر الأغنية إذا ما كو ملف song.mp3
song.addEventListener("error", function () {
  songBtn.classList.add("hidden");
});

function updateSongBtn() {
  songBtn.textContent = playing ? "♪ ⏸" : "♪ ▶";
  songBtn.setAttribute("aria-label", playing ? "إيقاف الأغنية" : "تشغيل الأغنية");
}

songBtn.addEventListener("click", function () {
  if (song.paused) {
    song.play().then(function () {
      playing = true;
      updateSongBtn();
    }).catch(function () {
      songBtn.classList.add("hidden");
    });
  } else {
    song.pause();
    playing = false;
    updateSongBtn();
  }
});

envelopeBtn.addEventListener("click", function () {
  show("asking");
  if (song.paused) {
    song.play().then(function () {
      playing = true;
      updateSongBtn();
    }).catch(function () {});
  }
});

function dodge() {
  dodges++;
  var x = (Math.random() - 0.5) * 220;
  var y = (Math.random() - 0.5) * 160;
  noBtn.style.transform = "translate(" + x + "px, " + y + "px)";
  var scale = 1 + Math.min(dodges, 6) * 0.18;
  yesBtn.style.transform = "scale(" + scale + ")";
  teaseMsg.classList.toggle("hidden", dodges <= 2);
}

noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("click", dodge);

yesBtn.addEventListener("click", function () {
  show("yes");
});

restartBtn.addEventListener("click", function () {
  dodges = 0;
  noBtn.style.transform = "translate(0px, 0px)";
  yesBtn.style.transform = "scale(1)";
  teaseMsg.classList.add("hidden");
  show("closed");
});

show("closed");
updateSongBtn();
