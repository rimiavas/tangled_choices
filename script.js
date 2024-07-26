// Array of prompt pairs with associated impact values
const prompts = [
    {
        pair: ["Drive to work", "Bike or walk to work"],
        impacts: {
            "Drive to work": { environmental: -4, social: -2, economic: -2 },
            "Bike or walk to work": { environmental: 5, social: 4, economic: 3 }
        }
    },
    {
        pair: ["Invest in space exploration", "Focus on Earth-based issues"],
        impacts: {
            "Invest in space exploration": { environmental: -3, social: 7, economic: 8 },
            "Focus on Earth-based issues": { environmental: 6, social: 5, economic: -2 }
        }
    },
    {
        pair: ["Buy pre-packaged groceries", "Buy loose produce and bulk items"],
        impacts: {
            "Buy pre-packaged groceries": { environmental: -4, social: -1, economic: 1 },
            "Buy loose produce and bulk items": { environmental: 4, social: 2, economic: 1 }
        }
    },
    {
        pair: ["Implement a four-day work week", "Maintain standard five-day work week"],
        impacts: {
            "Implement a four-day work week": { environmental: 5, social: 8, economic: -4 },
            "Maintain standard five-day work week": { environmental: -2, social: -5, economic: 6 }
        }
    },
    {
        pair: ["Use disposable coffee cups", "Bring a reusable mug"],
        impacts: {
            "Use disposable coffee cups": { environmental: -3, social: -1, economic: 1 },
            "Bring a reusable mug": { environmental: 4, social: 2, economic: -1 }
        }
    },
    {
        pair: ["Invest in vertical farming", "Continue traditional agriculture"],
        impacts: {
            "Invest in vertical farming": { environmental: 9, social: 6, economic: -5 },
            "Continue traditional agriculture": { environmental: -7, social: -2, economic: 7 }
        }
    },
    {
        pair: ["Use social media for an hour", "Read a book for an hour"],
        impacts: {
            "Use social media for an hour": { environmental: -1, social: -3, economic: 2 },
            "Read a book for an hour": { environmental: 0, social: 4, economic: 1 }
        }
    },
    {
        pair: ["Implement strict data privacy laws", "Allow more data collection for AI development"],
        impacts: {
            "Implement strict data privacy laws": { environmental: 0, social: 9, economic: -5 },
            "Allow more data collection for AI development": { environmental: 2, social: -6, economic: 8 }
        }
    },
    {
        pair: ["Buy a new smartphone", "Keep using your old phone"],
        impacts: {
            "Buy a new smartphone": { environmental: -5, social: 2, economic: 4 },
            "Keep using your old phone": { environmental: 3, social: -1, economic: -2 }
        }
    },
    {
        pair: ["Invest in public transportation", "Expand highways for private vehicles"],
        impacts: {
            "Invest in public transportation": { environmental: 7, social: 8, economic: -4 },
            "Expand highways for private vehicles": { environmental: -6, social: -3, economic: 5 }
        }
    }

    //to add more promts here
];

// Initialising e variables to keep track of the current prompt index and the data arrays for environmental, social, and economic impacts
let currentPromptIndex = 0;
let environmentalData = [];
let socialData = [];
let economicData = [];

// Function to update the prompt buttons with the next prompt pair
function updatePrompts() {

    // Select all buttons with the class "prompt"
    const promptButtons = document.querySelectorAll('.prompt button');

    // Check if there are more prompts to display
    if (currentPromptIndex < prompts.length) {
        // Set the text content of the first button to the first option of the current prompt pair
        promptButtons[0].textContent = prompts[currentPromptIndex].pair[0];

         // Set the text content of the second button to the second option of the current prompt pair
        promptButtons[1].textContent = prompts[currentPromptIndex].pair[1];
    } else {
        // If there are no more prompts, disable all prompt buttons and set their text content to "No more prompts"
        promptButtons.forEach(button => {
            button.disabled = true;
            button.textContent = 'No more prompts';
        });
    }
}

// Function to handle a prompt when button clicked
function handlePromptClick(choice) {
    
    // Get the current prompt based on the current prompt index
    const currentPrompt = prompts[currentPromptIndex];

    // Get the impact of the chosen option from the current prompt
    const impact = currentPrompt.impacts[choice];

    // Add the environmental, social, and economic impact values to their respective data arrays
    environmentalData.push(impact.environmental);
    socialData.push(impact.social);
    economicData.push(impact.economic);

    // Update the graph with the new data
    updateGraph();

    // Move to the next prompt and update the prompts buttons
    currentPromptIndex++;
    updatePrompts();
}

function updateGraph() {
    // Implement graph update logic here
    console.log("Graph updated with new data");
    console.log("Environmental:", environmentalData);
    console.log("Social:", socialData);
    console.log("Economic:", economicData);
}

document.addEventListener('DOMContentLoaded', () => {
    // Start with the first prompt pair
    updatePrompts();

     // Select all buttons with the class "prompt"
    const promptButtons = document.querySelectorAll('.prompt button');

    // Add a click event listener to each prompt button
    promptButtons.forEach((button, index) => {
        button.addEventListener('click', () => handlePromptClick(button.textContent));
    });
});