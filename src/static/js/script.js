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
try {
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
    })
} catch(e) {
    console.error(e);
}

// Первый экран
try {
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
        if (window.innerWidth > 992)
            target.addEventListener('click', homeTarget);
        else 
            target.addEventListener('touchstart', homeTarget);
    });
} catch(e) {
    console.error(e);
}

function radioInput(wrap) {
    // Количество комнат
    const selects = wrap.querySelectorAll('.select');

    selects.forEach(select => {
        select.addEventListener('click', () => {
            let input = select.querySelector('input');
            let condition = input.checked;

            selects.forEach(sel => {
                sel.classList.remove('selected');
                sel.querySelector('input').checked = false;
            });

            if (condition == false) {
                input.checked = true;
                select.classList.add('selected');
            } 
        });
    });
}

// Radio Inputs
try {
    const radioInputWrap = document.querySelectorAll('[data-radio]');
    radioInputWrap.forEach(wrap => {
        radioInput(wrap);
    });
} catch(e) {
    console.error(e);
}

function selectInput(block) {
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
        });
    })
}

// Select Inputs
const selectWrap = document.querySelectorAll('[data-select]').forEach(wrap => {
    selectInput(wrap);
});

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

// Информация о квартире
// Слайдер
function createSlider(slider, progress) {
    const imagesBlock = slider.querySelector('.images');
    const images = imagesBlock.querySelectorAll('img');
    let currentIndex = 0;
    progress.querySelector('.current').innerText = "1";

    progress.querySelector('.arrow-left').addEventListener('click', () => {
        images[currentIndex].classList.remove('selected');
        currentIndex--;

        if (currentIndex < 0)
            currentIndex = images.length - 1;

        images[currentIndex].classList.add('selected');

        progress.querySelector('.current').innerText = currentIndex + 1;
    });

    progress.querySelector('.arrow-right').addEventListener('click', () => {
        images[currentIndex].classList.remove('selected');
        currentIndex++;

        if (currentIndex > images.length - 1)
            currentIndex = 0;

        images[currentIndex].classList.add('selected');

        progress.querySelector('.current').innerText = currentIndex + 1;
    });
}

try {
    const slider = document.querySelector('.appartment-block .appartment-slider');
    const progress = document.querySelector('.slider-progress');
    createSlider(slider, progress);
} catch(e) {
    console.error(e);
}

// Выбор квартиры
function showAppartmentInfo(appartment) {
    const info = document.querySelector('.appartment-block');

    info.querySelector('[name="home"]').value = document.querySelector('.choose-apartment [name="selectHome"]').value;
    info.querySelector('[name="entrance"]').value = document.querySelector('.choose-apartment input[name="selectEntrance"]').value;
    info.querySelector('[name="appartment"]').value = appartment.querySelector('.number').textContent;
    info.querySelector('[name="square"]').value = appartment.querySelector('.square').textContent;
    info.querySelector('.square').innerText = appartment.querySelector('.square').textContent;
    info.querySelector('[name="roomsCount"]').value = appartment.querySelector('.rooms-count').textContent;
    info.querySelector('.rooms-count').innerText = appartment.querySelector('.rooms-count').textContent;
    info.querySelector('[name="price"]').value = appartment.querySelector('.price').textContent;
    info.querySelector('.price').innerText = appartment.querySelector('.price').textContent;
    info.querySelector('[name="hypothec"]').value = appartment.querySelector('.hypothec').textContent;
    info.querySelector('.hypothec').innerText = appartment.querySelector('.hypothec').textContent;
    info.querySelector('.light-side').innerText = appartment.querySelector('.light-side').textContent;
    info.querySelector('.appartment-plan img').src = appartment.querySelector('.plan').getAttribute('data-meta-src');

    info.querySelector('.images').innerHTML = "";

    appartment.querySelectorAll('.images img').forEach((image, index) => {
        let elem = document.createElement('img');
        elem.src = image.getAttribute('data-meta-src');
        if (index == 0) {
            elem.classList.add('selected');
        }
        info.querySelector('.images').insertAdjacentElement('beforeend', elem);
    });
}

function switchAppartment(appartment) {
    document.querySelectorAll('.home .appartment').forEach(appart => {
        appart.classList.remove('selected');
    });

    appartment.classList.add('selected');
    showAppartmentInfo(appartment);

    const slider = document.querySelector('.appartment-block .appartment-slider');
    const progress = document.querySelector('.slider-progress');
    createSlider(slider, progress);
}

try {
    if (document.querySelector('.home .home-plan .appartment.onsale') != undefined)
        switchAppartment(document.querySelector('.home .home-plan .appartment.onsale'));
    else if (document.querySelector('.home .home-plan .appartment.reserve') != undefined)
        switchAppartment(document.querySelector('.home .home-plan .appartment.booking'));
    else if (document.querySelector('.home .home-plan .appartment.booking') != undefined)
        switchAppartment(document.querySelector('.home .home-plan .appartment.booking'));
} catch(e) {
    console.error(e);
}

try {
    let event;
    if (window.innerWidth > 992)
        event = "click";
    else 
        event = "touchstart";

    const homes = document.querySelectorAll('.home').forEach(home => {
        let entrances = home.querySelectorAll('.home-plan').forEach(entrance => {
            entrance.addEventListener(event, (e) => {
                if (e.target.classList.contains('appartment')) {
                    if (e.target.classList.contains('booking') == false 
                    && e.target.classList.contains('onsale') == false
                    && e.target.classList.contains('reserve') == false)
                        return;
                    document.querySelector('.choose-apartment [name="selectEntrance"]').value = entrance.querySelector('h4').textContent.trim(' ').split(' ')[1];
                    switchAppartment(e.target);
                } else if (e.target.parentElement.classList.contains('appartment')) {
                    if (e.target.parentElement.classList.contains('booking') == false 
                    && e.target.parentElement.classList.contains('onsale') == false
                    && e.target.parentElement.classList.contains('reserve') == false)
                        return;
                    document.querySelector('.choose-apartment [name="selectEntrance"]').value = entrance.querySelector('h4').textContent.trim(' ').split(' ')[1];
                    switchAppartment(e.target.parentElement);
                }
            });
        });
    });
} catch(e) {
    console.error(e);
}

// Выбор дома
try {
    const selectWrap = document.querySelector('#home-wrap');
    const homes = document.querySelectorAll('.home');
    selectWrap.querySelectorAll('option').forEach(option => {
        option.addEventListener('click', () => {
            homes.forEach(home => {
                if (home.id == `home-${option.textContent}`) {
                    home.classList.add('selected');
                    switchAppartment(document.querySelectorAll(`#home-${option.textContent} .home-plan`)[0].querySelector('.appartment'));
                }
                else {
                    home.classList.remove('selected');
                }

                document.querySelector('input[name="selectHome"]').value = option.textContent;
            });
        });
    });
} catch(e) {
    console.error(e);
}