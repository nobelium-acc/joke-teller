const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMeTheJoke(joke) {
    VoiceRSS.speech({
        key: 'c77d43d3e2bf47bf9f3ea8aa95d19184',
        src: joke,
        hl: 'fr-fr',
        v: 'Bette',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });    
}

 
async function getJokes() {
    let joke  = '';
    try {
        const apiUrl = 'https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=racist,sexist';
        let response = await fetch(apiUrl);
        let data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        tellMeTheJoke(joke)
        toggleButton;
    } catch (error) {
        console.log('Whoops !!', error);
    }
}

button.addEventListener('click', getJokes);

audioElement.addEventListener('ended', toggleButton);