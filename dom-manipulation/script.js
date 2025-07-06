// Initialize quotes array
let quotes = [
  { text: "The only limit is your mind.", category: "inspiration" },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    category: "humor",
  },
  { text: "Simplicity is the soul of efficiency.", category: "wisdom" },
];

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById(
    "quoteDisplay"
  ).innerHTML = `"${quote.text}" — ${quote.category}`;
}

// Add a new quote from the form
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added!");
    textInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please fill in both the quote and the category.");
  }
}

// Attach event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
createAddQuoteForm();