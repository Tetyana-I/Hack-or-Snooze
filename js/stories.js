"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get  stories from API, create main list of stories - storyList, generate HTML list and show stories when site first loads. */
//////////////////////////////////////////////////////////////////////////
async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories(); //storyList - main list of stories (StoryList class instance)
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

// to add story to a storyList
/////////////////////////////////////////////////////////////////////////////
async function addStoryToAllStoriesList(evt) {
  evt.preventDefault();
  console.debug("addStoryToAllStoriesList");
  // get UI data
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();
  // clean a form
  $storyForm.trigger("reset");
  // add a new story to API:
  const storyObj = {author,title, url};
  const story = await storyList.addStory(currentUser,storyObj); 
  // update main and ownStories lists
  currentUser.ownStories.unshift(story); 
  storyList.stories.unshift(story); 
  
  const $story = generateStoryMarkup(story); // create new list item in HTML list
  putStoriesOnPage(); 
}
$storyForm.on("submit", addStoryToAllStoriesList);

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
//
//////////////////////////////////////////////////////////////////////
function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);
  const showIcons = Boolean(currentUser); // show icons in LI only if a user logged in
  let starIcon = '';
  let trashIcon = '';

  if (showIcons) {
    // choose type of star and create star-icon
    if (currentUser.favoriteStory(story)) starIcon =`<span class="favorites"><i class="fas fa-star"></i></span>`
      else starIcon =`<span class="favorites"><i class="far fa-star"></i></span>`;
    // create a trash-icon
    if (currentUser.ownStory(story)) trashIcon = `<span class="to-delete"><i class="fas fa-trash-alt"></i></span>`;
  }
 
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${starIcon}
        ${trashIcon}
        <a href="${story.url}" target="a_blank" class="story-link">${story.title}</a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
    
}


// function to handle favorites choice
/////////////////////////////////////////////////////////////////////
async function handleStarClick(evt) {
  console.debug("handleStarClick");
  const $storyLi =  $(evt.target).closest("li");
  const storyId = $storyLi.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId);
  if ($(evt.target).hasClass('fas')) 
     //a story is in favorites
     {
        await currentUser.deleteFromFavorites(story); // delete from favorites
     }
     else 
      //a story is not in favorites
         {
          await currentUser.addToFavorites(story); // add to favorites
         }
  $(evt.target).toggleClass("fas"); 
  $(evt.target).toggleClass("far");
}  
// a logged-in user can favorote/unfavorite on any list:
$allStoriesList.on("click", ".favorites", handleStarClick);
$myStoriesList.on("click", ".favorites", handleStarClick);
$favoritesList.on("click", ".favorites", handleStarClick);

// function to handle trash-icon click
async function deleteStoryClick(evt) {
  console.debug("deleteStoryClick");
  // find out a storyId for a clicked story:
  const $storyLi =  $(evt.target).closest("li");
  const storyId = $storyLi.attr('id');
  if ($(evt.target).hasClass('fa-trash-alt')) {
    //delete story from API and all lists:
    await storyList.deleteStory(currentUser, storyId); 
    //update HTML lists and put it on page
    putStoriesOnPage();
  }
}  
// delete own stories a current user can from any list:
$allStoriesList.on("click", ".to-delete", deleteStoryClick);
$myStoriesList.on("click", ".to-delete", deleteStoryClick);
$favoritesList.on("click", ".to-delete", deleteStoryClick);



/** Generates a new HTML for storyList, and puts it on page. */
/////////////////////////////////////////////////////////////////
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  hidePageComponents();
  $allStoriesList.empty(); // clear an "old" html storyList
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show(); //display a new generated story list
}


