/*-------------------------------------------------
# External Script File for Smart Login System App #
--------------------------------------------------*/

/*-------------------------------------------------
# Apply strict mode on the script 
--------------------------------------------------*/
"use strict";

/*-------------------------------------------------- 
# Global Scope Variables declarations and definition
---------------------------------------------------*/
/* Array to hold all registered user accounts */
let registeredUserAccountsList = [];
/* Variable to hold list of user accounts key in local storage */
const listOfUserAccountsKey = "list of user accounts";
/* Variable to hold logged in username key in local storage */
const usernameKey = "logged username key";

/*--------------------------------------- 
# App Entry Point
----------------------------------------*/
/* Get all registered accounts from local storage (if any) */
if (getFromLocalStorage(listOfUserAccountsKey)) {
  registeredUserAccountsList = JSON.parse(
    getFromLocalStorage(listOfUserAccountsKey)
  );
}

/*--------------------------------------- 
# Functions Definition and Implementation
----------------------------------------*/

/*-----------------------------------------------------------------------------
# Description: A function to update local storage 
#------------------------------------------------------------------------------
# @params: 
# @param1 : key (String) ---> Key value of data to be stored in local storage
# @param2 : value (any) ---> Data to be stored in local storage
#------------------------------------------------------------------------------
# return type: void
-----------------------------------------------------------------------------*/
function updateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/*-----------------------------------------------------------------------------
# Description: A function to retrieve data stored on local storage
#------------------------------------------------------------------------------
# @params: 
# @param : key (String) ---> Key value of data to be retrived from local 
# storage 
#------------------------------------------------------------------------------
# return type: string | null
-----------------------------------------------------------------------------*/
function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

