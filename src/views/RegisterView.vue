<template>
  <div class="register-page">
    <h1>Kayıt Ol</h1>
    <div class="form-group">
      <label for="username">Kullanıcı Adı:</label>
      <input type="text" id="username" v-model="user.username" placeholder="Kullanıcı adınızı girin" required />
    </div>

    <div class="form-group">
      <label for="email">E-posta:</label>
      <input type="email" id="email" v-model="user.email" placeholder="E-posta adresinizi girin" required />
    </div>

    <div class="form-group">
      <label for="password">Şifre:</label>
      <input type="password" id="password" v-model="user.password" placeholder="Şifrenizi girin" required />
    </div>

    <button class="btn" @click="registerUser">Kayıt Ol</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      if (this.user.username && this.user.email && this.user.password) {
        const existingUsers = await axios.get('http://localhost:3000/users');

        if (existingUsers.data.some(user => user.username === this.user.username)) {
          alert("Bu kullanıcı adı zaten kayıtlı!");
          return;
        }

        if (existingUsers.data.some(user => user.email === this.user.email)) {
          alert("Bu e-posta zaten kayıtlı!");
          return;
        }

        await axios.post('http://localhost:3000/users', this.user);
        alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
        this.$router.push("/");
      } else {
        alert("Lütfen tüm alanları doldurun.");
      }
    },
  },
};
</script>

<style>
.register-page {
  padding: 20px;
  max-width: 400px;
  margin: 50px auto;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus {
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
</style>
