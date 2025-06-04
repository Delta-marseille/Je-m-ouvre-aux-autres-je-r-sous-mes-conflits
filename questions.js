document.addEventListener('DOMContentLoaded', function () {
  const questions = [
  { number: "Question 1", prompt: "Quel est votre rythme de travail préféré ?" },
  { number: "Question 2", prompt: "Comment réagissez-vous face à une difficulté ?" },
  { number: "Question 3", prompt: "Préférez-vous travailler seul ou en équipe ?" },
  { number: "Question 4", prompt: "Prenez-vous facilement des décisions ?" },
  { number: "Question 5", prompt: "Quelle est votre approche du changement ?" },
  { number: "Question 6", prompt: "Comment vous décririez-vous socialement ?" },
  { number: "Question 7", prompt: "Quelle importance accordez-vous à la planification ?" },
  { number: "Question 8", prompt: "Avez-vous tendance à suivre les règles ou à improviser ?" },
  { number: "Question 9", prompt: "Comment gérez-vous les conflits ?" },
  { number: "Question 10", prompt: "Êtes-vous à l’aise avec l’inconnu ?" },
  { number: "Question 11", prompt: "Comment vous sentez-vous dans des environnements bruyants ?" },
  { number: "Question 12", prompt: "Quelle place accordez-vous à l’intuition dans vos décisions ?" },
  { number: "Question 13", prompt: "Comment réagissez-vous sous pression ?" },
  { number: "Question 14", prompt: "Quelle est votre tolérance à la routine ?" },
  { number: "Question 15", prompt: "Préférez-vous planifier ou improviser vos journées ?" }
];

  const choices = ['1: Jamais ', '2: Rarement', '3: Quelquefois', '4: Fréquemment', '5: Très souvent'];
  let currentIndex = 0;
  const responses = {};

  const container = document.getElementById('questionsContainer');

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('question');
    div.id = `question${index}`;
    div.innerHTML = `
      <div class="number">${q.number}</div>
      <div class="prompt">${q.prompt}</div>
    ` + choices.map(choice => `
      <label><input type="radio" name="q${index}" value="${choice}" required> ${choice}</label>
    `).join('');
    container.appendChild(div);
  });

  document.getElementById('question0').classList.add('active');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      document.getElementById(`question${currentIndex}`).classList.remove('active');
      currentIndex--;
      document.getElementById(`question${currentIndex}`).classList.add('active');
      updateButtons();
    }
  });

  nextBtn.addEventListener('click', () => {
    const currentInputs = document.getElementsByName(`q${currentIndex}`);
    const selected = [...currentInputs].find(input => input.checked);
    if (selected) {
      responses[`q${currentIndex}`] = selected.value;
      document.getElementById(`question${currentIndex}`).classList.remove('active');
      currentIndex++;
      document.getElementById(`question${currentIndex}`).classList.add('active');
      updateButtons();
    } else {
      alert('Veuillez sélectionner une réponse.');
    }
  });

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.style.display = currentIndex < questions.length - 1 ? 'inline' : 'none';
    submitBtn.style.display = currentIndex === questions.length - 1 ? 'inline' : 'none';
  }

  document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const lastInputs = document.getElementsByName(`q${currentIndex}`);
    const selected = [...lastInputs].find(input => input.checked);
    if (selected) {
      responses[`q${currentIndex}`] = selected.value;
    }
    console.log('Réponses enregistrées :', responses);
    alert('Réponses enregistrées en console.');
  });
});