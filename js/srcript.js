const test=document.getElementById("start-btn")
const Préambule=document.getElementById("para")
const sectionQuest=document.getElementById("question")
const stepper=document.querySelectorAll(".barre h1")
const suivant=document.getElementById("next-btn")
const question=document.getElementById("nextQuestion")
const select=document.querySelector(".answer-inputs")
const présedent=document.getElementById("pré-btn")
const bare=document.querySelector(".one")
const widthBare=document.querySelector(".progresse-bare")
const titre=document.getElementById("titre")
const resultMessage=document.querySelectorAll(".Préambule p")





select.addEventListener("change",unclic)


//-----index0------------//
 let index=0;
//-----index0------------//
let knowQuestion={};
//------------------demarage test--------------------------------------//
test.addEventListener('click',()=>{
    test.classList.add("visible")
    Préambule.classList.add("visible")
    sectionQuest.classList.remove("visible")
    stepper[0].classList.remove("mouvement")
    stepper[1].classList.add("mouvement")

    
    showButton()
    suivant.disabled=true
    terminer()
    
    

})
//------------------demarage test--------------------------------------//
//------------------lancement button++--------------------------------------//

suivant.addEventListener('click',()=>{
    
    if(index<21){
    affichage(questions[index])
    showButton()
    prog(index)
    suivant.disabled=true
    index++
    if (index===21){
        suivant.innerHTML="Terminer"
        suivant.classList.add("résult")
    const doneTest=document.querySelector(".résult")
    doneTest.addEventListener("click",condition)
    
    
    }else{
        suivant.innerHTML="Suivant"
    }
}
})



function affichage(questions){

    question.innerText=questions.question
    select.innerHTML = ''


    if(questions.input.type==='radio'){

      questions.input.answer.forEach(answer =>{

        select.innerHTML += 
         `<div>
        <input type="radio"  name="${questions.input.questionNumber}"id="${answer.text}">
        <label for="${answer.text}">
            <i class="fa ${ answer.icon}"></i>
            <span>${answer.text}</span> </label>
        </div>
        `

      })
    
    }else{

        select.innerHTML=` <input type="number" name="${questions.input.questionNumber} id="${questions.input.name}" 
         min="${questions.input.min}" max="${questions.input.max}" placeholder=" ${questions.input.min}- ${questions.input.max}">
        <span class="input-span">${questions.input.name}</span>`
        
    }


}

//------------------lancement button----------------------------//
//--------------------en arriere-----------------//
présedent.addEventListener('click',()=>{

    index--
    affichage(questions[index])
    prog(index)
    showButton()
    suivant.disabled=true


   if(index===21){
    suivant.innerHTML="Terminer"
    
   }else{
    suivant.innerHTML="Suivant"
   }
    
})



function showButton(){
    if(index===0){
        présedent.style.visibility="hidden"
    }else{
        présedent.style.visibility="visible"
    }
}



//--------------------en arriere-----------------//
//--------------------move-prog-----------------//
function prog(blue){
  const addNumber=blue+1;
  bare.innerHTML=addNumber;
  widthBare.style.width=`calc(${addNumber}*calc(100%/22))`

}
//-------------unclicable-débat----------------------//
function unclic(event){
const input=event.target
if(input.type==="number"){
    const number=parseFloat(input.value)
    if(number>=input.min&&number<=input.max){
        suivant.disabled=false
        knowQuestion[input.name]=input.value
    }else{
        suivant.disabled=true
    }
}else{
    suivant.disabled=false 
    knowQuestion[input.name]=input.id

}
console.log(knowQuestion) 

}
//------------------------------------//



