let catPhotos = [];

const catsContainer = document.querySelector('.cats-container');
const footer = document.querySelector('footer');

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  const keys = Object.keys(attributes);
  for (let i = 0; i < keys.length; i += 1) {
    element.setAttribute(keys[i], attributes[keys[i]]);
  }
}

// Unsplash API
const count = 3;

// This is not the right way to store API keys publicly
const APIkey = 'UzuCu6HPFpLiZb4Z2NvHES6PXmupyULEemFxzZtMT0U';
const query = 'cat';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIkey}&query=${query}&count=${count}`;

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  // Run function for each object in photosArray
  catPhotos.forEach((photo) => {
    // Create <a> to link to full photo
    const link = document.createElement('a');
    setAttributes(link, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      class: 'cat-img',
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put <img> inside <a>, then put both inside imageContainer Element
    link.appendChild(img);
    catsContainer.appendChild(link);
  });
}
// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    catPhotos = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      getPhotos();
    });
  },
  {
    rootMargin: '200px',
  }
);

// Start observing
observer.observe(document.querySelector('.end-observer'));

// Footer
const currentYear = new Date().getFullYear();
const spanEl = document.createElement('span');
spanEl.textContent = currentYear;
footer.append(spanEl);

// on load
getPhotos();
