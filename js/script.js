/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Declare all the global variables 
const itemsPerPage = 10; //How many items we want to show per page. This can be adjusted.
const listItems = document.querySelectorAll('li.student-item'); //This gets all the list item elements that contain the students

/*

This function shows the relevant page of list items.
It takes the list and the page and hides elements that aren't needed and shows the one's that are.
*/

const showPage = (list, page) => {

   //Variables used to calculate which elements we need to show on each page
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   //Now we need to loop over the list of elements and hide elements that aren't appropriate for the current page 
   for(let i = 0; i < list.length; i++) {
      const currentListItem = list[i]; //This is the current item in the loop
      
      if(i >= startIndex & i < endIndex) { //We are checking if the current item belongs on this page!
         currentListItem.style.display = ''; //If so, we need to unhide it. We can just clear the display property since it is not set in-line.
      } else {
         currentListItem.style.display = 'none'; //Otherwise it needs to be hidden
      }
   }
}



/*** 
   This function creates the Pagination links and adds them to the bottom of the page.
   We also add the click handeler to the links
***/

const appendPageLinks = list => {

   //I'm going to remove any existing pagination links first. This is so we can re-use this function for the search
   const existingPagination = document.querySelector('div.pagination');
   if (existingPagination) {
      const pageDiv = document.querySelector('div.page');
      pageDiv.removeChild(existingPagination);
   }

   const numOfPagesNeeded = Math.ceil(list.length / itemsPerPage); //Calculating the number of pages we need. We need to round it up as we can't have half a page!

   const paginationDiv = document.createElement('div'); //Create the main pagination div and set the class
   paginationDiv.className = "pagination"

   const ul = document.createElement('ul'); //Create the ul that we then add list items to for each page
   
   for (let i = 1; i <= numOfPagesNeeded; i++) { //This loops creates each page. As we don't want a page 0, we start at 1
      const pageLi = document.createElement('li'); 
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.addEventListener('click', () => {handlePaginationClick(list, i)});
      if(i == 1) { //We need to set the first link to have a class of active for the first page load
         pageLink.className = "active";
      }
      pageLi.appendChild(pageLink); //We add the link to the li created for this page
      ul.appendChild(pageLi); //Then add the li to the ul
   }   
   
   paginationDiv.appendChild(ul); //Now the ul is complete, we add it to our pagination div
   // Now we need to add the pagination div to the page
   const pageDiv = document.querySelector('div.page'); //First we need to select the pageDiv it needs appending to
   pageDiv.appendChild(paginationDiv);

}

/* 
This function creates the elements for the search (search box, button and no results message)
*/

const createSearch = () => {
   
   //Create the search Div
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';

   //Create the search input field
   const searchInput = document.createElement('input');
   searchInput.placeholder = 'Search for students...';
   //Add the search input to the search div
   searchDiv.appendChild(searchInput);

   //Create the button and set it's properties
   const searchButton = document.createElement('button');
   searchButton.textContent = 'Search';
   searchButton.addEventListener('click', () => {Search(searchInput.value, listItems)});
   //Add the search button to the search div
   searchDiv.appendChild(searchButton);

   //Now I'll add the completed search div to the page
   const pageHeader = document.querySelector('div.page-header');    
   pageHeader.appendChild(searchDiv);

    //I'm also going to create the no results found message (and hide it) for use later
    const noResultsSpan = document.createElement('span');
    noResultsSpan.classList.add('no-results');
    noResultsSpan.textContent = 'No results to show.';
    noResultsSpan.style.display = 'none';
   //We'll insert it before the ul
   const pageDiv = document.querySelector('div.page');
   const studentList = document.querySelector('ul.student-list');
   pageDiv.insertBefore(noResultsSpan, studentList);

}

//This function handles the user clicking on a pagination link
const handlePaginationClick = (list, page) => {
   //This shows the page number that's been clicked
   showPage(list, page);

   //Getting all the pagination links to fix the active class
   const paginationLinks = document.querySelectorAll('div.pagination > ul > li > a');
   //We will now need to loop through the pagination links and remove any classes of active
   for(let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].className = '';
   }
   //now we loop through the pagination links and put the active class on the correct one
   for(let i = 0; i < paginationLinks.length; i++) {
      const currentLink = paginationLinks[i];
      //Thos checks if we are currently looking at the current page
      if (currentLink.textContent == page) {
         currentLink.className = "active"; //So we set the active class
      }
   }
}

//This function handles a search when it is run
const Search = (searchTerm, list) => {

//We are going through all of our list items (passed in). Checking if they matching our search term
for(let i = 0; i < list.length; i++) {

   const currentStudent = list[i];

   //Now we get the current students name, email and joined date
   const studentName = currentStudent.querySelector('div.student-details > h3').textContent;
   const studentEmail = currentStudent.querySelector('div.student-details > span.email').textContent;
   const studentJoined = currentStudent.querySelector('div.joined-details > span.date').textContent;
   
   //Checking if the searchTerm exists on any of the users properties (name, email and join date)
   if (studentName.includes(searchTerm) || studentEmail.includes(searchTerm) || studentJoined.includes(searchTerm)) {
      currentStudent.style.display = ''; //The user has been found so lets unhide them
      currentStudent.classList.add('search-found'); //Found this function on MDN
   } else {
      currentStudent.style.display = 'none'; //hide the user
      currentStudent.classList.remove('search-found'); //Found this function on MDN
   }

}

//Create a list of students that are showing so we can pass to our existing functions
const resultsListItems = document.querySelectorAll('li.search-found');

//let's check the amount of results and show / hide the no results text
const noResultsText = document.querySelector('span.no-results'); //get the no results span
if (resultsListItems.length === 0) { //check if we have no results
   noResultsText.style.display = ''; //show the no results text
} else {
   noResultsText.style.display = 'none'; //hide the no results text
}
//We will now use our existing functions to setup our pagination
appendPageLinks(resultsListItems);
showPage(resultsListItems, 1);

}

//initalise the page by running our inital functions!
createSearch();
showPage(listItems, 1);
appendPageLinks(listItems);



