/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Declare all the global variables 
const itemsPerPage = 10; //How many items we want to show per page. This can be adjusted.
const listItems = document.querySelectorAll('li.student-item'); //This gets all the list item elements that contain the students

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {

   //Variables used to calculate what elements we need on each page
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
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = list => {

   const numOfPagesNeeded = Math.ceil(list.length / itemsPerPage);

   const paginationDiv = document.createElement('div'); //Create the main pagination div and set the class
   paginationDiv.className = "pagination"

   const ul = document.createElement('ul');
   
   for (let i = 1; i <= numOfPagesNeeded; i++) {
      const pageLi = document.createElement('li');
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.addEventListener('click', () => {handlePaginationClick(i)});
      if(i == 1) {
         pageLink.className = "active";
      }
      pageLi.appendChild(pageLink);
      ul.appendChild(pageLi);
   }   
   
   paginationDiv.appendChild(ul);
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