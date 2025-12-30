import { getLoggedInUser, logOutUser } from "../shared/usertoken.js";

if(!getLoggedInUser())
  window.location.href = '/html/login/login.html';

const userId = getLoggedInUser();

document.querySelector('.js-logout-user')
  .addEventListener('click', () => {
    logOutUser();
  });


