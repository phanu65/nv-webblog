<template>
  <div class="login-container">
    <h1>Medicine Login</h1>
    <form v-on:submit.prevent="onLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
          class="form-input"
        />
      </div>
      <button type="submit" class="login-button">Login</button>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import AuthenService from "@/services/AuthenService"; // ตรวจสอบว่าเส้นทางนี้ถูกต้อง
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        // จัดเก็บโทเค็นและข้อมูลผู้ใช้ใน Vuex
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setMedicine", response.data.user); // เก็บข้อมูลผู้ใช้ที่เข้าสู่ระบบ

        // เปลี่ยนเส้นทางไปยังหน้ารายการยา (medicines)
        this.$router.push({
          name: "medicines",
        });
      } catch (error) {
        // ตรวจสอบข้อผิดพลาดและแสดงข้อความข้อผิดพลาด
        console.error("Error during login:", error);
        if (error.response && error.response.data && error.response.data.error) {
          this.error = error.response.data.error;
        } else {
          this.error = "Login failed. Please try again.";
        }

        // เคลียร์ฟิลด์หลังจากเกิดข้อผิดพลาด
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background-color: #f5f5f5; /* Light grey background */
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50; /* Dark blue shade */
  font-family: 'Montserrat', sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
}

.form-input {
  width: 95%;
  padding: 12px;
  border: 2px solid #2ecc71; /* Vivid green border */
  border-radius: 5px;
  background-color: #ecf0f1;
  color: #34495e;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  border-color: #3498db; /* Bright blue when focused */
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #27ae60; /* Deep green */
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2ecc71; /* Lighter green */
}

.error {
  color: #e74c3c; /* Red for errors */
  margin-top: 10px;
  font-size: 14px;
}
</style>
