// Load quotes from localStorage or use default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit is your mind.", category: "inspiration" },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    category: "humor",
  },
  { text: "Simplicity is the soul of efficiency.", category: "wisdom" },
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote and store it in sessionStorage
function showRandomQuote() {
  const display = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    display.innerHTML = "<em>No quotes available.</em>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  display.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
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
  addButton.innerHTML = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Add a new quote and save to localStorage
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    alert("Quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both the quote and the category.");
  }
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Failed to parse JSON.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Restore last viewed quote from sessionStorage
function restoreLastQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById(
      "quoteDisplay"
    ).innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  }
}

// Setup buttons and inputs
function setupControls() {
  const exportBtn = document.createElement("button");
  exportBtn.innerHTML = "Export Quotes";
  exportBtn.addEventListener("click", exportToJsonFile);

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);

  document.body.appendChild(exportBtn);
  document.body.appendChild(importInput);
}
function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const selected = localStorage.getItem("selectedCategory") || "all";

  // Clear existing options
  filter.innerHTML = `<option value="all">All Categories</option>`;

  // Get unique categories
  const categories = [...new Set(quotes.map((q) => q.category))];

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.text = cat;
    if (cat === selected) option.selected = true;
    filter.appendChild(option);
  });
}
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const display = document.getElementById("quoteDisplay");
  const filtered =
    selected === "all" ? quotes : quotes.filter((q) => q.category === selected);

  if (filtered.length === 0) {
    display.innerHTML = "<em>No quotes in this category.</em>";
  } else {
    const quote = filtered[Math.floor(Math.random() * filtered.length)];
    display.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  }
}


// Initialize everything
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
createAddQuoteForm();
setupControls();
restoreLastQuote();
populateCategories();
filterQuotes(); // Show filtered quote on load
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);