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





select.addEventListener("change",unclic)


//-----index0------------//
 let index=0;
//-----index0------------//
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
        <input type="radio"  name="choix" id="${answer.text}">
        <label for="${answer.text}">
            <i class="fa ${ answer.icon}"></i>
            <span>${answer.text}</span> </label>
        </div>
        `

      })
    
    }else{

        select.innerHTML=` <input type="number"  id="${questions.input.name}"
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
    }else{
        suivant.disabled=true
    }
}else{
    suivant.disabled=false 
}
}
//------------------------------------//











//--------question----------------//
const questions = [{
    question: 'Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ?',

    input: {
        type: 'radio',
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
        name: 'degrés',
        min: 34,
        max: 42
    }
}, {
    question: 'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',

    input: {
        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}

, {
    question: 'Ces derniers jours, avez-vous un mal de gorge ?',

    input: {
        type: 'radio',
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
        name: 'ans',
        min: 15,
        max: 110
    }
}, 

{
    question: 'Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        type: 'number',
        name: 'kg',
        min: 20,
        max: 250
    }
}, 

{
    question: 'Quelle est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        type: 'number',
        name: 'cm',
        min: 80,
        max: 250
    }
},

{
    question: 'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?',

    input: {
        type: 'radio',
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



