const normalTextInput = document.getElementById("normalText");
const encryptedTextInput = document.getElementById("encryptedText");
const shiftValueInput = document.getElementById("shiftValue");
const shiftedTable = document.getElementById("shiftedTable");
const alphabetLength = 26;
const getShiftValue = () => {
    let value = Number.parseInt(shiftValueInput.value);
    value = value % alphabetLength;
    return value;
};
const encryptMessage = () => {
    let message = normalTextInput.value;
    let encryptedText = processMessage(message, getShiftValue());
    encryptedTextInput.value = encryptedText;
};
const decryptMessage = () => {
    let message = encryptedTextInput.value;
    let decryptedText = processMessage(message, -getShiftValue());
    normalTextInput.value = decryptedText;
};
const processMessage = (message, shift) => {
    let newMessage = "";
    for (let i = 0; i < message.length; i++) {
        newMessage += processChar(message.charAt(i), shift);
    }
    return newMessage;
};
const processChar = (character, shift) => {
    let regex = /[a-zA-Z]/;
    if (!regex.test(character)) {
        return character;
    }
    let charASCII = character.charCodeAt(0);
    charASCII += shift;
    let firstChar, lastChar;
    if (character === character.toLowerCase()) {
        firstChar = 'a'.charCodeAt(0);
        lastChar = 'z'.charCodeAt(0);
    }
    else if (character === character.toUpperCase()) {
        firstChar = 'A'.charCodeAt(0);
        lastChar = 'Z'.charCodeAt(0);
    }
    if (charASCII < firstChar) {
        let interval = firstChar - charASCII - 1;
        charASCII = lastChar - interval;
    }
    if (charASCII > lastChar) {
        let interval = charASCII - lastChar - 1;
        charASCII = firstChar + interval;
    }
    return String.fromCharCode(charASCII);
};
const updateTable = () => {
    while (shiftedTable.childElementCount > 0) {
        shiftedTable.removeChild(shiftedTable.firstChild);
    }
    const plainRow = document.createElement("tr");
    const cipherRow = document.createElement("tr");
    const plainHeader = document.createElement("th");
    const cipherHeader = document.createElement("th");
    plainHeader.textContent = "Plain";
    cipherHeader.textContent = "Cipher";
    plainRow.appendChild(plainHeader);
    cipherRow.appendChild(cipherHeader);
    for (let i = 0; i < alphabetLength; i++) {
        const plainCell = document.createElement("td");
        plainCell.textContent = String.fromCharCode('A'.charCodeAt(0) + i);
        plainRow.appendChild(plainCell);
        const shiftedCell = document.createElement("td");
        shiftedCell.textContent = processChar(String.fromCharCode('A'.charCodeAt(0) + i), getShiftValue());
        cipherRow.appendChild(shiftedCell);
    }
    shiftedTable.appendChild(plainRow);
    shiftedTable.appendChild(cipherRow);
};
document.addEventListener("DOMContentLoaded", () => {
    shiftValueInput.value = '0';
    shiftValueInput.addEventListener("change", () => updateTable());
    document.getElementById("encryptBtn").addEventListener("click", () => encryptMessage());
    document.getElementById("decryptBtn").addEventListener("click", () => decryptMessage());
    updateTable();
});
//# sourceMappingURL=script.js.map