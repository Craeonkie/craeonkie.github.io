////// Ham Icon and Buttons
// Variables
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");
const hamIcon = document.querySelector("#hamIcon");
const closeIcon = document.querySelector("#closeIcon");
const navBar = document.querySelector("#navBar");
var allButtons = document.querySelectorAll(".button");
var allpages = document.querySelectorAll(".page");
var buttonPopSound = new Audio("Audio/PopSFX.mp3");
var cardFlipSound = new Audio("Audio/CardFlipSFX.mp3");

// Hides all subtopic pages
function hideall()
{
    for(let onepage of allpages)
    {
        //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}

// Show the selected page number
function show(pgno)
{
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display= "block"; //show the page
}

// Toggle buttons
function revealButtonDisplay()
{
    navBar.style.transform = "translateY(0%)";
}

function hideButtonDisplay()
{
    navBar.style.transform = "translateY(-100%)";
}

////// Background Image Changing
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideIntervalTime = 5000;

// Change displayed image to next one in array
function showNextSlide()
{
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('showSlide'));

    // Show the current slide
    slides[currentSlide].classList.add('showSlide');

    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
}

////// Home Page Links
const goTo1 = document.querySelector("#goTo1");
const goTo2 = document.querySelector("#goTo2");
const goTo3 = document.querySelector("#goTo3");

////// Flipping Cards
var allcards = document.querySelectorAll(".flipCard");
var html = document.querySelector("html");
let imageScale = 2;
let innerHeightMultiplier = 0.56;
let cardHeightEven = true;

// Flips the card over and sends it to the center of the screen
function flipCard(card) {

    if (card.classList.contains('flipped'))
    {
        card.classList.remove('flipped');
        card.style.transform = `translate(0px, 0px)`
        html.style.overflowY = `visible`;
    }
    else
    {
        cardFlipSound.cloneNode(true).play();

        allcards.forEach(cardTemp => {
            cardTemp.classList.remove('flipped');
            cardTemp.style.transform = `translate(0px, 0px)`
            cardTemp.style.zIndex = `0`;
            cardTemp.parentElement.style.zIndex = `0`;
            cardTemp.parentElement.parentElement.style.zIndex = `0`;
            html.style.overflowY = `visible`;

            const lastChild = card.lastElementChild;
            lastChild.style.height = '100%';
        })  
        
        requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            // Calculate element center
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            // Calculate screen center
            const screenCenterX = window.innerWidth / 2;
            const screenCenterY = window.innerHeight * innerHeightMultiplier;
            // Calculate shift needed
            const offsetX = screenCenterX - cardCenterX;
            const offsetY = screenCenterY - cardCenterY;
            // Apply transform to center it
            card.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${imageScale}) rotateY(180deg)`;
            card.style.zIndex = `99`;
            card.parentElement.style.zIndex = `99`;
            card.parentElement.parentElement.style.zIndex = `99`;
            card.classList.add('flipped');
            html.style.overflowY = `hidden`;

            const lastChild = card.lastElementChild;
            if (!cardHeightEven)
            {
                lastChild.style.height = '20vh';
            }
        });
    }
}

////// Pet Simulator
const shopMenuButton = document.querySelector("#buyMenuButton");
const shop = document.querySelector("#buyMenu");
const buyPetSubmit = document.querySelector("#buyPet");
const moneyDisplay = document.querySelector("#moneyDisplay");
let money = 15;
var crabSound = new Audio("Audio/CrabSound.mp3");
var scorpionSound = new Audio("Audio/ScorpionSound.mp3");
var spiderSound = new Audio("Audio/SpiderSound.mp3");
var centipedeSound = new Audio("Audio/CentipedeSound.mp3");
var beeSound = new Audio("Audio/BeeSound.mp3");

// Toggles Menu Ham Icon
function toggleBuyMenu()
{
    if (shop.style.opacity == 0)
    {
        shop.style.opacity = 1;
        shop.style.pointerEvents = "auto";
        shop.style.zIndex = "2";
    }
    else
    {
        shop.style.opacity = 0;
        shop.style.pointerEvents = "none";
        shop.style.zIndex = "-10";
    }
}
// Spawn Pet
function spawnPet(name, type) {
    //// Actual pet creation
    const pet = document.createElement('div');
    pet.classList.add('pet');

    // Create the name tag
    const nameTag = document.createElement('div');
    nameTag.classList.add('petName');
    nameTag.innerHTML = name;

    // Create the image
    const img = document.createElement('img');
    img.classList.add('petImg');

    // Position randomly
    const playArea = document.getElementById('page5');
    const petSize = 80;
    const x = Math.random() * (playArea.clientWidth - petSize);
    const y = Math.random() * (playArea.clientHeight - petSize);
    pet.style.left = x + 'px';
    pet.style.top = y + 'px';

    // Assemble pet element
    pet.appendChild(nameTag);
    pet.appendChild(img);

    // Set pet image and behaviour based on type
    if (type == "Crab")
    {
        let moneyEarnedByPet = 1;
        img.src = 'Images/Crab1.jpg';
        pet.addEventListener('click', () => {crabSound.cloneNode(true).play();});

        // Earning money
        setInterval(() => {
            document.getElementById('moneyDisplay').innerText = `Money: $${money}`;
            petEarnsMoney(pet, moneyEarnedByPet, true);
        }, 2000);
    
        // Moving around
        setInterval(() => {
            pet.style.left = Math.random() * (playArea.clientWidth - petSize) + 'px';
            pet.style.top = Math.random() * (playArea.clientHeight - petSize) + 'px';
            if (Math.random() < 0.1)
            {
                crabSound.cloneNode(true).play();
            }
        }, Math.random() * 8000 + 7000);

        // Click pet for money
        addPetClickEvent(pet, moneyEarnedByPet);
    }
    else if (type == "Scorpion")
    {
        let moneyEarnedByPet = 5;
        img.src = 'Images/ScorpionPet.jpg';
        pet.addEventListener('click', () => {scorpionSound.cloneNode(true).play();});

        // Earning money
        setInterval(() => {
            document.getElementById('moneyDisplay').innerText = `Money: $${money}`;
            petEarnsMoney(pet, moneyEarnedByPet, true);
        }, 1500);
    
        // Moving around
        setInterval(() => {
            pet.style.left = Math.random() * (playArea.clientWidth - petSize) + 'px';
            pet.style.top = Math.random() * (playArea.clientHeight - petSize) + 'px';
            if (Math.random() < 0.1)
            {
                scorpionSound.cloneNode(true).play();
            }
        }, Math.random() * 8000 + 7000);

        // Click pet for money
        addPetClickEvent(pet, moneyEarnedByPet);
    }
    else if (type == "Spider")
    {
        let moneyEarnedByPet = 30;
        img.src = 'Images/SpiderPet.webp';
        pet.addEventListener('click', () => {spiderSound.cloneNode(true).play();});

        // Earning money
        setInterval(() => {
            document.getElementById('moneyDisplay').innerText = `Money: $${money}`;
            petEarnsMoney(pet, moneyEarnedByPet, true);
        }, 1000);
    
        // Moving around
        setInterval(() => {
            pet.style.left = Math.random() * (playArea.clientWidth - petSize) + 'px';
            pet.style.top = Math.random() * (playArea.clientHeight - petSize) + 'px';
            if (Math.random() < 0.1)
            {
                spiderSound.cloneNode(true).play();
            }
        }, Math.random() * 8000 + 7000);

        // Click pet for money
        addPetClickEvent(pet, moneyEarnedByPet);
    }
    else if (type == "Centipede")
    {
        let moneyEarnedByPet = 70;
        img.src = 'Images/CentipedePet.webp';
        pet.addEventListener('click', () => {centipedeSound.cloneNode(true).play();});

        // Earning money
        setInterval(() => {
            document.getElementById('moneyDisplay').innerText = `Money: $${money}`;
            petEarnsMoney(pet, moneyEarnedByPet, true);
        }, 750);
    
        // Moving around
        setInterval(() => {
            pet.style.left = Math.random() * (playArea.clientWidth - petSize) + 'px';
            pet.style.top = Math.random() * (playArea.clientHeight - petSize) + 'px';
            if (Math.random() < 0.1)
            {
                centipedeSound.cloneNode(true).play();
            }
        }, Math.random() * 8000 + 7000);

        // Click pet for money
        addPetClickEvent(pet, moneyEarnedByPet);
    }
    else if (type == "Bee")
    {
        let moneyEarnedByPet = 150;
        img.src = 'Images/BeePet.jpg';
        pet.addEventListener('click', () => {beeSound.cloneNode(true).play();});

        // Earning money
        setInterval(() => {
            document.getElementById('moneyDisplay').innerText = `Money: $${money}`;
            petEarnsMoney(pet, moneyEarnedByPet, true);
        }, 500);
    
        // Moving around
        setInterval(() => {
            pet.style.left = Math.random() * (playArea.clientWidth - petSize) + 'px';
            pet.style.top = Math.random() * (playArea.clientHeight - petSize) + 'px';
            if (Math.random() < 0.1)
            {
                beeSound.cloneNode(true).play();
            }
        }, Math.random() * 8000 + 7000);

        // Click pet for money
        addPetClickEvent(pet, moneyEarnedByPet);
    }

    playArea.appendChild(pet);

    return pet;
}
// Buys pet if user has enough money
function buyPet(name, type) {
    let petCost;
    
    if (type == "Crab")
    {
        petCost = 15;
    }
    else if (type == "Scorpion")
    {
        petCost = 100;
    }
    else if (type == "Spider")
    {
        petCost = 750;
    }
    else if (type == "Centipede")
    {
        petCost = 1500;
    }
    else if (type == "Bee")
    {
        petCost = 3500;
    }

    if (money >= petCost) {
        money -= petCost;
        const newPet = spawnPet(name, type);
    }
    else {
        alert("Not enough money!");
    }
}
// Adds ability to click pet for money
function addPetClickEvent(pet, moneyEarnedByPet)
{
    pet.addEventListener('click', () => {
        petEarnsMoney(pet, moneyEarnedByPet, false);
    });
}
// Pet earning money function
function petEarnsMoney(pet, moneyEarnedByPet, moneyEarnedNaturally)
{
    // Reward text
    const moneyIcon = document.createElement('div');
    moneyIcon.classList.add('moneyClick');
    moneyIcon.innerText = '$' + moneyEarnedByPet;

    if (moneyEarnedNaturally == true)
    {
        moneyIcon.style.color = "rgb(0, 69, 0)";
    }

    // Add to play area
    pet.appendChild(moneyIcon);

    // Animate then remove
    setTimeout(() => {
        moneyIcon.style.transform = 'translateY(-50px)';
    }, 0);
    setTimeout(() => {
        moneyIcon.style.opacity = '0';
    }, 750);
    setTimeout(() => {
        moneyIcon.remove();
    }, 1500);

    // Actually paying out the money
    money += moneyEarnedByPet;
    document.getElementById('moneyDisplay').innerText = `Money: $${money}`;
}

//// Event Listeners
// Overall
window.addEventListener("resize", () => {
  if (window.innerWidth > 800)
    {
        imageScale = 2;
        innerHeightMultiplier = 0.56;
        cardHeightEven = true;
    }
});
window.addEventListener("resize", () => {
  if (window.innerWidth <= 800)
    {
        imageScale = 3;
        innerHeightMultiplier = 0.44;
        cardHeightEven = false;
    }
});
// Menu buttons
page1btn.addEventListener("click", function(){show(1); buttonPopSound.cloneNode(true).play();});
page2btn.addEventListener("click", function(){show(2); buttonPopSound.cloneNode(true).play();});
page3btn.addEventListener("click", function(){show(3); buttonPopSound.cloneNode(true).play();});
page4btn.addEventListener("click", function(){show(4); buttonPopSound.cloneNode(true).play();});
page5btn.addEventListener("click", function(){show(5); buttonPopSound.cloneNode(true).play();});
hamIcon.addEventListener("click", revealButtonDisplay);
closeIcon.addEventListener("click", hideButtonDisplay);
window.addEventListener("resize", () => {
  if (window.innerWidth > 800)
    {
        revealButtonDisplay();
    }
});
window.addEventListener("resize", () => {
  if (window.innerWidth <= 800)
    {
        hideButtonDisplay();
    }
});
// Home Page Links
goTo1.addEventListener("click", function(){show(2);});
goTo2.addEventListener("click", function(){show(3);});
goTo3.addEventListener("click", function(){show(4);});
// Flipping Cards
allcards.forEach(card => {
    card.addEventListener("click", () => { flipCard(card);});
});
// Game
shopMenuButton.addEventListener("click", function(){toggleBuyMenu();});
shop.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the selected pet type
    const petType = document.querySelector('input[name="petType"]:checked').value;

    // Get the entered pet name
    const petName = document.getElementById("petNameInput").value;
    document.getElementById("petNameInput").value = "";
    buyPet(petName, petType);
});

//// Functions to run on website open
show(1);

// Alternate between slides
showNextSlide();
setInterval(showNextSlide, slideIntervalTime);

// Sets accordingly for mobile and computer
if (window.innerWidth > 800)
{
    imageScale = 2;
    innerHeightMultiplier = 0.56;
    cardHeightEven = true;
}
else
{
    imageScale = 3;
    innerHeightMultiplier = 0.44;
    cardHeightEven = false;
}