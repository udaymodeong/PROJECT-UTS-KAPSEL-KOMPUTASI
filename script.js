// Closed alert when "Book" click
document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.getAttribute('data-product');
        const modal = document.getElementById("productModal");
        const modalTitle = document.getElementById("modalTitle");
        const modalImage = document.getElementById("modalImage");
        const modalDescription = document.getElementById("modalDescription");
        const destinationsDiv = document.getElementById("destinations");
        const destinationList = document.getElementById("destinationList");

        // Set the content based on the product
        let destinations = [];
        if (product === "japan") {
            modalTitle.innerText = "Explore Japan";
            modalImage.src = "images/Japan.jpeg";
            modalDescription.innerText = "Discover the beauty of Japan with our exclusive package.";
            destinations = [
                { name: "Mount Fuji", img: "images/MountFuji.jpeg", desc: "Mount Fuji is Japan's tallest peak and a symbol of beauty." },
                { name: "Tokyo Tower", img: "images/TokyoTower.jpeg", desc: "Tokyo Tower is a famous landmark offering panoramic views of Tokyo." },
                { name: "Kyoto Temples", img: "images/KyotoTemples.jpeg", desc: "Kyoto is known for its classical Buddhist temples, as well as gardens and imperial palaces." }
            ];
        } else if (product === "korea") {
            modalTitle.innerText = "Explore Korea";
            modalImage.src = "images/Korea.jpeg";
            modalDescription.innerText = "Experience the culture and heritage of Korea.";
            destinations = [
                { name: "Gyeongbokgung Palace", img: "images/Gyeongbokgung.jpeg", desc: "The largest of Seoul’s Five Grand Palaces." },
                { name: "Jeju Island", img: "images/JejuIsland.jpeg", desc: "Jeju Island is known for its volcanic landscapes and beautiful beaches." },
                { name: "Namsan Tower", img: "images/Namsan.jpeg", desc: "A popular tower offering city views from its top." }
            ];
        } else if (product === "russia") {
            modalTitle.innerText = "Explore Russia";
            modalImage.src = "images/Russia.jpeg";
            modalDescription.innerText = "Discover the vast landscapes of Russia with our special deals.";
            destinations = [
                { name: "Red Square", img: "images/Redsquare.jpeg", desc: "The Red Square is the heart of Moscow, known for its historic buildings." },
                { name: "Lake Baikal", img: "images/LakeBaikal.jpeg", desc: "The deepest freshwater lake in the world, known for its beauty and clarity." },
                { name: "Saint Basil's Cathedral", img: "images/SaintBasil.jpeg", desc: "A famous Russian Orthodox cathedral with colorful onion domes." }
            ];
        }

        // Display the modal
        modal.style.display = "flex";

        // Add each destination as a clickable image
        destinationList.innerHTML = ""; // Clear existing list
        destinations.forEach(destination => {
            const imgElement = document.createElement("img");
            imgElement.src = destination.img;
            imgElement.alt = destination.name;
            imgElement.style.width = "30%";
            imgElement.style.cursor = "pointer";
            imgElement.onclick = () => {
                showDestinationModal(destination);
            };
            destinationList.appendChild(imgElement);
        });
    });
});

// Function to show destination modal
function showDestinationModal(destination) {
    const destinationModal = document.getElementById("destinationModal");
    const destinationTitle = document.getElementById("destinationTitle");
    const destinationImage = document.getElementById("destinationImage");
    const destinationDescription = document.getElementById("destinationDescription");

    destinationTitle.innerText = destination.name;
    destinationImage.src = destination.img;
    destinationDescription.innerText = destination.desc;

    // Add destination information to the book button event
    const bookDestinationBtn = document.getElementById("bookDestinationBtn");
    bookDestinationBtn.onclick = () => {
        addToCart(destination);
    };

    destinationModal.style.display = "flex";
}

// Function to add a destination to the cart
function addToCart(destination) {
    const cartList = document.getElementById("cartDetails");
    const cartCount = document.getElementById("cartCount");
    const payButton = document.getElementById("payButton");

    // Create a container for the cart item
    const cartItem = document.createElement("div");
    cartItem.style.display = "flex";
    cartItem.style.alignItems = "center";
    cartItem.style.marginBottom = "10px";
    cartItem.classList.add("cart-item");

    // Create an image element for the destination
    const imgElement = document.createElement("img");
    imgElement.src = destination.img;
    imgElement.alt = destination.name;
    imgElement.style.width = "50px";
    imgElement.style.height = "50px";
    imgElement.style.objectFit = "cover";
    imgElement.style.marginRight = "10px";
    imgElement.style.borderRadius = "5px";

    // Create a text element for the destination name
    const nameElement = document.createElement("span");
    nameElement.textContent = destination.name;
    nameElement.style.flexGrow = "1"; // Allow text to grow and occupy available space

    // Create a cancel button element
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-btn");
    cancelButton.style.marginLeft = "10px";

    // Add event listener to cancel button
    cancelButton.addEventListener('click', () => {
        // Remove the cart item
        cartItem.remove();

        // Decrease the cart count
        const currentCount = parseInt(cartCount.textContent) || 0;
        const newCount = currentCount - 1;
        cartCount.textContent = newCount;

        // Hide the cart count if it's zero
        if (newCount <= 0) {
            cartCount.style.display = "none";
            payButton.style.display = "none";
        }
    });

    // Append the image, text, and cancel button to the cart item container
    cartItem.appendChild(imgElement);
    cartItem.appendChild(nameElement);
    cartItem.appendChild(cancelButton);

    // Append the cart item to the cart list
    cartList.appendChild(cartItem);

    // Increment the cart count and show it
    const currentCount = parseInt(cartCount.textContent) || 0;
    const newCount = currentCount + 1;
    cartCount.textContent = newCount;
    cartCount.style.display = "inline";

    // Show the Pay button when there is at least one item in the cart
    if (newCount > 0) {
        payButton.style.display = "block";
    }

    // Hide the destination modal after adding to cart
    document.getElementById("destinationModal").style.display = "none";
}

// Event listener to show cart modal when clicking the cart icon
const cartIcon = document.getElementById("cartIcon");
cartIcon.addEventListener('click', () => {
    document.getElementById("cartModal").style.display = "flex";
});

// Event listener for the Pay button to show the payment modal
const payButton = document.getElementById("payButton");
payButton.addEventListener('click', () => {
    document.getElementById("paymentModal").style.display = "flex";
});

// Close the payment modal
const paymentCloseButton = document.querySelector('.payment-close');
if (paymentCloseButton) {
    paymentCloseButton.addEventListener('click', () => {
        document.getElementById("paymentModal").style.display = "none";
    });
}

// close modal when close button clicked
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close the cart modal
const cartCloseButton = document.querySelector('.cart-close');
if (cartCloseButton) {
    cartCloseButton.addEventListener('click', () => {
        document.getElementById("cartModal").style.display = "none";
    });
}

// Closed modal
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
});



