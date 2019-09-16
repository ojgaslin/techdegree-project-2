
//** Global variable studentList created to retrieve list elements by their class name,
//** Global variable itemsPerPage is equal to ten because there should be ten names shown for each page
const studentList = document.getElementsByClassName('student-item');
const itemsPerPage = 10;
//Create the `showPage` function to hide all of the items in the
//list except for the ten you want to show.



//**"showPage" function is created and the parameters "list" and "page" are passed in
//**"startIndex" and "endIndex" variables define the index of the first and last list items of a given page
//**the for loop iterates through all list items with its index starting at zero and ending at 53
//**the if/else statement tests list items within and including both the startIndex and endIndex
//**if the list item index are between or included in the startIndex and endIndex, the list item will be displayed on the page, else it will not be shown
function showPage (list, page) {
  let startIndex = (page * itemsPerPage) - itemsPerPage;
  let endIndex = page * itemsPerPage - 1;
  //retrieved h3 element with class name no-match. Set to not display unless list length is not greater than zero.
  let h3 = document.getElementsByClassName("no-match")[0];
  h3.style.display = 'none';
if(list.length > 0) {
  for (let i = 0; i < list.length; i++) {
    if(i >= startIndex && i <= endIndex)
    {
      list[i].style.display = 'block';
    }
    else {
      list[i].style.display = 'none';
    }
} } else {
      h3.style.display = 'block';
}

}
//function created to make html element "No Match Found." and set to not display.
function CreateNoMatchElement () {
    let h3 = document.createElement('h3');
    h3.setAttribute("class", "no-match");
    h3.innerHTML = "No Match Found.";
    h3.style.font = "italic 20px Helvetica";
    h3.style.color = "rgb(128,128,128)";
    h3.style.display = 'none';
    document.getElementsByClassName("page")[0].appendChild(h3);

}
//**the "showPage" function is to be executed after the page has been loaded
window.onload = function () {

  CreateNoMatchElement();
  appendPageLinks(studentList);
  showPage (studentList, 1);
  createSearchField();

}

  //call function to build search html dynamically


//'appendPaggeLinks' function created. Parameter list passed in.
function appendPageLinks(list){
  //'numberOfPages' variable created to find number of pages.
  let numberOfPages = list.length/itemsPerPage;
  numberOfPages = Math.ceil(numberOfPages);
  //ul element and div element created.
  let ul = document.createElement('ul');
  let div = document.createElement('div');
  //class name declared 'pagination' for div element just created.
  div.className = "pagination";
  //for loop created, 'i' starts at 1 because the page needs to begin at 1.
  //the counter with 'i' starts at 1 and is less than or equal to the 'numberOfPages' variable.
  for (let i=1; i <= numberOfPages; i++) {
    //inside the for loop, 'li' and 'a' elements are created
    let li = document.createElement('li');
    let a = document.createElement('a');
    //inside the for loop, the if statement changes the 'a' className to active if 'i' equals 1
    if(i == 1){
      a.className = "active";
    }
    //after the if statement, the 'a' element is given two components, the link/URL and the clickable text content of 'i.'
    a.href = "#";
    a.textContent = i;
    //the event listener responds to a click event of the textContent of an 'a' element.
    a.addEventListener ("click", (e)=> {
      showPage(list, e.target.textContent);
      const pageLinks = document.getElementsByTagName("a");
      for (let j = 0; j < pageLinks.length; j++) {
        //when the event occurs, the class name 'active' will be removed from 'a' elements,
        //this is by the for loop in the event listener which will loop through the links of the 'a' elements and
        //remove 'active' class name. The text content that is clicked in the event will gain the class name active.
        pageLinks[j].classList.remove("active");
      }
      e.target.className = "active";
    });
    //closing tags 'li' and 'ul' are created
    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);
  document.getElementsByClassName("page")[0].appendChild(div);
}

function createSearchField () {
  //create input element
  let input = document.createElement('input');
  //give input element id of searchTextInput
  input.setAttribute("id", "searchTextInput");
  //create div element
  let div = document.createElement('div');
  //give div class name
  div.className = 'student-search';
  //give input element placeholder text to show in search field
  input.setAttribute("placeholder", "Search for students...");
  //create button element
  let button = document.createElement('button');
  //set button text content to search
  let buttonTextContent = document.createTextNode("Search");
  //append buttonTextContent as a child to button element
  button.appendChild(buttonTextContent);
  //keyup event listener set for input element to run searchNames function
  input.addEventListener("keyup", (e) => {searchNames()} );
  //click event listener set for button element to run searchNames function
  button.addEventListener("click", (e) => {searchNames()});
  //append input element as a child of the div element
  div.appendChild(input);
  //append button element as a child of the div element
  div.appendChild(button);
  //append div element to parent div element with class name page-header
  document.getElementsByClassName("page-header")[0].appendChild(div);
}
//get the div element with class pagination and remove it, this removes pagination
function clearPagination(){
  document.getElementsByClassName("pagination")[0].remove();
}
//for loop loops through student list and sets their display to none
//search result list will be displayed instead of student list
function setAllNamesDisplayNone(){
  for(let i = 0; i < studentList.length; i++){
    studentList[i].style.display = 'none';
  }
}
//searchNames function created
function searchNames() {
  //get input element value which is equal to input
  let input = document.getElementsByTagName('input')[0].value;
  //set searchResults list equal to empty array
  let searchResults = [];
  //for loop loops through student list
  for(let i=0; i < studentList.length; i++) {
    //if h3 element in studentList[i], targeted below, includes the input value
    //in the search field, then studentList[i] is put in the searchResults array
    if(studentList[i].firstElementChild.children[1].textContent.toLowerCase()
    .includes(input.toLowerCase())) {
      searchResults.push(studentList[i]);
    }
  }
  //functions are declared to present search results list
  setAllNamesDisplayNone();
  clearPagination();
  appendPageLinks(searchResults);
  showPage(searchResults, 1);
}
