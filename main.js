const btn = document.querySelector("#btn");
const content = document.querySelector(".content");


// i am working on the voice side
const speak = (text) =>{
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    // text_speak.voice = 2;

    window.speechSynthesis.speak(text_speak);
}

// init

window.addEventListener("load", ()=>{
    speak("initializing buy-bit Assistant");
    speak("i am under development");
});

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();


recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;

    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', ()=> {
    content.textContent = "Listening......";
    recognition.start();
});

let dummyReply = "make it more understanding";

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("hello boss, how can i be of help to you today please state your problem")
    } else {
        speak(dummyReply);
    }
}