function getDataID(element) { return element.getAttribute('data-id'); }

function copyDataID(element) {
    const data = getDataID(element);
    navigator.clipboard.writeText(data)
        .then(() => console.log(`Copied ${data} to clipboard`))
}

function addColorsToElement(element) { element.style.backgroundColor = `#${getDataID(element)}`; }
document.querySelectorAll('.colorSquare').forEach(element => { addColorsToElement(element); });

