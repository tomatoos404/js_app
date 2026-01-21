const monInput = document.getElementById('monInput');
const monInput2 = document.getElementById('monInput2');
const monBouton = document.getElementById('monBouton');
const monBouton2 = document.getElementById('monBouton2');
const monInputVote = document.getElementById('monInputVote');
const monBoutonVoter = document.getElementById('monBoutonVote');
const monSelect = document.getElementById('usersList');
 
// Ajout d'un écouteur d'événement sur le deuxième bouton
monBouton2.addEventListener('click', () => {
    fetch('/info').then(
        response => response.json()
    ).then(
        JsonResponse => {
            document.getElementById('reponse').innerHTML = JsonResponse.cle1;
        }    
    );   
}); 

// Ajout d'un écouteur d'événement sur le bouton d'inscription
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            inputValue: monInput.value, 
            inputValue2: monInput2.value, 
            selectedUserId: monSelect.value 
        })     
    }).then(response => response.json())
      .then(data => {
          console.log(data);
      });
});

// Bouton pour voter
monBoutonVoter.addEventListener('click', () => {
    fetch('/voter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            userId: monSelect.value,
            voteValue: monInputVote.value 
        })     
    }).then(response => response.json())
      .then(data => {
          console.log(data);
      });
});

// CORRECTION: fusionner les deux window.onload en une seule fonction
window.onload = () => {
    // Charger la liste des utilisateurs dans le select
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        const usersList = document.getElementById('usersList');
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.text = user.login;
            usersList.appendChild(option);  
        });
    });

        fetch('/votes-count')
            .then(response => response.json())
            .then(votes => {
        const usersIdList = document.getElementById('listUl');
        votes.forEach(vote => {
            const li = document.createElement('li');
            li.textContent = vote.vote + ' -----  ' + vote.login + ''   ;
            usersIdList.appendChild(li);
            console.log(vote);  
        });
    });

    // Charger la liste des utilisateurs dans la liste
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        const usersIdList = document.getElementById('listUl');
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.login + ' ----- (ID = ' + user.id + ')';
            usersIdList.appendChild(li);  
        });
    });


    
}