function résult(risque){
    stepper[1].classList.remove("mouvement")
    stepper[2].classList.add("mouvement")
    sectionQuest.classList.add("visible")
    Préambule.classList.remove("visible")
    test.classList.remove("visible")
    test.innerHTML="recommencer le test"
    titre.innerHTML="résultat"
    test.addEventListener('click',()=>{
        window.location.reload();
    })
    if (risque === 0) {
        resultMessage[0].innerText =
            "Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19, consulter la page Conseils";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#026535";
    } else if (risque === 1) {
        resultMessage[0].innerText =
            "Nous vous conseillons de rester à votre domicile et de contacter votre médecin en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouveau l’application pour réévaluer vos symptômes";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#026535";
    } else if (risque === 2) {
        resultMessage[0].innerText =
            "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domicile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#787878";
    }  else if(risque>2) {
        resultMessage[0].innerText = "Appelez le 141";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
    
        resultMessage[0].style.color = "#d63031";
        resultMessage[0].style.fontSize = "28px";
        resultMessage[0].style.fontWeight = "bolder";
    }

}
//-------------------algo---------------//
let risque=0
function condition(){
    if(knowQuestion['Q1']==="oui"){
      risque++
    }
    if(parseFloat(knowQuestion['Q2'])>39||parseFloat(knowQuestion['Q2'])<35){
        risque++
      }
      if(knowQuestion['Q3']==="oui"){
        risque++
      }
      if(knowQuestion['Q4']==="oui"){
        risque++
      }
      if(knowQuestion['Q5']==="oui"){
        risque++
      }
      if(knowQuestion['Q6']==="oui"){
        risque++
      }
      if(knowQuestion['Q10']==="Très fatigué"||knowQuestion['Q10']==="Fatigué(e)"){
        risque++
      }
      résult(risque)
}
//-------------------algo---------------//











//--------question----------------//
const questions = [{
    question: 'Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ?',

    input: {
        type: 'radio',
        questionNumber: 'Q1',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Quelle est votre température corporelle ?',

    input: {
        type: 'number',
        questionNumber: 'Q2',
        name: 'degrés',
        min: 34,
        max: 42
    }
}, {
    question: 'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',

    input: {
        type: 'radio',
        questionNumber: 'Q3',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question:'Avez-vous eu des courbatures inhabituelles au cours des derniers jours ?',

    input: {
        type: 'radio',
        questionNumber: 'Q4',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces derniers jours, avez-vous un mal de gorge ?',

    input: {
        type: 'radio',
        questionNumber: 'Q5',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.',

    input: {
        type: 'radio',
        questionNumber: 'Q6',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces derniers jours, avez-vous une fatigue inhabituelle qui vous a obligé à vous reposer plus de la moitié de la journée ?',

    input: {
        type: 'radio',
        questionNumber: 'Q7',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?',

    input: {
        type: 'radio',
        questionNumber: 'Q8',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Dans les dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?',

    input: {
        type: 'radio',
        questionNumber: 'Q9',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Actuellement, comment vous vous sentez ?',

    input: {
        type: 'radio',
        questionNumber: 'Q10',
        answer: [{
            text: 'Bien',
            icon: ' far fa-laugh'
        }, {
            text: 'Assez bien',
            icon: ' far fa-smile'
        }, {
            text: 'Fatigué(e)',
            icon: ' far fa-frown'
        }, {
            text: 'Très fatigué',
            icon: 'far fa-dizzy'
        }]
    }
}, {
    question: 'Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique.',

    input: {
        type: 'number',
        questionNumber: 'Q11',
        name: 'ans',
        min: 15,
        max: 110
    }
}, 

{
    question: 'Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        type: 'number',
        questionNumber: 'Q12',
        name: 'kg',
        min: 20,
        max: 250
    }
}, 

{
    question: 'Quelle est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        type: 'number',
        questionNumber: 'Q13',
        name: 'cm',
        min: 80,
        max: 250
    }
},

{
    question: 'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?',

    input: {
        type: 'radio',
        questionNumber: 'Q14',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Êtes-vous diabétique ?',

    input: {
        type: 'radio',
        questionNumber: 'Q15',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Avez-vous ou avez-vous eu un cancer ?',

    input: {
        type: 'radio',
        questionNumber: 'Q16',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 

{
    question: 'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',

    input: {
        type: 'radio',
        questionNumber: 'Q17',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Avez-vous une insuffisance rénale chronique dialysée ?',

    input: {
        type: 'radio',
        questionNumber: 'Q18',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 

{
    question: 'Avez-vous une maladie chronique du foie ?',

    input: {
        type: 'radio',
        questionNumber: 'Q19',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 
{
    question: 'Êtes-vous enceinte ?',

    input: {
        type: 'radio',
        questionNumber: 'Q20',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }, {
            text: 'Homme',
            icon: 'fa-male'

        }]
    }
},
 {
    question: 'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',

    input: {
        type: 'radio',
        questionNumber: 'Q21',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 
{
    question: 'Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).',
    
    input: {
        type: 'radio',
        questionNumber: 'Q22',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}

]
//--------question----------------//



