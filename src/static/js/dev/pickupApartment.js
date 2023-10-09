// Количество комнат
const roomsCount = document.querySelector('#roomsCount');
const roomsCountSelects = roomsCount.querySelectorAll('.select');

roomsCountSelects.forEach(select => {
    select.addEventListener('click', () => {
        let input = select.querySelector('input');
        let condition = input.checked;

        roomsCountSelects.forEach(sel => {
            sel.classList.remove('selected');
            sel.querySelector('input').checked = false;
        });

        if (condition == false) {
            input.checked = true;
            select.classList.add('selected');
        } 
    });
});

// Этаж
const floorBlock = document.querySelector('#floor-block');
const floorBlockSelect = floorBlock.querySelector('select');
const floorBlockValuesBlock = floorBlock.querySelector('.select-values');
const floorBlockValues = floorBlockValuesBlock.querySelectorAll('option');
const floorBlockValueElement = floorBlock.querySelector('.value');

floorBlock.addEventListener('click', () => {
    if (floorBlockValuesBlock.classList.contains('open'))
        floorBlockValuesBlock.classList.remove('open');
    else
        floorBlockValuesBlock.classList.add('open');
});

floorBlockValues.forEach(value => {
    value.addEventListener('click', () => {
        floorBlockSelect.value = value.value;
        floorBlockValueElement.innerText = value.value;
        console.log(floorBlockSelect.value);
    });
})

// Стоимость
const priceWrap = document.querySelector('#price-wrap');
const priceBlock = priceWrap.querySelector('#price-block');
const priceMixer = priceBlock.querySelector('.mixer');
const priceStartPoint = priceMixer.querySelector('.point-start');
const priceEndPoint = priceMixer.querySelector('.point-end');
const priceStart = priceBlock.querySelector('.value-start');
const priceEnd = priceBlock.querySelector('.value-end');
const priceMin = priceWrap.querySelector('.min-value').textContent;
const priceMax = priceWrap.querySelector('.max-value').textContent;
const priceMinInput = priceWrap.querySelector('input[name="priceMin"]');
const priceMaxInput = priceWrap.querySelector('input[name="priceMax"]');

let priceStartMixerWidth = priceMixer.clientWidth;
let priceStartMixerLeft = window.getComputedStyle(priceMixer, null).getPropertyValue('left');
let priceCurrentMixerWidth = priceStartMixerWidth;
let priceCurrentMixerLeft = parseInt(priceStartMixerLeft);
let priceStartMouseTarget;
let selectPoint;
let prevPoint = undefined;
let priceMinValue = parseFloat(priceMin);
let priceMaxValue = parseFloat(priceMax);
let priceDifferent = priceMaxValue - priceMinValue;

console.log(priceCurrentMixerLeft);

function priceMouseDown(e) {
    e.preventDefault();
    priceStartMouseTarget = e;

    selectPoint = e.target;
    prevPoint = e;
}

function priceMouseMove(e) {
    e.preventDefault();

    if (priceStartMouseTarget == undefined)
        return;

    console.log(prevPoint.clientX - e.clientX);

    if (selectPoint == priceEndPoint) {
        if (priceCurrentMixerWidth >= 0 && priceCurrentMixerWidth <= priceStartMixerWidth) {
            priceCurrentMixerWidth -= prevPoint.clientX - e.clientX;
            priceMaxValue -= ((prevPoint.clientX - e.clientX) / priceDifferent);
        } else {
            if (priceCurrentMixerWidth <= 0)
                priceCurrentMixerWidth = 0;
            else if (priceCurrentMixerWidth >= priceStartMixerWidth)
                priceCurrentMixerWidth = priceStartMixerWidth;
        }
    } else if (selectPoint == priceStartPoint) {
        if (priceCurrentMixerWidth >= 0 && priceCurrentMixerWidth <= priceStartMixerWidth) {
            priceCurrentMixerWidth += prevPoint.clientX - e.clientX;
            priceCurrentMixerLeft -= prevPoint.clientX - e.clientX;
            priceMinValue -= ((prevPoint.clientX - e.clientX) / priceDifferent);
        } else {
            if (priceCurrentMixerWidth <= 0) {
                priceCurrentMixerWidth = 0;
            } else if (priceCurrentMixerWidth >= priceStartMixerWidth) {
                priceCurrentMixerWidth = priceStartMixerWidth;
            }
        }
    }

    priceStart.innerText = `от ${Number(priceMinValue).toFixed(1)}`;
    priceEnd.innerText = `от ${Number(priceMaxValue).toFixed(1)}`;
    priceMinInput.value = Number(priceMinValue).toFixed(1);
    priceMaxValue.value = Number(priceMaxValue).toFixed(1);

    priceMixer.style.width = `${priceCurrentMixerWidth}px`;
    priceMixer.style.left = `${priceCurrentMixerLeft}px`;
    prevPoint = e;
}

function priceMouseUp(e) {
    e.preventDefault();
    priceStartMouseTarget = undefined;
}

priceWrap.addEventListener('mousedown', (e) => priceMouseDown(e));
priceWrap.addEventListener('touchstart', (e) => priceMouseDown(e));
priceWrap.addEventListener('mousemove', (e) => priceMouseMove(e));
priceWrap.addEventListener('touchmove', (e) => priceMouseMove(e));
document.addEventListener('mouseup', (e) => priceMouseUp(e));
document.addEventListener('touchend', (e) => priceMouseUp(e));
