// Array of prompt pairs with associated impact values
const prompts = [
    {
        pair: ["Drive to work", "Bike or walk to work"],
        impacts: {
            "Drive to work": { environmental: -6, social: 1, economic: 2 },
            "Bike or walk to work": { environmental: 7, social: 5, economic: 1 }
        },
        images: {
            "Drive to work": "/assets/Drive-to-work.avif",
            "Bike or walk to work": "/assets/walk-to-work.avif"
        }
    }, 
    {
        pair: ["Invest in space exploration", "Focus on Earth-based issues"],
        impacts: {
            "Invest in space exploration": { environmental: -6, social: 7, economic: 2 },
            "Focus on Earth-based issues": { environmental: 7, social: 5, economic: -1 }
        },
        images: {
            "Invest in space exploration": "/assets/space-exploration.avif",
            "Focus on Earth-based issues": "/assets/earth-issues.avif"
        }
    },
    {
        pair: ["Buy pre-packaged groceries", "Buy loose produce and bulk items"],
        impacts: {
            "Buy pre-packaged groceries": { environmental: -7, social: -1, economic: 2 },
            "Buy loose produce and bulk items": { environmental: 4, social: 2, economic: 1 }
        },
        images: {
            "Buy pre-packaged groceries": "/assets/pre-packaged.avif",
            "Buy loose produce and bulk items": "/assets/loose-produce.avif"
        }
    },
    {
        pair: ["Implement a four-day work week", "Maintain standard five-day work week"],
        impacts: {
            "Implement a four-day work week": { environmental: 5, social: 8, economic: -4 },
            "Maintain standard five-day work week": { environmental: -2, social: -5, economic: 6 }
        },
        images: {
            "Implement a four-day work week": "/assets/four-day.avif",
            "Maintain standard five-day work week": "/assets/five-day.avif"
        }
    },
    {
        pair: ["Use disposable coffee cups", "Bring a reusable mug"],
        impacts: {
            "Use disposable coffee cups": { environmental: -3, social: -1, economic: 1 },
            "Bring a reusable mug": { environmental: 4, social: 2, economic: -1 }
        },
        images: {
            "Use disposable coffee cups": "/assets/disposable-cup.avif",
            "Bring a reusable mug": "/assets/reusable.avif"
        }
    },
    {
        pair: ["Invest in vertical farming", "Continue traditional agriculture"],
        impacts: {
            "Invest in vertical farming": { environmental: 9, social: 6, economic: -5 },
            "Continue traditional agriculture": { environmental: -7, social: -2, economic: 7 }
        },
        images: {
            "Invest in vertical farming": "/assets/vertical.avif",
            "Continue traditional agriculture": "/assets/traditional.avif"
        }
    },
    {
        pair: ["Use social media for an hour", "Read a book for an hour"],
        impacts: {
            "Use social media for an hour": { environmental: -1, social: 2, economic: 4 },
            "Read a book for an hour": { environmental: 1, social: 4, economic: 3 }
        },
        images: {
            "Use social media for an hour": "/assets/social-media.avif",
            "Read a book for an hour": "/assets/book.avif"
        }
    },
    {
        pair: ["Implement strict data privacy laws", "Allow more data collection for AI development"],
        impacts: {
            "Implement strict data privacy laws": { environmental: 0, social: 9, economic: -3 },
            "Allow more data collection for AI development": { environmental: -6, social: -6, economic: 6 }
        },
        images: {
            "Implement strict data privacy laws": "/assets/privacy.avif",
            "Allow more data collection for AI development": "/assets/ai.avif"
        }
    },
    {
        pair: ["Buy a new smartphone", "Keep using your old phone"],
        impacts: {
            "Buy a new smartphone": { environmental: -5, social: 2, economic: 4 },
            "Keep using your old phone": { environmental: 3, social: -1, economic: -2 }
        },
        images: {
            "Buy a new smartphone": "/assets/new-phone.avif",
            "Keep using your old phone": "/assets/old-phone.avif"
        }
    },
    {
        pair: ["Invest in public transportation", "Expand highways for private vehicles"],
        impacts: {
            "Invest in public transportation": { environmental: 7, social: 8, economic: -4 },
            "Expand highways for private vehicles": { environmental: -6, social: -3, economic: 5 }
        },
        images: {
            "Invest in public transportation": "/assets/tfl.avif",
            "Expand highways for private vehicles": "/assets/highway.avif"
        }
    }
];

