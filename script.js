const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true; 
}

//Hide loading
function complete() {
    quoteContainer.hidden = false; 
    loader.hidden = true;
}

//Show new quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;
    // Check the quote length to determine the styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, Hide loader 
    quoteText.textContent = quote.text;
    complete();
}

// // // Get Quotes From API
async function getQuotes() {
   loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
      const response = await fetch(apiUrl);  
      apiQuotes = await response.json();
      newQuote();
    //   console.log(apiQuotes );
    } catch (error){
        //Catch error here
    }
}    

// To tweet quote
function tweetQuote() {
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweeterUrl, '_blank');
} 

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes()
