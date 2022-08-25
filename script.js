const filterHeroCheckboxes = document.querySelectorAll(".filter");
const filterYearCheckbox = document.querySelector("#filterYear");
const filterAllCheckbox = document.querySelector("#all");

let numboxeschecked = 0;
let filterForMoviesAfter2014;
let filterArray = [];
let movieArray = [];
let movieArrayYear = [];

// # Adding eventlisteners and controling the checkboxes
filterAllCheckbox.addEventListener("change", function () {
  switch (this.checked) {
    case true:
      filterHeroCheckboxes.forEach((checkbox) => (checkbox.checked = true));
      numboxeschecked = filterHeroCheckboxes.length;
      filterHeroCheckboxes.forEach((checkbox) => {
        filterArray.push(checkbox.value);
      });
      break;
    case false:
      filterHeroCheckboxes.forEach((checkbox) => (checkbox.checked = false));
      numboxeschecked = 0;
      filterArray = [];
  }
  collectionFilteredMovies();
});

filterYearCheckbox.addEventListener("change", function () {
  switch (this.checked) {
    case true:
      filterForMoviesAfter2014 = true;
      break;
    case false:
      filterForMoviesAfter2014 = false;
  }
  collectionFilteredMovies();
});

filterHeroCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    switch (this.checked) {
      case true:
        filterArray.push(this.value);
        numboxeschecked++;
        break;
      case false:
        for (let i = 0; i < filterArray.length; i++) {
          if (filterArray[i] === this.value) {
            filterArray.splice(i, 1);
          }
        }
        numboxeschecked--;
    }

    // ## Checking or unchecking checkbox all depending on if all the hero checkboxes are checked.
    switch (numboxeschecked) {
      case filterHeroCheckboxes.length:
        filterAllCheckbox.checked = true;
        break;
      case filterHeroCheckboxes.length - 1:
        filterAllCheckbox.checked = false;
    }
    collectionFilteredMovies();
  });
});

// # Adding the movies that fit to the filter to the array movieArray
const collectionFilteredMovies = function () {
  if (filterAllCheckbox.checked === true) {
    movieArray = movies;
  } else {
    movies.forEach((movie) => {
      filterArray.forEach((filter) => {
        switch (movie.title.includes(filter)) {
          case true:
            checkForDublicatesAndPushToArray(movie, movieArray);
            break;
          case false:
            break;
        }
      });
    });
  }
  // ## Applying the year filter if the checkbox is checked and merging this in to the movieArray.
  if (filterForMoviesAfter2014 === true) {
    movieArray.forEach((movie) => {
      if (parseInt(movie.year) < 2015 === false) {
        checkForDublicatesAndPushToArray(movie, movieArrayYear);
      } else {
      }
    });
  }
  if (filterForMoviesAfter2014 == true) {
    movieArray = movieArrayYear;
    movieArrayYear = [];
  }
  addMoviesTooDOM();
  movieArray = [];
};

// ## This checks that the same movie is not passed in to the array if it alrayd exist in the array.
const checkForDublicatesAndPushToArray = function (item, array) {
  if (array.includes(item) !== true) {
    array.push(item);
  }
};

const addMoviesTooDOM = function () {
  const movieContainer = document.getElementById("movieContainer");
  const addedChildren = movieContainer.children;
  const arrayAddedChildrenLength = addedChildren.length;

  //##clearing the preverious added elements.
  for (let c = 0; c < arrayAddedChildrenLength; c++) {
    movieContainer.removeChild(addedChildren[0]);
  }

  //##Preparing the html elements.
  movieArray.forEach((movie) => {
    const newA = document.createElement("a");
    const newH3 = document.createElement("h3");
    const newP = document.createElement("p");
    const newImage = document.createElement("img");

    // ##Creating Link to imdb
    imdbLink = "https://www.imdb.com/title/" + movie.imdbID + "/";

    // ##Appending the elements to the dom
    movieContainer.appendChild(newA);
    newA.appendChild(newImage);
    newA.appendChild(newH3);
    newA.appendChild(newP);
    newA.href = imdbLink;
    newImage.src = movie.poster;
    newH3.innerHTML = movie.title;
    newP.innerHTML = movie.year;
  });
};
