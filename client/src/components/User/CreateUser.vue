<template>
  <div class="create-user-container">
    <h1>สร้างผู้ใช้</h1>
    <form v-on:submit.prevent="createUser" class="user-form">
      <div class="form-group">
        <label for="name">ชื่อ:</label>
        <input type="text" id="name" v-model="user.name" required class="form-input">
      </div>
      <div class="form-group">
        <label for="lastname">นามสกุล:</label>
        <input type="text" id="lastname" v-model="user.lastname" required class="form-input">
      </div>
      <div class="form-group">
        <label for="email">อีเมล:</label>
        <input type="email" id="email" v-model="user.email" required class="form-input">
      </div>
      <div class="form-group">
        <label for="password">รหัสผ่าน:</label>
        <input type="password" id="password" v-model="user.password" required class="form-input">
      </div>
      <div>
        <button type="submit" class="submit-button">สร้างผู้ใช้</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.create-user-container {
  max-width: 500px; /* กำหนดความกว้างสูงสุด */
  margin: 50px auto; /* จัดกลาง */
  padding: 20px; /* Padding รอบฟอร์ม */
  background-color: #ffffff; /* สีพื้นหลัง */
  border-radius: 10px; /* มุมมน */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* เงา */
}

h1 {
  text-align: center; /* จัดกลางข้อความ */
  color: #34495e; /* สีข้อความ */
  font-family: 'Montserrat', sans-serif; /* ฟอนต์ */
}

.form-group {
  margin-bottom: 15px; /* ระยะห่างระหว่างฟอร์ม */
}

label {
  display: block; /* ให้ label เป็น block */
  margin-bottom: 5px; /* ระยะห่างด้านล่าง */
  color: #333; /* สีข้อความ */
}

.form-input {
  width: 100%; /* ให้ input กว้างเต็มที่ */
  padding: 10px; /* Padding */
  border: 1px solid #bdc3c7; /* เส้นขอบ */
  border-radius: 5px; /* มุมมน */
  background-color: #ecf0f1; /* สีพื้นหลังของ input */
  color: #34495e; /* สีข้อความใน input */
}

.form-input:focus {
  border-color: #1abc9c; /* เปลี่ยนสีขอบเมื่อ focus */
  outline: none; /* ปิดเส้นขอบเมื่อ focus */
}

.submit-button {
  padding: 10px 15px; /* Padding */
  background-color: #007bff; /* สีน้ำเงินสำหรับปุ่ม */
  color: white; /* สีข้อความ */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 5px; /* มุมมน */
  cursor: pointer; /* แสดงมือเมื่อ hover */
  transition: background-color 0.3s; /* Transition */
}

.submit-button:hover {
  background-color: #0056b3; /* เปลี่ยนสีเมื่อ hover */
}
</style>
