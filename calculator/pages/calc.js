const shape = {
    circle: 'КРУГЛАЯ',
    kvadro: 'КВАДРО'
}
const length = {
    '2': ['2 метра', 160000],
    '3': ['3 метра', 235000],
    '4': ['4 метра', 260000],
    '5': ['5 метров', 310000],
    '6': ['6 метров', 320000],
}
const installation = {
    'in-place': ['СБОРКА НА УЧАСТКЕ', 'Бесплатно'],
    collected: ['ДОСТАВКА В ГОТОВОМ ВИДЕ', 5000],
}
const entry = {
    'from-end': ['СБОКУ', 'Бесплатно'],
    'from-side': ['С ТОРЦА', 'Бесплатно'],
}
const ovenType = {
    'in-steam-room': ['В ПАРНОЙ', 'Бесплатно'],
    'from-street': ['С УЛИЦЫ', 5000],
    'from-waiting-room': ['ИЗ ПРЕДБАННИКА', 5000],
}
const oven = {
    'KENNET': ['KENNET', 'Бесплатно'],
    'DUBRAVA': ['DUBRAVA', 20000],
    'VEZUVI': ['ВЕЗУВИЙ', 20000],
    'COMETA': ['COMETA', 25000],
}
const foundation = {
    blocks: ['БЛОКИ', 'Бесплатно'],
    piles: ['СВАИ', 35000],
}

const equipment = {
    door: ['СТЕКЛЯННАЯ ДВЕРЬ', 'Бесплатно'],
    tank: ['БАК ДЛЯ ГОР ВОДЫ', 'Бесплатно'],
    shelves: ['ВЫСОКИЙ ПОЛОК', 'Бесплатно'],
    table: ['ОТКИДНОЙ СТОЛ', 'Бесплатно'],
    steps: ['СТУПЕНИ', 2500],
    box: ['ЯЩИК ПОД ЛАВКОЙ', 'Бесплатно'],
    'oven-fencing': ['ОГРАЖДЕНИЕ ПЕЧИ', 2500],
    wardrobe: ['ШКАФ', 7000],
}

let calcConfig = {

}

const popupCheckList = document.querySelector('.popup-checklist');
const equipmentList = popupCheckList.querySelector('.popup__equipment-grid');
const popupClose = popupCheckList.querySelector('.popup__close-btn');

const nameShape = document.querySelector('.name_shape');
const nameLength = document.querySelector('.name_length');
const costLength = document.querySelector('.cost_length');
const nameInstallation = document.querySelector('.name_installation');
const costInstallation = document.querySelector('.cost_installation');
const nameEntry = document.querySelector('.name_entry');
const costEntry = document.querySelector('.cost_entry');
const nameOvenType = document.querySelector('.name_oven-type');
const costOvenType = document.querySelector('.cost_oven-type');
const nameOven = document.querySelector('.name_oven');
const costOven = document.querySelector('.cost_oven');
const nameFoundation = document.querySelector('.name_foundation');
const costFoundation = document.querySelector('.cost_foundation');
const totalEquipmentCost = document.querySelector('.total_equipment_cost');
const totalCostElement = document.querySelector('.total_cost');

const setImage = (type) => {
    for(let i = 2; i <= 6; i++) {
        document.querySelector(`#length-${i}`).parentElement.querySelector('.pseudo-item__image').src = `images/${type}-${i}.png`;
    }
}

const setCheckRow = (nameElement, costElement, value, valueName) => {
    const [name, cost] = value[document.forms.calc[valueName].value];
    calcConfig[valueName] = [name, cost];
    nameElement.textContent = name;
    if(isNaN(cost)) {
        costElement.textContent = cost;
        return 0;
    } else {
        costElement.textContent = `${cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₽`
        return cost;
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

document.forms.calc.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let totalCost = 0;
    calcConfig = {};
    calcConfig.equipment = {};
    equipmentList.innerHTML = '';
    nameShape.textContent = shape[document.forms.calc['shape'].value];
    totalCost += setCheckRow(nameLength, costLength, length, 'length');
    totalCost += setCheckRow(nameInstallation, costInstallation, installation, 'installation');
    totalCost += setCheckRow(nameEntry, costEntry, entry, 'entry');
    totalCost += setCheckRow(nameOvenType, costOvenType, ovenType, 'oven-type');
    totalCost += setCheckRow(nameOven, costOven, oven, 'oven');
    totalCost += setCheckRow(nameFoundation, costFoundation, foundation, 'foundation');
    let equipmentCost = 0;
    document.forms.calc['equipment'].forEach(item => {
        if(item.checked) {
            const newEquipment = document.createElement('p');
            newEquipment.classList.add('popup__equipment-row');
            calcConfig.equipment[item.value] = equipment[item.value];
            newEquipment.textContent = equipment[item.value][0];
            equipmentList.appendChild(newEquipment);
            equipmentCost = equipmentCost + (isNaN(equipment[item.value][1]) ? 0 : equipment[item.value][1]);
        }
    });
    totalEquipmentCost.textContent = equipmentCost > 0
        ? `${equipmentCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₽`
        : 'Бесплатно';

    totalCost += equipmentCost;
    totalCostElement.textContent = `Итого: ${totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₽`
    popupCheckList.classList.add('popup_opened');
});

popupCheckList.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup')) {
        popupCheckList.classList.remove('popup_opened');
    }
});

popupClose.addEventListener('click', () => {
    popupCheckList.classList.remove('popup_opened');
})