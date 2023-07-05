const api = "621cfb335fa28cf9d3189a4e71af2ef0";
const global = {
  currentPage: window.location.pathname,
};

//Focus navbar elements
function highlightActive() {
  const lists = document.querySelectorAll(".nav-link");
  lists.forEach((list) => {
    if (list.getAttribute("href") === global.currentPage) {
      list.classList.add("active");
    }
  });
}

//Initialize function
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      break;

    case "/shows.html":
      console.log("Shows");
      break;

    case "/movie-details.html":
      console.log("Movie-Details");
      break;

    case "/tv-details.html":
      console.log("TV-Details");
      break;

    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActive();
}

document.addEventListener("DOMContentLoaded", init);
