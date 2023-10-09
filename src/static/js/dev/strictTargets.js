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