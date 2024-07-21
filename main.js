// SECTION Utility functions
const copyColorHex = (data) => {
    navigator.clipboard.writeText(data)
        .then(() => console.log(`Copied ${data} to clipboard`))
        .catch((err) => console.error('Failed to copy: ', err));
};

const isColorLight = (hexColor) => {
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return brightness > 0.80;
};

const generateRandomColor = () => 
    Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const addRandomColors = (numberOfColor) => {
    const randomColors = Array.from(
        { length: numberOfColor }, 
        () => generateRandomColor()
    );

    data[1].colorsGroup.push({
        name: "Random",
        colors: randomColors
    });
};
// !SECTION

// SECTION DOM creation functions
const createColorSquare = (color) => `
    <div 
        class="colorSquare${isColorLight(color) ? ' darkBorder' : ''}" 
        style="background-color: #${color}" 
        onclick="copyColorHex('${color}')"
    ></div>
`;

const createColorGroup = ({ name, colors }) => `
    <h2>${name}</h2>
    <section>
        ${colors.map(createColorSquare).join('')}
    </section>
`;

const createPalette = ({ name, colorsGroup }) => `
    <article>
        <h1>${name}</h1>
        ${colorsGroup.map(createColorGroup).join('')}
    </article>
`;
//!SECTION

// ANCHOR Main function
const main = () => {
    addRandomColors(12);
    document.getElementById('main').innerHTML = data.map(createPalette).join('');
};

// Run the main function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);
