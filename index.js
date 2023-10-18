document.querySelector(".pattern").value = "(C)V(N)"
document.querySelector(".filters").value = "mn nm"


const NUMGENER = 250;
addEventListener("keydown", e => {
    if (e.key == "Alt") {
        generate();
    }
})

function generate() {
    let phonemesInp = document.querySelector(".phonemes").value;
    let phonemes = {};
    for (let line of phonemesInp.split("\n")) {
        let key = line.charAt(0);
        let rest = line.substring(1).trim();
        phonemes[key] = rest.split(" ");
    }
    let filters = document.querySelector(".filters").value.split(" ")
    let pattern = document.querySelector(".pattern").value;
    let syllableCount = document.querySelector(".sylabbles").value;
    document.querySelector(".output").innerText = "";
    if (syllableCount == "") {
        let syllables = 1;
        for (let j = 0; j < NUMGENER; j++) {
            let fullWord = "";
            for (let i = 0; i < syllables; i++) {
                let w = genWord(phonemes, pattern, filters)
                fullWord += w;
            }
            if (!filters.includes(fullWord)) {
                document.querySelector(".output").innerText += fullWord;
                filters.push(fullWord);
                document.querySelector(".output").innerText += "\n";

            }
        }
    }
    try {
        let syllables = Number(syllableCount);
        for (let j = 0; j < NUMGENER; j++) {
            let fullWord = "";
            for (let i = 0; i < syllables; i++) {
                let w = genWord(phonemes, pattern, filters)
                fullWord += w;
            }
            if (!filters.includes(fullWord)) {
                filters.push(fullWord);

                document.querySelector(".output").innerText += fullWord;
                document.querySelector(".output").innerText += "\n";

            }
        }
    } catch {

    }
}

function getRandom(arr) {
    let ind = Math.floor(Math.random() * arr.length);
    return arr[ind];

}

function genWord(phones, structure, filters) {
    let out = "";
    for (let i = 0; i < structure.length; i++) {
        if (structure.charAt(i) == ")") continue;
        if (structure.charAt(i) == "(") {
            let count = 1;
            let end = 0;
            for (let j = i + 1; j < structure.length; j++) {
                if (structure.charAt(j) == "(") count++;
                else if (structure.charAt(j) == ")") count--;
                if (count == 0) {
                    end = j;
                    break;
                }
            }
            if (end == 0) {
                console.log("NO NO NO ");
                return;
            }
            console.log(structure.substring(i + 1, end), i, end);
            if (Math.random() > 0.5) {
                out += genWord(phones, structure.substring(i + 1, end), []);
            }
            i = end
            continue;
        }
        out += getRandom(phones[structure.charAt(i)]);
    }
    return out;
}