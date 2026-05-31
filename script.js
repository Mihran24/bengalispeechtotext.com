// Check browser compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please try using Google Chrome.");
} else {
    // Initialize Recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;     // Keeps listening even if you pause, until you hit stop
    recognition.interimResults = true;  // Shows text updates live while speaking
    recognition.lang = 'bn-BD';         // Locks language strictly to Bengali

    // DOM Elements
    const recordBtn = document.getElementById('record-btn');
    const stopBtn = document.getElementById('stop-btn');
    const textOutput = document.getElementById('text-output');
    const statusMsg = document.getElementById('status');

    // --- Button Event Listeners ---
    
    // Start Recording
    recordBtn.addEventListener('click', () => {
        textOutput.value = ""; // Clear old text
        recognition.start();
    });

    // Stop Recording
    stopBtn.addEventListener('click', () => {
        recognition.stop();
    });

    // --- Speech Recognition Lifecycle Events ---

    recognition.onstart = () => {
        // Toggle button states
        recordBtn.disabled = true;
        recordBtn.classList.add('recording');
        stopBtn.disabled = false;
        
        statusMsg.innerText = "Listening... Speak in Bengali now...";
    };

    recognition.onresult = (event) => {
        let finalTranscript = '';
        
        // Loop through the results to assemble the sentence pieces
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
        }
        
        // Append text dynamically as you talk
        if(finalTranscript) {
            textOutput.value += finalTranscript + ' ';
        }
    };

    recognition.onerror = (event) => {
        statusMsg.innerText = "Error occurred: " + event.error;
        resetButtonStates();
    };

    recognition.onend = () => {
        statusMsg.innerText = "Recording stopped. Final text captured.";
        resetButtonStates();
    };

    function resetButtonStates() {
        recordBtn.disabled = false;
        recordBtn.classList.remove('recording');
        stopBtn.disabled = true;
    }
}