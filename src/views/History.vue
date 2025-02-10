<template>
  <div class="history-page">
    <h1>Geçmiş Sonuçları</h1>
    <div v-if="quizResults.length > 0">
      <div v-for="(result, index) in quizResults" :key="index" class="result-container">
        <p><strong>Kullanıcı Adı:</strong> {{ result.username }}</p>
        <p><strong>Doğru sayısı:</strong> {{ result.correctAnswers }} / {{ result.totalQuestions }}</p>
        <p><strong>Puan:</strong> {{ result.score }}</p>
        <p><strong>Zorluk:</strong> {{ result.difficulty }}</p>
        <p><strong>Süre:</strong> {{ result.time }}</p>
        <hr />
      </div>
    </div>
    <div v-else>
      <p>Quiz sonucu bulunamadı.</p>
    </div>
    <div class="action-buttons">
      <button class="btn" @click="logout">Çıkış Yap</button>
      <button class="btn" @click="restartQuiz">Yeniden Başla</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "HistoryView",
  data() {
    return {
      quizResults: [],
    };
  },
  created() {
    this.fetchQuizResults();
  },
  methods: {
    fetchQuizResults() {
      axios.get('http://localhost:3000/quizResults')
        .then(response => {
          this.quizResults = response.data;
        })
        .catch(error => {
          console.error('Sonuçlar getirilirken hata oluştu:', error);
        });
    },
    logout() {
      this.$router.push('/');
    },
    restartQuiz() {
      this.$router.push('/settings');
    }
  }
};
</script>

<style>
.history-page {
  padding: 20px;
  max-width: 600px;
  margin: 50px auto;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.result-container {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
}

.result-container p {
  margin: 5px 0;
  color: #555;
}

.result-container strong {
  color: #333;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
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
</style>
