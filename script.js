const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
let count = 5;
const apiKey = config.MY_KEY;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 15;
	}
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements For Links & Photos, Add to Dom
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement("a");
		// item.setAttribute("href", photo.links.html);
		// item.setAttribute("target", "_blank");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
		// Create <img> for photo
		const img = document.createElement("img");
		// img.setAttribute("alt", photo.alt_description);
		// img.setAttribute("title", photo.alt_description);
		// img.setAttribute("src", photo.urls.regular);
		setAttributes(img, {
			alt: photo.alt_description,
			title: photo.alt_description,
			src: photo.urls.regular,
		});
		// Event Listener, check when each is finished loading
		img.addEventListener("load", imageLoaded());

		// Put <img> inside <a>, then put both inside the image container
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		// console.log(photosArray[1].urls.regular);
	} catch (error) {}
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
