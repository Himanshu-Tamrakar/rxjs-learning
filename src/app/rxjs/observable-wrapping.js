const speech = new webkitSpeechRecognition();

speech.onresult = event => {
    console.log(event);
};

speech.start();

    // speech.stop();