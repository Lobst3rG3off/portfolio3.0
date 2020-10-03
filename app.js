// scroll header
window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY > 0)
});

// toggle menu
function toggleMenu(){
    const menuToggle = document.querySelector('.toggle');
    const menu = document.querySelector('.menu');
    menuToggle.classList.toggle('active')
    menu.classList.toggle('active')
}


// project viewer

const cardButtons = document.querySelectorAll('.project');
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

function handleCardButtonCLick(event) {
  console.log('clicked');
    const button = event.currentTarget;
    const card = button.closest('.project');
    //  grab the image source
    const imgSrc = card.querySelector('img').src;
    const desc = card.querySelector('figcaption').textContent;
    const name = card.querySelector('h3').textContent;
    //  populate the modal with the new info
    modalInner.innerHTML = `
<img width="600" height="600" src="${imgSrc.replace(
        '200',
        '600'
    )}" alt="${name}">
<p>${desc}</p>
`;
    // show the modal
    modalOuter.classList.add('open');
}

cardButtons.forEach(button =>
    button.addEventListener('click', handleCardButtonCLick)
);

function closeModal() {
    modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', function (event) {
    const isOutside = !event.target.closest('.modal-inner');
    console.log(isOutside);
    if (isOutside) {
        closeModal();
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

window.addEventListener('touchstart', e => {
      closeModal();
});



