const access_key = 'TLuyYgXGWcRq5EXgoGzEM7eAbDPjPTQ-VBsAhlz9SZc';
const gallery = document.querySelector('.gallery');
const popup = document.querySelector('.image-popup');
const downloadBtn = document.querySelector('.download-btn');
const closeBtn = document.querySelector('.close-btn');
const image = document.querySelector('.large-img');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const preBtns = document.querySelector('.pre-btns');
const nxtBtns = document.querySelector('.nxt-btns');

let currentImage = 0;
let allImages = [];

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;

const getImages = () => {
    fetch(random_photo_url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            allImages = data;
            makeImages(allImages);
        })
        .catch(error => console.error('Error fetching random images:', error));
}

const searchImages = (query) => {
    const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${query}&per_page=30`;

    fetch(search_photo_url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            allImages = data.results;
            makeImages(allImages);
        })
        .catch(error => console.error('Error searching images:', error));
}

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query !== '') {
        searchImages(query);
    }
});

const makeImages = (data) => {
    gallery.innerHTML = ''; // Clear existing images
    data.forEach((item, index) => {
        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img';
        gallery.appendChild(img);

        img.addEventListener('click', () => {
            currentImage = index;
            showPopup(item);
        });
    });
}

const showPopup = (item) => {
    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;
}

closeBtn.addEventListener('click', () => {
    popup.classList.add('hide');
});

preBtns.addEventListener('click', () => {
    if (currentImage > 0) {
        currentImage--;
        showPopup(allImages[currentImage]);
    }
});

nxtBtns.addEventListener('click', () => {
    if (currentImage < allImages.length - 1) {
        currentImage++;
        showPopup(allImages[currentImage]);
    }
});

// Initial fetch
getImages();
