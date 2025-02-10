<template>
  <div class="settings-page">
    <h1>Matematik denemeniz nasıl olsun</h1>
    <div class="form-group">
      <label for="questionCount">Soru Sayısı:</label>
      <input
        type="number"
        id="questionCount"
        v-model="settings.questionCount"
        min="1"
        placeholder="Soru sayısı giriniz"
      />
    </div>

    <div class="form-group">
      <label>Zorluk Derecesi:</label>
      <div class="difficulty-options">
        <div class="option">
          <span>Kolay</span>
          <input
            type="radio"
            value="kolay"
            v-model="settings.difficulty"
          />
        </div>
        <div class="option">
          <span>Orta</span>
          <input
            type="radio"
            value="orta"
            v-model="settings.difficulty"
          />
        </div>
        <div class="option">
          <span>Zor</span>
          <input
            type="radio"
            value="zor"
            v-model="settings.difficulty"
          />
        </div>
      </div>
    </div>

    <button class="btn" @click="saveSettings">Başla</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        questionCount: 10,
        difficulty: "kolay",
      },
    };
  },
  methods: {
    saveSettings() {
      alert(
        `Ayarlar kaydedildi:\nSoru Sayısı: ${this.settings.questionCount}\nZorluk Derecesi: ${this.settings.difficulty}`
      );
      this.$router.push({
        path: '/quiz',
        query: {
          questionCount: this.settings.questionCount,
          difficulty: this.settings.difficulty,
        },
      });
    },
  },
};
</script>

<style>
body {
  background-color: #f4f4f4;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.settings-page {
  padding: 30px;
  max-width: 400px;
  margin: 80px auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 25px;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 14px;
}

.difficulty-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option span {
  font-size: 16px;
  color: #333;
}

.option input[type="radio"] {
  margin-left: 10px;
}

.btn {
  padding: 12px 25px;
  background-color: #42b983;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #369b72;
}
</style>
