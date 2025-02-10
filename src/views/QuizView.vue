<template>
  <div class="quiz-page">
    <button class="btn history-btn" @click="goToHistory">Geçmiş</button>
    <div class="header">
      <h1>Sorular</h1>
    </div>
    <p class="timer">Süre: {{ formattedTime }}</p>
    <div v-if="questions.length > 0">
      <div v-for="(question, index) in questions" :key="index" class="question-container">
        <p>Soru {{ index + 1 }}: {{ question.text }}</p>
        <input
          type="text"
          v-model="userAnswers[index]"
          placeholder="Cevabınızı girin"
        />
      </div>
      <button class="btn" @click="submitAnswers">Cevapları Gönder</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "QuizView",
  data() {
    return {
      questions: [],
      userAnswers: [],
      timer: 0,
      interval: null,
      difficulty: this.$route.query.difficulty || 'kolay'
    };
  },
  created() {
    this.generateQuestions();
    this.startTimer();
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes} dk ${seconds} sn`;
    },
  },
  methods: {
    generateQuestions() {
      const questionCount = parseInt(this.$route.query.questionCount) || 5;
      for (let i = 0; i < questionCount; i++) {
        let num1, num2, operator;

        switch (this.difficulty) {
          case 'zor':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            break;
          case 'orta':
            num1 = Math.floor(Math.random() * 25) + 1;
            num2 = Math.floor(Math.random() * 25) + 1;
            break;
          default:
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        }

        const operators = ['+', '-', '*'];
        operator = operators[Math.floor(Math.random() * operators.length)];

        let answer;
        switch (operator) {
          case '+':
            answer = num1 + num2;
            break;
          case '-':
            answer = num1 - num2;
            break;
          case '*':
            answer = num1 * num2;
            break;
        }

        this.questions.push({
          text: `${num1} ${operator} ${num2} = ?`,
          answer: answer,
        });
        this.userAnswers.push("");
      }
    },
    startTimer() {
      this.interval = setInterval(() => {
        this.timer++;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    submitAnswers() {
  this.stopTimer();

  let correctCount = 0;
  this.questions.forEach((question, index) => {
    if (parseInt(this.userAnswers[index]) === question.answer) {
      correctCount++;
    }
  });

  const totalScore = (correctCount / this.questions.length) * 100;

  alert(`Doğru cevap sayınız: ${correctCount} / ${this.questions.length}\nPuanınız: ${totalScore}\nSüre: ${this.formattedTime}`);

  axios.post('http://localhost:3000/quizResults', {
    username: localStorage.getItem('username'),
    correctAnswers: correctCount,
    totalQuestions: this.questions.length,
    score: totalScore,
    time: this.formattedTime,
    difficulty: this.difficulty
  }).then(() => {
    console.log('Sonuçlar kaydedildi.');
  });

  this.goToHistory();
},
goToHistory() {
  this.$router.push('/history');
},
  },
};
</script>

<style>
.quiz-page {
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  box-sizing: border-box;
  position: relative;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.question-container {
  margin-bottom: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"]:focus {
  outline: none;
  border-color: #42b983;
}

.btn {
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.btn:hover {
  background-color: #369b72;
}

.history-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 13px 18px;
  background-color: #007bff;
  font-size: 12px;
}

.history-btn:hover {
  background-color: #0056b3;
}

p {
  color: red;
}
</style>
