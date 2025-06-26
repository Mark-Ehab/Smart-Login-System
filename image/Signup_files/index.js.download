/*---------------------------------------
# External Script File for Bookmark App #
----------------------------------------*/

/*-------------------------------------------------- 
# Global Scope Variables declarations and definition
---------------------------------------------------*/

/**************************Form Fields Variables**************************/
/* Object that holds all form input fields tags selected from the DOM */
var formInputFields = {
  siteNameInputField: document.getElementById("bookmarkname"),
  websiteUrlInputField: document.getElementById("websiteurl"),
};
/* Variable to hold table body tag selected from the DOM */
var bookmarkedSitesTableBody = document.getElementById("sites-table-body");
/* Variable to hold submission validation popup tag selected from the DOM */
var validationSubmissionPopup = document.getElementById(
  "submission-validation-popup"
);

/**************************General Variables**************************/
/* List of all bookmarked sites */
var sitesList = [];
/* List of bookmarked sites key in local storage */
var bookmarkedSitesKey = "list of bookmarked sites";
/* Object that holds all form input fields validation regex patterns */
var inputValidationRegexPatterns = {
  bookmarkname: /^\w{3,63}(\s\w+)*$/,
  websiteurl:
    /^(http(s)?:\/\/)?(w{3}\.)?\w{3,63}(\.(com|net|gov))(\b\/(\w|\W)*)?$/,
};
/*=======================================================================================*/

/*--------------------------------------- 
# Functions Definition and Implementation
----------------------------------------*/

/*-----------------------------------------------------------------------------
# Description: A function to read site details entered by user to add it to 
# bookmarked sites list
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function addSite() {
  /* Variables declarations and definition */
  var site = {
    siteName: formInputFields.siteNameInputField.value,
    siteURL: formInputFields.websiteUrlInputField.value,
  };

  /* Check if http(s) protocol is provided in site url by user or not */
  if (!site.siteURL.includes("https://") && !site.siteURL.includes("http://")) {
    site.siteURL = "https://" + site.siteURL;
  }

  /* Push new site to bookmarked sites list */
  sitesList.push(site);
}

/*-----------------------------------------------------------------------------
# Description: A function to clear site details of last entered site after 
# submission
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function clearFormInputFields() {
  /* Clear all form input fields */
  formInputFields.siteNameInputField.value = "";
  formInputFields.websiteUrlInputField.value = "";
}

/*-----------------------------------------------------------------------------
# Description: A function to display list of bookmarked sites after each update 
#------------------------------------------------------------------------------
# @params: 
# @param: listOfSites (array of type Object) --> array of sites to be displayed
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function displaySites(listOfSites) {
  /* Clear content of sites table */
  bookmarkedSitesTableBody.innerHTML = "";
  /* Traverse over list of bookmarked sites and display each site details in a single table row */
  for (var counter = 0; counter < listOfSites.length; counter++) {
    bookmarkedSitesTableBody.innerHTML += `     
                <tr>
                <td>${counter + 1}</td>
                <td>${listOfSites[counter].siteName}</td>
                <td>
                  <button class="btn btn-visit text-capitalize" onclick='window.open("${
                    listOfSites[counter].siteURL
                  }")'>
                    <i class="fa-solid fa-eye pe-2"></i>visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete text-capitalize" onclick='removeSite(${counter})'>
                    <i class="fa-solid fa-trash pe-2"></i>delete
                  </button>
                </td>
              </tr> `;
  }
}

/*-----------------------------------------------------------------------------
# Description: A function to delete a specific site from bookmarked sites list
#------------------------------------------------------------------------------
# @params: 
# @param: siteIndex (number) --> index of site in bookmarked array
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function deleteSite(siteIndex) {
  /* Remove the site from bookmarked sites list */
  sitesList.splice(siteIndex, 1);
}

/*-----------------------------------------------------------------------------
# Description: A function to create and display a new site to the bookmarked 
# sites table on submission 
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function createSite() {
  if (
    validateFormInputFields(formInputFields.siteNameInputField) &&
    validateFormInputFields(formInputFields.websiteUrlInputField)
  ) {
    /* Add new site after submission */
    addSite();

    /* Update Local Storage */
    updateLocalStorage();

    /* Clear form input fields after submission */
    clearFormInputFields();

    /* Display list of bookmarked sites after submission */
    displaySites(sitesList);

    /* Reset Input Validations */
    resetInputValidtions();
  } else {
    /* Show validation popup */
    showPopup();
  }
}

/*-----------------------------------------------------------------------------
# Description: A function to remove a site from bookmarked sites list and 
# display updated sites list on bookmarked sites table
#------------------------------------------------------------------------------
# @params: 
# @param: siteIndex (number) --> index of site in bookmarked array
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function removeSite(siteIndex) {
  /* Remove site from the bookmarked sites list */
  deleteSite(siteIndex);

  /* Update Local Storage */
  updateLocalStorage();

  /* Display list of bookmarked sites after site removal */
  displaySites(sitesList);
}

/*-----------------------------------------------------------------------------
# Description: A function to update local storage with bookmarked sites list
# after each update on that list
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function updateLocalStorage() {
  localStorage.setItem(bookmarkedSitesKey, JSON.stringify(sitesList));
}

/*-----------------------------------------------------------------------------
# Description: A function to retrieve data stored on local storage
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function getFromLocalStorage() {
  return localStorage.getItem(bookmarkedSitesKey);
}

/*-----------------------------------------------------------------------------
# Description: A function to validate data entered by user in form input fields
#------------------------------------------------------------------------------
# @params: 
# @param: inputField (Object) ---> Form Input field on which validaton will be 
# applied
#------------------------------------------------------------------------------
# return type: boolean
-----------------------------------------------------------------------------*/
function validateFormInputFields(inputField) {
  /* Variables declarations and definition */
  var isValid = null;

  /* Check if input valid is empty */
  if (!inputField.value) {
    return isValid;
  }

  /* Validate entered data */
  isValid = inputValidationRegexPatterns[inputField.id].test(inputField.value);

  /* Identify user if data is valid or not */
  if (isValid) {
    inputField.classList.remove("is-invalid");
    inputField.classList.add("is-valid");
  } else {
    inputField.classList.remove("is-valid");
    inputField.classList.add("is-invalid");
  }
  return isValid;
}

/*-----------------------------------------------------------------------------
# Description: A function to reset validations on input field after submission
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function resetInputValidtions() {
  formInputFields.siteNameInputField.classList.remove("is-valid");
  formInputFields.websiteUrlInputField.classList.remove("is-valid");
}

/*-----------------------------------------------------------------------------
# Description: A function to show submission validation popup after sumbission 
# of invalid site details
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function showPopup() {
  /* Hide the pop up */
  validationSubmissionPopup.classList.remove("d-none");
  validationSubmissionPopup.classList.add("d-flex");
}
/*-----------------------------------------------------------------------------
# Description: A function to close submission validation popup after clicking
# on (X) sign
#------------------------------------------------------------------------------
# @params: void
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function closePopup() {
  /* Hide the pop up */
  validationSubmissionPopup.classList.remove("d-flex");
  validationSubmissionPopup.classList.add("d-none");
}

/*=======================================================================================*/

/*--------------------------------------- 
# App Entry Point
----------------------------------------*/

/* Display table of previously added bookmarked sites if any from local storage */
if (getFromLocalStorage()) {
  sitesList = JSON.parse(getFromLocalStorage());
  displaySites(sitesList);
}
