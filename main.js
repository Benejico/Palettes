// SECTION Utility functions
const copyColor = (data) => {
    let string = data;
    if (isCtrlPressed) {
        const rgbColors = convertHexToRGB(data);
        string = `rgb(${rgbColors.r}, ${rgbColors.g}, ${rgbColors.b})`;
    }
    navigator.clipboard.writeText(string)
        .then(() => {
            console.log(`Copied ${string} to clipboard`);
            blinkBorder(data, 'green');
        })
        .catch((err) => {
            console.error('Failed to copy: ', err);
            blinkBorder(data, 'red');
        });
};

const convertHexToRGB = (hexColor) => {
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    return { r, g, b };
}

const isColorLight = (hexColor) => {
    const { r, g, b } = convertHexToRGB(hexColor);
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return brightness > 0.80;
};

const generateRandomColor = () => 
    Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
// !SECTION

// SECTION Helper functions
const blinkBorder = (id, color) => {
    document.getElementById(id).style.outline = `4px solid ${color}`;
    setTimeout(() => {
        document.getElementById(id).style.outline = "";
    }, 750);
};

const addRandomColors = (numberOfColor) => {
    const randomColors = Array.from(
        { length: numberOfColor }, 
        () => generateRandomColor()
    );

    const randomPalette = data.find(data => data.name === "Random");
    if (randomPalette) {
        randomPalette.colorsGroup.push({
            name: "Random",
            colors: randomColors
        });
    }
};
// !SECTION

// SECTION Keypress event listener
let isCtrlPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
        isCtrlPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Control') {
        isCtrlPressed = false;
    }
});

// !SECTION 

// SECTION DOM creation functions
const createPalette = ({ name, colorsGroup }) => `
    <article>
        <h1>${name}</h1>
        ${colorsGroup.map(createColorGroup).join('')}
    </article>
`;

const createColorGroup = ({ name, colors }) => `
    <h2>${name}</h2>
    <section>
        ${colors.map(createColorSquare).join('')}
    </section>
`;

const createColorSquare = (color) => `
    <div 
        id="${color}" 
        class="colorSquare${isColorLight(color) ? ' darkBorder' : ''}" 
        style="background-color: #${color}" 
        onclick="copyColor('${color}')"
    ></div>
`;
//!SECTION

// ANCHOR Main function
const main = () => {
    addRandomColors(12);
    document.getElementById('main').innerHTML = data.map(createPalette).join('');
};

// Run the main function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);
