const input = document.getElementById("input");
const meaning = document.getElementById("meaning");
const sound = document.getElementById("sound");
const tBody = document.getElementById("tBody");
const index = 0;

const getWord = async(word) =>{
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return res;
}

const setWord = async() =>{
    try {
        const word = input.value;
        const data = await getWord(word);
        const resText = data.data[0].meanings[0].definitions[0].definition;
        const resAudio = data.data[0].phonetics[0].audio;
        sound.src = resAudio;
        meaning.innerHTML = resText;
        console.log(resText);
        createRow(word, resText, resAudio)
    } catch (error) {
        meaning.innerHTML = input.value;
    }
    
}

const createRow = (word, description, audio) =>{
    try {
         const row = document.createElement("tr");
         row.innerHTML = `
            <tr>
            <th scope="row">${index+1}</th>
            <td>${word}</td>
            <td>${description}</td>
            <td>
                <audio id="sound" controls autoplay>
                <source src="${audio}" type="audio/mpeg">
                </audio>
            </td>
          </tr>
            `
        tBody.appendChild(row);
        console.log(row);
    } catch (error) {
        console.log(error);
    }
      
}

const translate = () =>{
    const data = setWord("Hi");
    console.log(data);
}

const clean = () =>{
    input.value = "";
    meaning.innerHTML = "";
}