/*-------------------------------------------------- 
# Check Which HTML Page (Document)[DOM] is Currently 
# Rendered on the Browser (Window)[BOM]
---------------------------------------------------*/
switch (window.location.pathname) {
  case "/":
  case "/index.html":
    /*-------------------------------------------------- 
    # Global Scope Variables declarations and definition
    # of login page
    ---------------------------------------------------*/
    /**************************Login Form Fields Variables**************************/
    /* Object that holds login page form input fields tags selected from the DOM */
    const loginPageEmailInputField = document.querySelector(
      "#login-main form input[name = useremail]"
    );
    /* Object that holds login page form input fields tags selected from the DOM */
    const loginPagePasswordInputField = document.querySelector(
      "#login-main form input[name = userpassword]"
    );
    /* Variable to hold signup page form tag selected from the DOM */
    const loginForm = document.querySelector("#login-main form");
    /* Variable to hold signup buttom tag selected from the DOM */
    const loginBtn = document.querySelector("#login-main form button");
    /* Variable to hold column tag at which login welcome message is displayed selected from the DOM*/
    const welcomeMsg = document.querySelector("#login-welcome-msg");
    /* Variable to hold column tag at which login error message is displayed selected from the DOM*/
    const errMsg = document.querySelector("#login-err-msg");
    /* =============================================================================== */

    /*--------------------------------------- 
    # Functions Definition and Implementation
    # of login page
    ----------------------------------------*/
    /*-----------------------------------------------------------------------------
    # Description: A function to validate entered values of all login page form
    # input fields
    #------------------------------------------------------------------------------
    # @params: void 
    #------------------------------------------------------------------------------
    # return type: Boolean
    -----------------------------------------------------------------------------*/
    function validateAllLoginFormInputFields() {
      /* Local scope variables declrations and definitions */
      let isValid = false;

      /* Check if passed email and password values are valid */
      if (
        registeredUserAccountsList.find(
          (user) => loginPageEmailInputField.value === user.useremail
        ) &&
        registeredUserAccountsList.find(
          (user) => loginPageEmailInputField.value === user.useremail
        ).userpassword === loginPagePasswordInputField.value
      ) {
        isValid = true;
      } else {
        isValid = false;
      }

      /* Get the username of the user in case of successful login */
      if (isValid) {
        updateLocalStorage(
          usernameKey,
          registeredUserAccountsList.find(
            (user) => loginPageEmailInputField.value === user.useremail
          ).username
        );
      }

      return isValid;
    }

    /* =============================================================================== */

    /*--------------------------------------------- 
    # Event Listeners Definition and Implementation
    # for login page
    ---------------------------------------------*/

    /* Add click event on login button */
    loginBtn.addEventListener("click", () => {
      /* Check if entered values of all form input fields of login page is valid pr not */
      if (validateAllLoginFormInputFields()) {
        /* Hide login validation error message (If any) */
        errMsg.classList.add("d-none");
        /* Show successful login welcome message */
        welcomeMsg.classList.toggle("d-none");
        /* Set timeout up to two seconds then navigate to home */
        window.setTimeout(() => {
          window.location.href = "home.html";
        }, 1000);
      } else {
        /* Show login validation error message */
        errMsg.classList.remove("d-none");

        /* Clear set password value on login page password input field */
        loginPagePasswordInputField.value = "";
      }
    });
    /* Add submit event on login form */
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    break;
  case "/signup.html":
    /*-------------------------------------------------- 
    # Global Scope Variables declarations and definition
    # of signup page
    ---------------------------------------------------*/
    /**************************Signup Form Fields Variables**************************/
    /* Object that holds all signup page form input fields tags selected from the DOM */
    const signupFormInputFields = {
      username: document.querySelector(
        "#signup-main form input[name = 'username']"
      ),
      useremail: document.querySelector(
        "#signup-main form input[name = 'useremail']"
      ),
      userpassword: document.querySelector(
        "#signup-main form input[name = 'userpassword']"
      ),
    };
    /* NodeList object that holds all signup page form input fields tags selected from the DOM */
    const signupFormInputFieldsList = document.querySelectorAll(
      "#signup-main form input"
    );
    /* Variable to hold signup page form tag selected from the DOM */
    const signupForm = document.querySelector("#signup-main form");
    /* Variable to hold signup buttom tag selected from the DOM */
    const signupBtn = document.querySelector("#signup-main form button");
    /* Variable to hold column tag at which new account registeration success message is displayed selected from the DOM*/
    const successMsg = document.querySelector("#signup-success-msg");
    /**************************Signup page General Variables**************************/
    /* Object that holds all sign up page form input fields validation regex patterns */
    const signupInputValidationRegexPatterns = {
      username: /^[A-Za-z]\w{1,19}(\s[A-Za-z]\w{1,19})?$/,
      useremail: /^[A-Za-z][^@\s]+@[a-z]{3,}\.[a-z]{3,}$/,
      userpassword:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    };

    /* =============================================================================== */

    /*--------------------------------------- 
    # Functions Definition and Implementation 
    # of signup page
    ----------------------------------------*/

    /*-----------------------------------------------------------------------------
    # Description: A function to read site details entered by user to add it to 
    # bookmarked sites list
    #------------------------------------------------------------------------------
    # @params: void
    #------------------------------------------------------------------------------
    # return type: void
    -----------------------------------------------------------------------------*/
    function createUserAccount() {
      /* Local scope variables declrations and definitions */
      const newUserAccount = {
        userId:
          registeredUserAccountsList.length > 0
            ? registeredUserAccountsList.at(-1).userId + 1
            : 1,
        username: signupFormInputFields.username.value,
        useremail: signupFormInputFields.useremail.value,
        userpassword: signupFormInputFields.userpassword.value,
      };

      /* Push the new registered user account to list of registered user accounts */
      registeredUserAccountsList.push(newUserAccount);
    }

    /*-----------------------------------------------------------------------------
    # Description: A function to clear values of signup page form input fields
    #------------------------------------------------------------------------------
    # @params: void
    #------------------------------------------------------------------------------
    # return type: void
    -----------------------------------------------------------------------------*/
    function clearSignupFormInputFields() {
      /* Traverse over NodeList of signup page input fields and clear their values */
      for (
        let counter = 0;
        counter < signupFormInputFieldsList.length;
        counter++
      ) {
        signupFormInputFieldsList[counter].value = "";
      }
    }

    /*-----------------------------------------------------------------------------
    # Description: A function to validate entered values of signup page form input 
    # fields
    #------------------------------------------------------------------------------
    # @params: 
    # @param1 : inputField (object) --> Form input field to be validated 
    #------------------------------------------------------------------------------
    # return type: Boolean
    -----------------------------------------------------------------------------*/
    function validateSignupFormInputField(inputField) {
      /* Local scope variables declrations and definitions */
      const { value, name } = inputField;
      let isValid = true;

      /* Validate the value of passed input field */
      isValid = signupInputValidationRegexPatterns[name].test(value);

      /* Check if passed email is unique and not registered before */
      if (name === "useremail" && registeredUserAccountsList.length > 0) {
        if (
          registeredUserAccountsList.find((user) => user.useremail === value)
        ) {
          isValid = false;
          inputField.nextElementSibling.nextElementSibling.classList.replace(
            "d-none",
            "d-block"
          );
          return isValid;
        } else {
          inputField.nextElementSibling.nextElementSibling.classList.replace(
            "d-block",
            "d-none"
          );
        }
      }

      /* Check if validation has passed */
      if (isValid) {
        inputField.nextElementSibling.classList.replace("d-block", "d-none");
      } else {
        inputField.nextElementSibling.classList.replace("d-none", "d-block");
      }

      return isValid;
    }

    /*-----------------------------------------------------------------------------
    # Description: A function to validate entered values of all signup page form
    # input fields
    #------------------------------------------------------------------------------
    # @params: void 
    #------------------------------------------------------------------------------
    # return type: Boolean
    -----------------------------------------------------------------------------*/
    function validateAllSignupFormInputFields() {
      /* Local scope variables declrations and definitions */
      let isValid = true;

      /* Traverse over NodeList of signup page form input fields */
      for (
        let counter = 0;
        counter < signupFormInputFieldsList.length;
        counter++
      ) {
        if (!validateSignupFormInputField(signupFormInputFieldsList[counter])) {
          isValid = false;
        }
      }

      return isValid;
    }

    /*-----------------------------------------------------------------------------
    # Description: A function to register a new user account
    #------------------------------------------------------------------------------
    # @params: void
    #------------------------------------------------------------------------------
    # return type: void
    -----------------------------------------------------------------------------*/
    function registerUserAccount() {
      /* Create new user account */
      createUserAccount();

      /* Clear signup page form input fields */
      clearSignupFormInputFields();

      /* Update local storage with new user account */
      updateLocalStorage(listOfUserAccountsKey, registeredUserAccountsList);

      console.log(registeredUserAccountsList);
    }

    /* =============================================================================== */

    /*--------------------------------------------- 
    # Event Listeners Definition and Implementation
    # for signup page
    ---------------------------------------------*/

    /* Add change event listener on all sign up form input fields */
    for (
      let counter = 0;
      counter < signupFormInputFieldsList.length;
      counter++
    ) {
      signupFormInputFieldsList[counter].addEventListener("change", (event) => {
        /* Hide success message if it shows */
        if (!successMsg.classList.contains("d-none")) {
          successMsg.classList.toggle("d-none");
        }
        /* Validate the passed value on target input field on change event */
        validateSignupFormInputField(event.target);
      });
    }

    /* Add submit event on signup form */
    signupForm.addEventListener("submit", (event) => {
      /* Prevent Page Reload Effect */
      event.preventDefault();
    });

    /* Add click event listener on signup button */
    signupBtn.addEventListener("click", () => {
      /* Hide success message if it shows */
      if (!successMsg.classList.contains("d-none")) {
        successMsg.classList.toggle("d-none");
      }
      /* Check if entered values of all form input fields of signup page is valid pr not */
      if (validateAllSignupFormInputFields()) {
        /* Register a new user account */
        registerUserAccount();

        /* Show new account success message */
        successMsg.classList.toggle("d-none");

        /* Set timeout up to 2 secs then navigate to login page */
        window.setTimeout(() => {
          /* Open Login Page Automatically */
          window.location.href = "index.html";
        }, 2000);
      }
    });

    break;

  case "/home.html":
    /*-------------------------------------------------- 
    # Global Scope Variables declarations and definition
    # of home page
    ---------------------------------------------------*/
    /**************************Home Page Components Variables**************************/
    /* Variable to hold home page heading 1 tag selected from the DOM */
    const homePageHeading1 = document.querySelector("#home-main section h1");
    /* Variable to hold home page logout button tag selected from the DOM */
    const logoutBtn = document.querySelector("#navbar > div > button");

    /**************************Home Page General Variables**************************/
    /* Variable to hold username to be displayed on home page after successful login */
    let username;

    /*--------------------------------------- 
    # Home Page Entry Point
    ----------------------------------------*/
    /* Get username of user who successfully logged in from local storage */
    username = getFromLocalStorage(usernameKey);

    /* Display this username on heading1 of home page */
    displayUserName();

    /* =============================================================================== */

    /*--------------------------------------- 
    # Functions Definition and Implementation 
    # of home page
    ----------------------------------------*/
    /*-----------------------------------------------------------------------------
    # Description: A function to display username of user who successfully logged 
    # in 
    #------------------------------------------------------------------------------
    # @params: void
    #------------------------------------------------------------------------------
    # return type: void
    -----------------------------------------------------------------------------*/
    function displayUserName() {
      homePageHeading1.innerHTML = `Welcome ${username}`;
    }

    break;
}
