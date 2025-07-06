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

// Display a random quote or filtered quote
function showRandomQuote(filteredList = quotes) {
  const display = document.getElementById("quoteDisplay");

  if (filteredList.length === 0) {
    display.innerHTML = "<em>No quotes available.</em>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredList.length);
  const quote = filteredList[randomIndex];
  display.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Create the form dynamically
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

// Add a new quote and update categories
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories(); // Update dropdown
    alert("Quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both the quote and the category.");
  }
}

// Populate category dropdown dynamically
function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const selected = localStorage.getItem("selectedCategory") || "all";

  // Clear existing options
  filter.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Categories"; // ✅ using textContent
  filter.appendChild(defaultOption);

  const categories = [...new Set(quotes.map((q) => q.category))];

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat; // ✅ using textContent
    if (cat === selected) option.selected = true;
    filter.appendChild(option);
  });
}


// Filter quotes by selected category
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const filtered =
    selected === "all" ? quotes : quotes.filter((q) => q.category === selected);

  showRandomQuote(filtered);
}

// Restore last viewed quote
function restoreLastQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById(
      "quoteDisplay"
    ).innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  }
}

// Initialize
document.getElementById("newQuote").addEventListener("click", () => {
  const selected = document.getElementById("categoryFilter").value;
  const filtered =
    selected === "all" ? quotes : quotes.filter((q) => q.category === selected);
  showRandomQuote(filtered);
});
async function syncWithServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Simulate server quotes format
    const serverQuotes = serverData.slice(0, 5).map((post) => ({
      text: post.title,
      category: "server",
    }));

    const localTexts = new Set(quotes.map((q) => q.text));
    const newQuotes = serverQuotes.filter((q) => !localTexts.has(q.text));

    if (newQuotes.length > 0) {
      quotes.push(...newQuotes);
      saveQuotes();
      populateCategories();
      notifyUser(`${newQuotes.length} new quote(s) synced from server.`);
    }
  } catch (error) {
    console.error("Sync failed:", error);
  }
}
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.background = "#fffae6";
  notification.style.border = "1px solid #ccc";
  notification.style.padding = "10px";
  notification.style.marginTop = "10px";
  notification.style.fontWeight = "bold";
  document.body.insertBefore(
    notification,
    document.getElementById("quoteDisplay")
  );
}
setInterval(syncWithServer, 30000); // Sync every 30 seconds


createAddQuoteForm();
populateCategories();
filterQuotes();
restoreLastQuote();
