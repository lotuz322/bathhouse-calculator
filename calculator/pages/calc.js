const setImage = (type) => {
    for(let i = 2; i <= 6; i++) {
        document.querySelector(`#length-${i}`).parentElement.querySelector('.pseudo-item__image').src = `images/${type}-${i}.png`;
    }
}


document.querySelector('.calc-field_type_shape').addEventListener('change', () => {
    setImage(document.forms.calc['shape'].value);
});

document.addEventListener("DOMContentLoaded", () => {
    if(document.forms.calc['shape'].value === 'circle') {
        setImage('circle');
    }
});


