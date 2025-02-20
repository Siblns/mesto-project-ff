const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: 'a25820d5-9e2c-4bcf-b71d-ca811ca0e2a9',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })  
  .then(handleResponse)
};

export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse);
};

export const createNewCard = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify(
      {
        name: newCard.name,
        link: newCard.link,
        _id: newCard._id
      }),
    headers: config.headers
  })
  .then(handleResponse);
};

export const removeCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse);
};

export const editProfile = (dataProfile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(
      {
        name: dataProfile.name,
        about: dataProfile.about
      }),
    headers: config.headers
  })
  .then(handleResponse);
};

export const editProfileAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
        avatar: newAvatar.avatar
      }),
      headers: config.headers
  })
  .then(handleResponse);
};

export const setLikeCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
};

export const delLikeCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,  {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse);
};