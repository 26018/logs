export default function () {

    let colorBox = [
        "#355c7d", "#6c5b7b", "#c06c84", "#f67280", "#19448e",
        "#769fcd", "#c5c56a", "#845399", "#745599", "#f73859",
        "#9ba88d", "#ee7800", "#745399", "#028760", "#ff7e67",
        "#4c6cb3", "#69b076", "#5654a2", "#47885e", "#241a08",
        "#7209d4", "#2832d4", "#00a5b2", "#c5c56a", "#355c7d"];

    let biggest = colorBox.length;

    function randomInt(biggest) {
        let number = Math.random();
        number = Math.floor(number * biggest);
        return number;
    }

    let first = colorBox[randomInt(biggest)];
    let second = colorBox[randomInt(biggest)];
    let third = colorBox[randomInt(biggest)];
    let image = "linear-gradient(90deg," + first + ", " + second + " 33%, " + third + ")";

    return {
        image
    }
}