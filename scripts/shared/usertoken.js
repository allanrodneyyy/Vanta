export function issueToken(userId) {
  const token = {
    userId,
    timestamp: Date.now()
  }

  localStorage.setItem('userToken', JSON.stringify(token));
}

export function getLoggedInUser() {
  const token = JSON.parse(localStorage.getItem('userToken')) || null;

  if(!token)
    return null;

  const now = Date.now();
  const autoLogoutTimer = 24 * 60 * 60 * 1000;
  
  if(now - token.timestamp > autoLogoutTimer){
    localStorage.removeItem('userToken');
    return null;
  }

  return token.userId;
}

export function logOutUser() {
  localStorage.removeItem('userToken');
  window.location.href = '/html/login/login.html';
}