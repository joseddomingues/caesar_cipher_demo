const alphabet = "abcdefghijklmnopqrstuvwxyz";
const game_ids = ['benji-bananas', 'sweet-dust', 'prime-enterprise', 'magic-durian', 'exalted-cosmos'];
const pt_alphabet_chart_html_element = document.getElementById('chart_alfabeto_pt');
const ciphered_text_chart_html_element = document.getElementById('chart_alfabeto_cifrado');
const base_encrypted_text = 'texts/{0}_main_text_encrypted.txt';
const base_encrypted_clue = 'texts/{0}_clue_encrypted.txt';


let ciphered_text_id = -1;
let ciphered_text_frequencies = Array(alphabet.length).fill(0);
document.addEventListener('DOMContentLoaded', load_encrypted_file);

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] == 'undefined' ? match : args[index];
    });
};

function decode() {
    var given_shift = parseInt(document.getElementById("number").value);
    var current_text = document.getElementById("result").innerHTML.replace(/<br>/g, '\n');
    var decodedText = caeser_cipher(current_text, -given_shift);
    document.getElementById("result").innerHTML = decodedText.replace(/\n/g, '<br>');

    // Update the chart with the new frequencies
    update_ciphered_text_chart(update_frequencia_cifrado(decodedText));
}

function caeser_cipher(text, shift) {
    const shifted_alphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
    const shifted_upper_alphabet = shifted_alphabet.toUpperCase();

    function translate(char) {
        if (/[a-zA-Z]/.test(char)) {
            const index = alphabet.indexOf(char.toLowerCase());
            if (index >= 0) {
                if (char === char.toUpperCase()) {
                    return shifted_upper_alphabet[index];
                } else {
                    return shifted_alphabet[index];
                }
            }
        }
        return char;
    }

    return Array.from(text, char => translate(char)).join('');
}

function update_frequencia_cifrado(text) {
    ascii_text = text.toLowerCase();
    const frequencies = Array(alphabet.length).fill(0);
    let total = 0;
    for (let i = 0; i < ascii_text.length; i++) {
        const char = ascii_text[i];
        const index = alphabet.indexOf(char.toLowerCase());
        if (index >= 0) {
            frequencies[index] += 1;
            total += 1;
        }
    }
    const percentages = frequencies.map(frequency => (frequency / total) * 100);
    return percentages;
}

function load_encrypted_file() {

    const urlParams = new URLSearchParams(window.location.search);
    ciphered_text_id = urlParams.get('gameid');
    if (ciphered_text_id === null || !game_ids.includes(ciphered_text_id)) {
        ciphered_text_id = game_ids[0];
    }
    text = base_encrypted_text.format(ciphered_text_id);
    clue = base_encrypted_clue.format(ciphered_text_id);

    fetch(text)
        .then(response => response.text())
        .then(text => {
            document.getElementById("result").innerHTML = text.replace(/\n/g, '<br>');
            ciphered_text_frequencies = update_frequencia_cifrado(text);
            update_ciphered_text_chart(ciphered_text_frequencies);
        });

    fetch(clue)
        .then(response => response.text())
        .then(text => {
            document.getElementById("encryped-clues").innerHTML = text;
        });
}

function update_ciphered_text_chart(new_frequencies) {
    ciphered_text_chart.data.datasets[0].data = new_frequencies;
    ciphered_text_chart.update();
}



new Chart(pt_alphabet_chart_html_element, {
    type: 'bar',
    data: {
        labels: alphabet.split(""),
        datasets: [{
            label: 'Letter Frequency (%)',
            data: [14.63, 1.04, 3.88, 4.99, 12.57, 1.02, 1.30, 1.28, 6.18, 0.40, 0.02, 2.78, 4.74, 5.05, 10.73, 2.52, 1.20, 6.53, 7.81, 4.34, 4.63, 1.67, 0.01, 0.21, 0.01, 0.47],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Frequência alfabeto português'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


let ciphered_text_chart = new Chart(ciphered_text_chart_html_element, {
    type: 'bar',
    data: {
        labels: alphabet.split(""),
        datasets: [{
            label: 'Letter Frequency (%)',
            data: ciphered_text_frequencies,
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Frequência alfabeto no texto cifrado'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});