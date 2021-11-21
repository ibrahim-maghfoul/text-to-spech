const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./images/busy.jpg",
    text: "I'm Busy",
  },
  {
    image: "./images/cry.jpg",
    text: "I'm Sad",
  },
  {
    image: "./images/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./images/hungry.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./images/rich.jpg",
    text: "I'm Rich",
  },
  {
    image: "./images/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./images/dissapointed.jpg",
    text: "I'm Disappointed",
  },
  {
    image: "./images/hurry.jpg",
    text: "I'm in a Hurry",
  },
  {
    image: "./images/scared.jpg",
    text: "I'm in a Scared",
  },
];

data.forEach(createBox);

// Creat speech box
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
  <img src ="${image}"}/>
  <p class ="info">${text}</p>`;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  main.appendChild(box);
}

// Init Speech synth
const message = new SpeechSynthesisUtterance();

// store voices
let voices;

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;

    option.innerHTML = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices change
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle textbox
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

// close textbox
closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

// change voice
voicesSelect.addEventListener("change", setVoice);

// read text button

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
