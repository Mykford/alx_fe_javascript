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
    document.getElementById("quoteDisplay").innerText = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById(
    "quoteDisplay"
  ).innerText = `"${quote.text}" — ${quote.category}`;
}

// Dynamically create the form for adding quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "quoteForm";
  formContainer.style.marginTop = "20px";

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";
  inputText.style.marginRight = "10px";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";
  inputCategory.style.marginRight = "10px";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Add a new quote from the dynamically created form
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

// Create the form on page load
createAddQuoteForm();
