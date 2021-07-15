"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $myStoriesList = $("#my-stories");
const $favoritesList = $("#favorites");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $storyForm =$("#story-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmit = $("#nav-submit");
const $navMyStories = $("#nav-mystories");
const $navFavorites = $("#nav-favorites");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $storyForm, 
    $myStoriesList,
    $favoritesList
    
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");
  // if credentials in localStorage return current user  (or null - if couldn'y get from API) or false (if not in local Storage)
  await checkForRememberedUser();
  
  //get stories from API, create storyList, generate HTML list for storyList and put in on page 
  await getAndShowStoriesOnStart();

  // if we got a logged-in user change a navbar
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
