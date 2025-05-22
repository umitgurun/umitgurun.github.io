const tabs = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");
let tabData = {};

// Load JSON content on page load
async function loadTabContent() {
  try {
    const response = await fetch("./assets/content/tabs-content.json");
    tabData = await response.json();
    renderTab("about");
    document.querySelector(".text-sm.text-gray-600").innerHTML = document.querySelector(".text-sm.text-gray-600").innerHTML.replace("2025", new Date().getFullYear());
  } catch (error) {
    console.error("Error loading tab content:", error);
  }
}

// Render the content of the selected tab
function renderTab(tabId) {
  contents.forEach((section) => section.classList.add("hidden"));
  tabs.forEach((tab) => {
    tab.classList.add("hover:bg-gray-100");
    tab.classList.remove("bg-blue-500", "text-white");
    tab.setAttribute("aria-selected", "false");
  });

  const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
  selectedTab.classList.remove("hover:bg-gray-100");
  selectedTab.classList.add("bg-blue-500", "text-white");
  selectedTab.setAttribute("aria-selected", "true");

  const contentDiv = document.getElementById(tabId);
  const contentDataDiv = contentDiv.querySelector(".data-content");

  contentDataDiv.innerHTML = "";

  const content = tabData[tabId];
  if (!content) return;

  // Call the tab-specific renderer
  switch (tabId) {
    case "about":
      renderAboutTab(content, contentDataDiv);
      break;
    case "research":
      renderResearchTab(content, contentDataDiv);
      break;
    case "WP":
      renderWPTab(content, contentDataDiv);
      break;
    case "media":
      renderMediaBlogTab(content, contentDataDiv);
      break;
    case "blog":
      renderMediaBlogTab(content, contentDataDiv);
      break;
    case "service":
      renderServiceTab(content, contentDataDiv);
      break;
    default:
      break;
  }

  contentDiv.classList.remove("hidden");
}

// helpers

function renderAboutTab(content, container) {
  container.classList.add("rounded-lg", "border", "p-6");

  content.forEach((para) => {
    const p = document.createElement("p");
    p.classList.add("text-gray-700", "mb-4");
    p.textContent = para;
    container.appendChild(p);
  });
}

function renderResearchTab(content, container) {
  // Loop through each research item
  content.forEach((research) => {
    // Create the main research card container
    const card = document.createElement("div");
    card.className = "mb-8 border border-gray-200 p-4 rounded-lg";

    // Create the title section
    const title = document.createElement("h3");
    title.className = "text-base font-bold text-blue-400 mb-0";
    title.textContent = research.title;
    card.appendChild(title);

    // Create the authors section
    const authors = document.createElement("p");
    authors.className = "text-sm font-medium text-gray-700 mt-1.5";
    authors.textContent = research.authors;
    card.appendChild(authors);

    // Create the journal section
    const journal = document.createElement("p");
    journal.className = "text-gray-900 text-sm font-bold my-1.5";
    journal.textContent = research.journal;
    card.appendChild(journal);

    // Create abstract content (initially hidden)
    const abstractContent = document.createElement("div");
    abstractContent.className = "hidden mb-4 p-4 text-sm bg-gray-50 rounded-md";
    abstractContent.innerHTML = `<p class="text-gray-700">${research.abstract}</p>`;
    card.appendChild(abstractContent);

    // Create the buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "flex flex-wrap gap-2 border-t pt-4";

    // Create Show/Hide Abstract button
    const abstractButton = document.createElement("button");
    abstractButton.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
    abstractButton.textContent = "Show Abstract";
    abstractButton.addEventListener("click", () => {
      const isNowVisible = abstractContent.classList.toggle("hidden");
      abstractButton.textContent = isNowVisible ? "Show Abstract" : "Hide Abstract";
    });
    buttonsContainer.appendChild(abstractButton);

    // Create Citation Export button
    const citationButton = document.createElement("button");
    citationButton.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
    citationButton.textContent = "Citation Export";
    citationButton.addEventListener("click", () => copyToClipboard(research.citation || "Citation not available"));
    buttonsContainer.appendChild(citationButton);

    // Create Video button
    if (research.video) {
      const videoButton = document.createElement("button");
      const videoLink = document.createElement("a");
      videoLink.href = research.video;
      videoLink.target = "_blank";
      videoLink.rel = "noopener noreferrer";
      videoLink.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
      videoLink.innerHTML = 'video <img class="h-3 w-3 ml-1" src="./assets/images/icons/extrnal-link.svg" alt="" />';
      videoButton.appendChild(videoLink);
      buttonsContainer.appendChild(videoButton);
    }

    // Create PDF button
    if (research.pdf) {
      const pdfButton = document.createElement("a");
      pdfButton.href = research.pdf;
      pdfButton.target = "_blank";
      pdfButton.rel = "noopener noreferrer";
      pdfButton.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
      pdfButton.innerHTML = 'LINK <img class="h-3 w-3 ml-1" src="./assets/images/icons/extrnal-link.svg" alt="" />';
      buttonsContainer.appendChild(pdfButton);
    }

    card.appendChild(buttonsContainer);
    container.appendChild(card);
  });
}

