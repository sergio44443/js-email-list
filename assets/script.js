const endpoint = 'https://flynn.boolean.careers/exercises/api/random/mail';

// Seleziono gli elementi dal DOM
const domObjects = {
  mainContainer: document.getElementById('main-container'),
  emailList: document.getElementById('email-list'),
  fetchEmailsButton: document.getElementById('fetch-emails'),
  loader: document.querySelector('.loader')
}


fetchMails();



domObjects.fetchEmailsButton.addEventListener('click', fetchMails);

function generateMail(returnMail) {
  axios.get(endpoint)
    .then(response => {
      returnMail(response.data.response);
    })
    .catch(error => {
      console.log(error);
    })
}

function fetchMails() {
  toggleLoader(true);
  // Pulisco la lista prima di generare nuove email
  domObjects.emailList.innerHTML = '';
  const emailArray = [];

  // Avvia il ciclo di funzioni per generare le email
  fetchNextEmail();


  function fetchingDone() {
    emailArray.forEach(email => {
      const emailItem = document.createElement('li');
      emailItem.classList.add('email-item');
      emailItem.textContent = email;
      domObjects.emailList.appendChild(emailItem);
    });
    toggleLoader(false);
  }


  function fetchNextEmail() {
    generateMail(email => {
      emailArray.push(email);
      emailArray.length === 10 ? fetchingDone() : fetchNextEmail();
    });
  }
}