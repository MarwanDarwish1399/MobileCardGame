const cardImages = [
    "1.png", "2.png", "3.png", "4.png", "5.png",
    "6.png", "7.png", "8.png", "9.png", "10.png",
    "11.png", "12.png", "13.png", "14.png", "15.png",
    "16.png", "17.png", "18.png", "19.png", "20.png"
];

let currentIndex = -1; // Start before the first card
let shownCards = []; // Array to store the order of shown cards

// Function to update the image being displayed
function updateCardImage(index) {
    const newImage = document.querySelector("#currentCardImage");
    newImage.src = cardImages[index];
    updateButtonsVisibility();
}

// Function to update the visibility of "PrevQ" and "NextQ" buttons
function updateButtonsVisibility() {
    const prevButton = document.querySelector('.PrevQ');
    const nextButton = document.querySelector('.NextQ');

    // Show/Hide "PrevQ" button based on currentIndex
    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    // Show/Hide "NextQ" button based on currentIndex and shownCards length
    if (currentIndex === shownCards.length - 1) {
        if (shownCards.length === cardImages.length) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    } else {
        nextButton.style.display = 'block';
    }
}

// Event listener for the "Start Game" button
document.getElementById('startBtn').addEventListener('click', function() {
    this.classList.add('fade-out');

    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    setTimeout(function() {
        document.querySelector('.content').style.display = 'none';
        loader.style.display = 'none';
        
        const newPage = document.getElementById('newPage');
        newPage.classList.remove('hidden');
        newPage.classList.add('visible');

        // Show the first random card
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * cardImages.length);
        } while (shownCards.includes(newIndex));

        shownCards.push(newIndex);
        currentIndex = 0; // Start at the first card in the shownCards array
        updateCardImage(shownCards[currentIndex]);

    }, 3000);
});

// Event listener for the "Next Question" button
document.querySelector('.NextQ').addEventListener('click', function() {
    if (currentIndex < shownCards.length - 1) {
        currentIndex++;
        updateCardImage(shownCards[currentIndex]);
    } else {
        // If we're at the last shown card, show a new random card
        if (shownCards.length === cardImages.length) {
            showPopupMessage("No more new cards!");
            return;
        }

        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * cardImages.length);
        } while (shownCards.includes(newIndex));

        shownCards.push(newIndex);
        currentIndex = shownCards.length - 1;
        updateCardImage(shownCards[currentIndex]);
    }
});

// Event listener for the "Previous Question" button
document.querySelector('.PrevQ').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCardImage(shownCards[currentIndex]);
    } else {
        showPopupMessage("No more previous cards!");
    }
});

// Function to show the pop-up message
function showPopupMessage(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;
    document.body.appendChild(popup);

    // Display the pop-up message
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.visibility = 'visible';
    }, 100);

    // Hide the pop-up message after 1 second
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
        setTimeout(() => {
            document.body.removeChild(popup); // Clean up the DOM
        }, 300); // Wait for fade-out transition to complete
    }, 1000);
}
// Event listener for the "End Game" button
document.getElementById('endBtn').addEventListener('click', function() {
    // Hide the game page
    const newPage = document.getElementById('newPage');
    newPage.classList.remove('visible');
    newPage.classList.add('hidden');

    // Show the start page
    document.querySelector('.content').style.display = 'block';
    document.getElementById('startBtn').classList.remove('fade-out');

    // Reset game state
    currentIndex = -1;
    shownCards = [];
    updateButtonsVisibility();

    // Optionally, you can also hide the loader if it's displayed
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});
// Function to update the image being displayed
function updateCardImage(index) {
    const newImage = document.querySelector("#currentCardImage");
    newImage.src = cardImages[index];
    updateButtonsVisibility();

    // Optional: Adjust image size based on screen size
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
        newImage.style.maxWidth = '90%';
        newImage.style.maxHeight = '50%';
    } else if (screenWidth <= 768) {
        newImage.style.maxWidth = '80%';
        newImage.style.maxHeight = '60%';
    } else {
        newImage.style.maxWidth = '70%';
        newImage.style.maxHeight = '70%';
    }
}