// Initialising e variables to keep track of the current prompt index and the data arrays for environmental, social, and economic impacts
let currentPromptIndex = 0;
let environmentalData = [];
let socialData = [];
let economicData = [];
let environmentalTotal = 0;
let socialTotal = 0;
let economicTotal = 0;
const endImageUrl = "/assets/nomore.avif";



function initialiseGraph() {
    const ctx = document.getElementById('stabilityGraph').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Environmental',
                    data: [0],
                    borderColor: 'green',
                    tension: 0.1
                },
                {
                    label: 'Social',
                    data: [1],
                    borderColor: 'blue',
                    tension: 0.1
                },
                {
                    label: 'Economic',
                    data: [2],
                    borderColor: 'red',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 5,
                    suggestedMin: -5,
                }
            }
        }
    });
}


// Function to update the prompt buttons with the next prompt pair
function updatePrompts() {

    // Select all buttons with the class "prompt"
    const promptButtons = document.querySelectorAll('.prompt button');

    const promptPoints = document.querySelectorAll('.prompt .points');

    const promptImages = document.querySelectorAll('.prompt-image');



    // Check if there are more prompts to display
    if (currentPromptIndex < prompts.length) {

        const currentPrompt = prompts[currentPromptIndex];

        // Set the text content of the first button to the first option of the current prompt pair
        promptButtons[0].textContent = currentPrompt.pair[0];

        // Set the text content of the second button to the second option of the current prompt pair
        promptButtons[1].textContent = currentPrompt.pair[1];

        // Set image sources
        promptImages[0].src = currentPrompt.images[currentPrompt.pair[0]];
        promptImages[1].src = currentPrompt.images[currentPrompt.pair[1]];

        const impacts1 = currentPrompt.impacts[currentPrompt.pair[0]];
        const impacts2 = currentPrompt.impacts[currentPrompt.pair[1]];


        updatePointsDisplay(promptPoints[0], impacts1);
        updatePointsDisplay(promptPoints[1], impacts2);
        
    } else {
        // If there are no more prompts, disable all prompt buttons and set their text content to "No more prompts"
        promptButtons.forEach(button => {
            button.disabled = true;
            button.textContent = 'No more prompts';
        });
        promptPoints.forEach(points => {
            points.style.display = 'none';
        });
        promptImages.forEach(image => {
            image.src = endImageUrl;
            image.style.display = 'block';
        });
    }
}

function updatePointsDisplay(pointsElement, impacts) {
    if (pointsElement) {
        const categories = ['environmental', 'social', 'economic'];
        categories.forEach(category => {
            const valueElement = pointsElement.querySelector(`.${category} .value`);
            if (valueElement) {
                const value = impacts[category];
                valueElement.textContent = value;
                valueElement.style.color = value >= 0 ? 'green' : 'red';
            }
        });
    }
}

// Function to handle a prompt when button clicked
function handlePromptClick(choice) {
    
    // Get the current prompt based on the current prompt index
    const currentPrompt = prompts[currentPromptIndex];

    // Get the impact of the chosen option from the current prompt
    const impact = currentPrompt.impacts[choice];

    environmentalTotal += impact.environmental;
    socialTotal += impact.social;
    economicTotal += impact.economic;

    // Add the environmental, social, and economic impact values to their respective data arrays
    environmentalData.push(environmentalTotal);
    socialData.push(socialTotal);
    economicData.push(economicTotal);

    // Update the graph with the new data
    updateGraph();

    // Move to the next prompt and update the prompts buttons
    currentPromptIndex++;
    updatePrompts();
}

function updateGraph() {
    // Implement graph update logic here
    chart.data.labels.push(`Choice ${currentPromptIndex + 1}`);
    chart.data.datasets[0].data = environmentalData;
    chart.data.datasets[1].data = socialData;
    chart.data.datasets[2].data = economicData;
    chart.update();
/*     console.log("Graph updated with new data");
    console.log("Environmental:", environmentalData, "total:", environmentalTotal);
    console.log("Social:", socialData, "total:",socialTotal);
    console.log("Economic:", economicData, "total:",economicTotal); */
}

document.addEventListener('DOMContentLoaded', () => {
    initialiseGraph();
    // Start with the first prompt pair
    updatePrompts();

     // Select all buttons with the class "prompt"
    const promptButtons = document.querySelectorAll('.prompt button');

    // Add a click event listener to each prompt button
    promptButtons.forEach((button, index) => {
        button.addEventListener('click', () => handlePromptClick(button.textContent));
    });
});