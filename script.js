function buttonFunction () {
    var hiddenmenu = document.getElementById("hiddenmenu");
    if (hiddenmenu.style.visibility === "hidden" || hiddenmenu.style.visibility === "") {
        hiddenmenu.style.opacity = "100%"
        
        hiddenmenu.style.visibility = "visible"; 
        
    }
}

function buttonCloseFunction () {
    var hiddenmenu = document.getElementById("hiddenmenu");
    if (hiddenmenu.style.visibility === "visible") {
        hiddenmenu.style.opacity = "0%"
        setTimeout (() => {
            hiddenmenu.style.visibility = "hidden";
        }, 680
        )
    }
}

const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
const images = document.querySelectorAll('.slider-image');
let currentImage = 0;

function showImage(index) {
    images.forEach((image, i) => {
        if (i === index) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    });
}

prevButton.addEventListener('click', () => {
    currentImage = (currentImage - 1 + images.length) % images.length;
    showImage(currentImage);
});

nextButton.addEventListener('click', () => {
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage);
});