<template>
  <div id="app" class="login-page">
    <div class="login-container">
      <h2>Giriş Yap</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            type="text"
            v-model="username"
            placeholder="Kullanıcı Adı"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            placeholder="Şifre"
            required
          />
        </div>
        <div class="button-group">
          <button type="submit" class="btn">Giriş</button>
          <button type="button" class="btn" @click="$router.push('/register')">Kayıt Ol</button>
          <button type="button" class="btn" @click="guestLogin">Misafir Girişi</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.get("http://localhost:3000/users", {
          params: {
            username: this.username,
            password: this.password
          }
        });

        if (response.data.length > 0) {
          localStorage.setItem('username', this.username);
          alert("Giriş başarılı!");
          this.$router.push("/settings");
        } else {
          alert("Hatalı kullanıcı adı veya şifre!");
        }
      } catch (error) {
        alert("Giriş sırasında bir hata oluştu.");
        console.error(error);
      }
    },
    guestLogin() {
      alert("Misafir olarak giriş yapıldı.");
      this.$router.push("/settings");
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f0f0f0;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  flex: 1;
  padding: 10px;
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