function renderWPTab(content, container) {
  // Loop through each research item
  content.forEach((research) => {
    // Create the main research card container
    const card = document.createElement("div");
    card.className = "mb-8 border border-gray-200 p-4 rounded-lg";

    // Create the title section
    const title = document.createElement("h3");
    title.className = "text-base font-bold text-blue-400 mb-0";
    title.textContent = research.title;
    card.appendChild(title);

    // Create the authors section
    const authors = document.createElement("p");
    authors.className = "text-sm font-medium text-gray-700 my-1.5";
    authors.textContent = research.authors;
    card.appendChild(authors);

    // Create abstract content (initially hidden)
    const abstractContent = document.createElement("div");
    abstractContent.className = "hidden mb-4 p-4 text-sm bg-gray-50 rounded-md";
    abstractContent.innerHTML = `<p class="text-gray-700">${research.abstract}</p>`;
    card.appendChild(abstractContent);

    // Create the buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "flex flex-wrap gap-2 border-t pt-4";

    // Create Show/Hide Abstract button
    const abstractButton = document.createElement("button");
    abstractButton.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
    abstractButton.textContent = "Show Abstract";
    abstractButton.addEventListener("click", () => {
      const isNowVisible = abstractContent.classList.toggle("hidden");
      abstractButton.textContent = isNowVisible ? "Show Abstract" : "Hide Abstract";
    });
    buttonsContainer.appendChild(abstractButton);

    // Create Citation Export button
    const citationButton = document.createElement("button");
    citationButton.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
    citationButton.textContent = "Citation Export";
    citationButton.addEventListener("click", () => copyToClipboard(research.citation || "Citation not available"));
    buttonsContainer.appendChild(citationButton);

    // Create Video button
    if (research.video) {
      const videoButton = document.createElement("button");
      const videoLink = document.createElement("a");
      videoLink.href = research.video;
      videoLink.target = "_blank";
      videoLink.rel = "noopener noreferrer";
      videoLink.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
      videoLink.innerHTML = 'video <img class="h-3 w-3 ml-1" src="./assets/images/icons/extrnal-link.svg" alt="" />';
      videoButton.appendChild(videoLink);
      buttonsContainer.appendChild(videoButton);
    }

    // Create PDF button
    if (research.pdf) {
      const pdfButton = document.createElement("a");
      pdfButton.href = research.pdf;
      pdfButton.target = "_blank";
      pdfButton.rel = "noopener noreferrer";
      pdfButton.className = "text-sm font-medium transition-colors border border-gray-300 hover:bg-gray-100 h-9 rounded-md px-3 flex items-center gap-1";
      pdfButton.innerHTML = 'PDF <img class="h-3 w-3 ml-1" src="./assets/images/icons/extrnal-link.svg" alt="" />';
      buttonsContainer.appendChild(pdfButton);
    }

    card.appendChild(buttonsContainer);
    container.appendChild(card);
  });
}

function toggleAbstract(element) {
  element.classList.toggle("hidden");
}

function renderServiceTab(content, container) {
  console.log(content);
  Object.entries(content).forEach(([sectionKey, items]) => {
    container.innerHTML += `
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">${sectionKey.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</h2>
        <div class="p-6 border border-gray-200 rounded-lg">
          <ul class="list-disc space-y-2 ml-5 block">
            ${items
              .map(
                (item) => `
              <li class="text-gray-800 text-sm">${item}</li>
            `
              )
              .join("")}
          </ul>
        </div>
      </div>
    `;
  });
}

function renderMediaBlogTab(content, container) {
  // Create wrapper for all posts
  const postsWrapper = document.createElement("div");
  postsWrapper.className = "space-y-6";

  // Process each blog post
  content.forEach((post) => {
    // Create post container with border
    const postDiv = document.createElement("div");
    postDiv.className = "border border-gray-200 p-4 rounded-lg";

    // Create title element
    const title = document.createElement("h3");
    title.className = "text-base font-bold text-blue-400 mb-1.5";
    title.textContent = post.title;
    postDiv.appendChild(title);

    // Create metadata container (source and date)
    const metaDiv = document.createElement("div");
    metaDiv.className = "flex flex-wrap items-center text-sm text-gray-700";

    // Add source
    const source = document.createElement("span");
    source.className = "font-semibold border-r-2 border-gray-600 px-1 mr-1";
    source.textContent = post.source;
    metaDiv.appendChild(source);

    // Add date
    const date = document.createElement("span");
    date.className = "font-medium border-r-2 border-gray-600 px-1 mr-1";
    date.textContent = post.date;
    metaDiv.appendChild(date);

    postDiv.appendChild(metaDiv);

    // Create Read Post button
    const readButton = document.createElement("a");
    readButton.href = post.url;
    readButton.target = "_blank";
    readButton.rel = "noopener noreferrer";
    readButton.className = "inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors";
    readButton.textContent = post.type === "post" ? "Read Post" : "Read Article";
    metaDiv.appendChild(readButton);

    postsWrapper.appendChild(postDiv);
  });

  container.appendChild(postsWrapper);
}
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("BibTeX citation copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");
    renderTab(target);
  });
});

document.addEventListener("DOMContentLoaded", loadTabContent);
