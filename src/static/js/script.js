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
                    info.style.opacity = '0';
                });
    
                target.classList.add('selected');
                targetInfo.style.opacity = '1';
            } else {
                target.classList.remove('selected');
                targetInfo.style.opacity = "0";
            }
        }
    
        target.addEventListener('click', homeTarget);
        target.addEventListener('touchend', homeTarget);
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
try {
    const wrap = document.querySelector('#price-wrap');
    const rangeInput = wrap.querySelectorAll('input[type="range"]');
    const progress = wrap.querySelector('.progress div');

    rangeInput.forEach(input => {
        input.addEventListener('input', e => {
            let minVal = parseFloat(rangeInput[0].value),
                maxVal = parseFloat(rangeInput[1].value);
            
            let percent = ((parseFloat(input.max) - parseFloat(input.min))) / 100;
            console.log(minVal / rangeInput[0].max);
            progress.style.left = minVal * percent + "%";
        });
    });
} catch(e) {
    console.error(e);
}