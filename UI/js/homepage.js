class HomePage {
    constructor() {
        this.showModal();
        this.scrollLoader();
    }

    showModal() {
        const modal = document.querySelector('#myModal');
        const img = document.querySelectorAll('#myImg');
        const display = document.querySelectorAll('.single-article-gallery');
        const modalImg = document.querySelector("#img01");
        const captionText = document.querySelector("#caption");
        for (let image of display) {
            image.addEventListener('click', (e) => {
                const singleImage = e.currentTarget.querySelector('img');
                modal.style.display = "block";
                modalImg.src = singleImage.src;
                captionText.innerHTML = singleImage.alt;
            });
        }
        const span = document.querySelector(".close");

        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    scrollLoader() {
        document.addEventListener('scroll', this.scrollFunction);
    }

    scrollFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.querySelector(".navbar").style.padding = "30px 10px";
            document.querySelector(".logo").style.fontSize = "25px";
        } else {
            document.querySelector(".navbar").style.padding = "50px 10px";
            document.querySelector(".logo").style.fontSize = "35px";
        }
    }

}

document.addEventListener("DOMContentLoaded", new HomePage());