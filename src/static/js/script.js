try {
    document.querySelectorAll('input.number').forEach(input => {
        let regex = new RegExp("/[0-9]/");
        input.addEventListener('input', (e) => {
            if (isNaN(e.data) && e.data != null && e.data != ".") {
                if (e.data == "." && input.value.match(/./g).length > 1)
                    return;
                
                input.value = input.value.slice(0, -1);
            } else {
                input.value = parseFloat(input.value).toFixed(1);
            }
        });
    });
} catch(e) {
    console.error(e);
}

// Бургер
const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const cross = document.querySelector('.cross');

burgerMenu.style.left = `-${burgerMenu.clientWidth}px`;
burgerMenu.style.transitionDuration = "500ms";

burger.addEventListener('click', () => {
    burgerMenu.style.left = "0";
});

burger.addEventListener('touchend', () => {
    burgerMenu.style.left = "0";
});

cross.addEventListener('click', () => {
    burgerMenu.style.left = `-${burgerMenu.clientWidth}px`;
});

cross.addEventListener('touchend', () => {
    burgerMenu.style.left = `-${burgerMenu.clientWidth}px`;
});

const burgerMenuNavItems = burgerMenu.querySelectorAll('nav p');
const navActive = burgerMenu.querySelector('.nav-active');

burgerMenuNavItems.forEach((item, index) => {
    function moveBurgerCursor() {
        burgerMenuNavItems.forEach((navItem, navIndex) => {
            navActive.classList.remove(`nav-active-${navIndex+1}`);
        });
    
        navActive.classList.add(`nav-active-${index+1}`);
    }

    item.addEventListener('mouseover', moveBurgerCursor);
    item.addEventListener('touchstart', moveBurgerCursor);
});

    // Первый экран
    const targetBlocks = document.querySelectorAll(".target-block");
    
    targetBlocks.forEach(block => {
        let target = block.querySelector('.target');
        let targetInfo = block.querySelector('.target-info');
    
        function homeTarget() {
            if (target.classList.contains('selected') == false) {
                document.querySelectorAll('.target').forEach(tar => {
                    tar.classList.remove('selected');
                });
        
                document.querySelectorAll('.target-info').forEach(info => {
                    setTimeout(() => {
                        if (info != targetInfo)
                            info.classList.remove('open');
                    }, 500);
                });
    
                target.classList.add('selected');
                targetInfo.classList.add('open');

            } else {
                target.classList.remove('selected');
                targetInfo.classList.remove('open');
            }
        }
    
        if (window.clientWidth > 992)
            target.addEventListener('click', homeTarget);
        else 
            target.addEventListener('touchstart', homeTarget);
    });

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

function selectInput(wrapSelector) {
    const block = document.querySelector(wrapSelector);
    const blockSelect = block.querySelector('select');
    const blockValuesBlock = block.querySelector('.select-values');
    const blockValues = blockValuesBlock.querySelectorAll('option');
    const blockValueElement = block.querySelector('.value');

    block.addEventListener('click', () => {
        let condition = blockValuesBlock.classList.contains('open');

        document.querySelectorAll('.select-values.open').forEach(openedSelect => {
            openedSelect.classList.remove('open');
        }); 

        if (condition)
            blockValuesBlock.classList.remove('open');
        else
            blockValuesBlock.classList.add('open');
    });
    blockValues.forEach(value => {
        value.addEventListener('click', () => {
            blockSelect.value = value.value;
            blockValueElement.innerText = value.value;
            console.log(blockSelect.value);
        });
    })
}

// Этаж
try {
    selectInput('#floor-wrap');
} catch(e) {
    console.error(e);
}

// Тип квартиры 
try {
    selectInput('#type-wrap');
} catch(e) {
    console.error(e);
}

function rangeInput(wrapSelector, priceGap) {
    const wrap = document.querySelector(wrapSelector),
          rangeInput = wrap.querySelectorAll('input[type="range"]'),
          progress = wrap.querySelector('.progress div'),
          priceFields = wrap.querySelectorAll('.value');

    rangeInput.forEach(input => {
        input.addEventListener('input', e => {
            let minVal = parseFloat(rangeInput[0].value),
                maxVal = parseFloat(rangeInput[1].value);

            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-start") {
                    rangeInput[0].value = maxVal - priceGap;
                } else if (e.target.className === "range-end") {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                priceFields[0].innerText = `от ${minVal}`;
                priceFields[1].innerText = `до ${maxVal}`;
                progress.style.left = ((minVal - rangeInput[1].min) / (rangeInput[1].max - rangeInput[1].min)) * 100 + "%";
                progress.style.right = 100 - ((maxVal - rangeInput[1].min) / (rangeInput[1].max - rangeInput[1].min)) * 100 + "%";
            }
        });
    });
}

// Стоимость
try {
    rangeInput('#price-wrap', 0.5);
} catch(e) {
    console.error(e);
}

// Площадь
try {
    rangeInput('#square-wrap', 1);
} catch(e) {
    console.error(e);
}