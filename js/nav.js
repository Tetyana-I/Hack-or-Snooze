"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** 
 * When a user clicks site name: generate HTML for main story list (storyList.stories) and put it on page */
////////////////////////////////////////////////////////////////////
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}
$body.on("click", "#nav-all", navAllStories);

/** Show login/signup forms on click on "login" */
/////////////////////////////////////////////////////////////////////
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}
$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */
//////////////////////////////////////////////////////////////////////
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// when a user click "submit": show form for submitting a story
////////////////////////////////////////////////////////////////
function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $storyForm.show();
 }
 $navSubmit.on("click", navSubmitClick);
 
 //when a user click "my stories" create HTML ownStories and put it on page
 ///////////////////////////////////////////////////////////////
function navMyStoriesClick(evt) {
  console.debug("navMyStoriesClick", evt);
  hidePageComponents();
  getMyStoriesList();
  $myStoriesList.show();
 }
 $navMyStories.on("click", navMyStoriesClick);

//when a user click "favorites" create HTML favorites list and put it on page:
//////////////////////////////////////////////////////////////////
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  getFavoritesList();
  $favoritesList.show();
  }
  $navFavorites.on("click", navFavoritesClick);