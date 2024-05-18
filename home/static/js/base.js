const btnCollapse = document.getElementById('btn-collapse');
const topBar = document.getElementById('top-bar');
const middleBar = document.getElementById('middle-bar');
const bottomBar = document.getElementById('bottom-bar');

let isWhite = false;

btnCollapse.addEventListener('click', function () {
    if (isWhite) {
        topBar.style.position = 'absolute';
        topBar.style.top = '0px';
        topBar.style.transform = 'rotate(0deg)';

        middleBar.style.opacity = '1';
        middleBar.style.position = 'absolute';
        middleBar.style.top = '10px';
        middleBar.style.filter = 'alpha(opacity=100)';

        bottomBar.style.position = 'absolute';
        bottomBar.style.top = '20px';
        bottomBar.style.transform = 'rotate(0deg)';

    } else {
        topBar.style.top = 'inherit';
        topBar.style.transform = 'rotate(135deg)';

        middleBar.style.opacity = '0';
        middleBar.style.top = 'inherit';
        middleBar.style.filter = 'alpha(opacity=0)';

        bottomBar.style.top = 'inherit';
        bottomBar.style.transform = 'rotate(-135deg)';
    }
    isWhite = !isWhite;
});

document.addEventListener('DOMContentLoaded', function () {
    const accordionTabs = document.querySelectorAll('.accordion-tab');

    accordionTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const content = this.nextElementSibling;

            this.parentElement.classList.toggle('active');
            this.classList.toggle('active');

            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});


var owl = $('.team_slider').owlCarousel({
    loop: true,
    responsiveClass: true,
    nav: false,
    dots: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 400,
    center: true,
    responsive: {
        0: {
            items: 2,
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
});