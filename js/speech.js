const textarea = document.querySelector("textarea"),
voicesList = document.querySelector("select"),
speechConverter = document.querySelector("button");
errorMessage = document.getElementById("errorMessage");

let speechSynth = speechSynthesis,
isTextSpeaking = true;

voiceLang();

function voiceLang(){
    for(let voice of speechSynth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voicesList.insertAdjacentHTML("beforeend", option);
    }
}

speechSynth.addEventListener("voiceschanged", voiceLang);

function convertTextToSpeech(text){
    let speechUtterance = new SpeechSynthesisUtterance(text);
    for(let voice of speechSynth.getVoices()){
        if(voice.name === voicesList.value){
            speechUtterance.voice = voice;
        }
    }
    speechSynth.speak(speechUtterance);
}

speechConverter.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
		errorMessage.innerText = "";
        if(!speechSynth.speaking){
            convertTextToSpeech(textarea.value);
        }
        if(textarea.value.length > 5){
            setInterval(()=>{
                if(!speechSynth.speaking && !isTextSpeaking){
                    isTextSpeaking = true;
                    speechConverter.innerText = "Speech";
                }else{
                }
            }, 500);
            if(isTextSpeaking){
                speechSynth.resume();
                isTextSpeaking = false;
                speechConverter.innerText = "Pause Speech";
            }else{
                speechSynth.pause();
                isTextSpeaking = true;
                speechConverter.innerText = "Resume Speech";
            }
        }else{
            speechConverter.innerText = "Speech";
        }
    } else {
		errorMessage.innerText = "Please enter text to speech.";
	}
});