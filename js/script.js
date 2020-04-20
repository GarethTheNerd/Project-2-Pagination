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
   We also add click hande
***/

const appendPageLinks = list => {

   const numOfPagesNeeded = Math.ceil(list.length / itemsPerPage); //Calculating the number of pages we need. We need to round it up as we can't have half a page!

   const paginationDiv = document.createElement('div'); //Create the main pagination div and set the class
   paginationDiv.className = "pagination"

   const ul = document.createElement('ul'); //Create the ul that we then add list items to for each page
   
   for (let i = 1; i <= numOfPagesNeeded; i++) { //This loops creates each page. As we don't want a page 0, we start at 1
      const pageLi = document.createElement('li'); 
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.addEventListener('click', () => {handlePaginationClick(i)});
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

const handlePaginationClick = page => {
   showPage(listItems, page);

   //We now need to remove any pagination active classes and replace it on the correct element
   const paginationLinks = document.querySelectorAll('div.pagination > ul > li > a');
   
   for(let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].className = '';
   }

   for(let i = 0; i < paginationLinks.length; i++) {
      const currentLink = paginationLinks[i];
      
      if (currentLink.textContent == page) {
         currentLink.className = "active";
      }
   }

}

showPage(listItems, 1);
appendPageLinks(listItems);



// Remember to delete the comments that came with this file, and replace them with your own code comments.