import { User } from "../../data/user/User.js";
import dayjs from 'dayjs';
import { logInDialog } from "../shared/modal.js";
import { getLoggedInUser, issueToken } from "../shared/usertoken.js";

const user = new User('Users');

const loginElem = document.querySelector('.js-login-button');
const emailElem = document.querySelector('.js-email-login');
const passElem = document.querySelector('.js-password-login');

loginElem.addEventListener('click', () => {
  
  userInput();
});

function userInput(){
  const email = emailElem.value;
  const password = passElem.value;
  let tempValue = [email, password];
  let result;

  if(fieldChecker(tempValue)) {
    result =  user.getUser({
      email, 
      password
    });

    if(result) {
      let isLoggedIn;
      issueToken(result.id);
      isLoggedIn = getLoggedInUser();
      logInDialog();
    }

  }
}

function fieldChecker(data) {
  let result = 0;
  data.forEach((field, index) => {
    const errorElem = document.querySelector(`.js-field-${index}`);
    if(field.trim() === '') {
      result++;
      errorElem.classList.remove('hidden');
    } else
      errorElem.classList.add('hidden');

  });
  
  return result === 0 ? true : false;
}