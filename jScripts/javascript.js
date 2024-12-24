document.addEventListener("DOMContentLoaded", () => {
    const jsonData = {
      "generators": [
        { "id": "unit1", "title": "אתיקה", "img": "images/Ethics.jpeg" },
        { "id": "unit2", "title": "מושר", "img": "images/Moral.jpg" },
        { "id": "unit3", "title": "יושרה", "img": "images/Integrity.jpeg" },
        { "id": "unit4", "title": "תקנון הטכניון להתנהגות ראויה במחקר", "img": "images/Regulation.jpeg" },
        { "id": "unit5", "title": "ניגוד עניינים", "img": "images/ConflictOfIntr.jpeg" },
        { "id": "unit6", "title": "אתיקה בתחומי מחקר שונים", "img": "images/TypesOfRese.jpeg" },
        { "id": "unit7", "title": "ביצוע מחקרים בבני אדם ובעלי חיים", "img": "images/HumansAndAnimals.jpeg" },
        { "id": "unit8", "title": "זכויות יוצרים", "img": "images/Copyright.jpeg" },
        { "id": "unit9", "title": "קניין רוחני", "img": "images/IntellectualProperty.jpeg" },
        { "id": "unit10", "title": "בינה מלאכותית כחלק ממחקר", "img": "images/AiInResearch.jpg" }
      ]
    };
  
    const generatorList = document.getElementById("generatorList");
    const searchInput = document.getElementById("search-input");
    const resultCounter = document.getElementById("result-counter");
    const noResultsMessage = "לא נמצאו יחידות המכילות צירוף תווים זה";
    const clickedItems = new Set(); // Track clicked items
  
    // Mobile navigation elements
    const navButton = document.getElementById("nav-button");
    const mobileNav = document.getElementById("mobile-nav");
  
    // Function to toggle mobile navigation visibility
    function toggleNav() {
      mobileNav.classList.toggle("d-none");
    }
  
    // Add event listener to the mobile nav button
    if (navButton) {
      navButton.addEventListener("click", toggleNav);
    }
  
    // Close mobile navigation when resizing to a larger screen
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        mobileNav.classList.add("d-none");
      }
    });
  
    // Function to render the generator list
    function renderList(filteredGenerators) {
      generatorList.innerHTML = '';
  
      if (filteredGenerators.length === 0) {
        const noResultsItem = document.createElement("li");
        noResultsItem.className = "col-12 text-center";
        noResultsItem.textContent = noResultsMessage;
        generatorList.appendChild(noResultsItem);
      } else {
        filteredGenerators.forEach((generator) => {
          const listItem = document.createElement("li");
          listItem.className = "col-12 col-md-6 col-lg-2 mb-3";
  
          const isActive = clickedItems.has(generator.id) ? " active" : "";
  
          listItem.innerHTML = `
            <a href="#" class="card h-100 text-decoration-none clickable-card${isActive}" data-id="${generator.id}">
              <img src="${generator.img}" class="card-img-top" alt="${generator.title}">
              <div class="card-body">
                <h5 class="card-title text-center">${generator.title}</h5>
              </div>
            </a>
          `;
  
          generatorList.appendChild(listItem);
        });
      }
  
      resultCounter.textContent = `${filteredGenerators.length}/${jsonData.generators.length}`;
  
      addClickListenerToCards();
    }
  
    // Function to add click event listener to cards
    function addClickListenerToCards() {
      document.querySelectorAll(".clickable-card").forEach((card) => {
        card.addEventListener("click", function (e) {
          e.preventDefault();
          const cardId = this.getAttribute("data-id");
  
          if (clickedItems.has(cardId)) {
            clickedItems.delete(cardId);
            this.classList.remove("active");
          } else {
            clickedItems.add(cardId);
            this.classList.add("active");
          }
        });
      });
    }
  
    // Initial render with all generators
    renderList(jsonData.generators);
  
    // Add event listener for the search input
    searchInput.addEventListener("input", () => {
      const searchText = searchInput.value.toLowerCase();
  
      const filteredGenerators = jsonData.generators.filter(generator =>
        generator.title.toLowerCase().includes(searchText)
      );
  
      renderList(filteredGenerators);
    });
  });