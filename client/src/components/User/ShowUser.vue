<template>
  <div class="user-container">
    <h1>ข้อมูลผู้ใช้</h1>
    <form class="user-form" @submit.prevent="updateUser">
      <div class="user-details">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <div class="form-group">
          <label for="name">ชื่อ:</label>
          <input type="text" id="name" v-model="user.name" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="lastname">นามสกุล:</label>
          <input type="text" id="lastname" v-model="user.lastname" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="email">อีเมล:</label>
          <input type="email" id="email" v-model="user.email" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="password">รหัสผ่าน:</label>
          <input type="password" id="password" v-model="user.password" required class="form-input" />
        </div>
        <p><strong>สถานะ:</strong> {{ user.status }}</p>
        <p><strong>ประเภท:</strong> {{ user.type }}</p>
        <p><strong>สร้างเมื่อ:</strong> {{ user.createdAt }}</p>
      </div>
      <div>
        <!-- <button class="update-button" type="submit">อัปเดตข้อมูล</button> -->
        <button class="back-button" @click="navigateTo('/users')">กลับไปยังรายการผู้ใช้</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {}
    };
  },
  async created() {
    try {
      const userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async updateUser() {
      try {
        await UsersService.update(this.user);
        alert("ข้อมูลถูกอัปเดตเรียบร้อยแล้ว");
        this.navigateTo('/users'); // กลับไปที่รายการผู้ใช้
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.user-container {
  max-width: 600px; /* กำหนดความกว้างสูงสุด */
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

.user-details {
  font-size: 16px; /* ขนาดฟอนต์ */
  color: #555; /* สีข้อความ */
  margin-bottom: 20px; /* ระยะห่างด้านล่าง */
}

.form-group {
  margin-bottom: 15px; /* ระยะห่างระหว่างฟอร์ม */
}

.form-input {
  width: 95%; /* ให้ input กว้างเต็มที่ */
  padding: 10px; /* Padding */
  border: 1px solid #bdc3c7; /* เส้นขอบ */
  border-radius: 5px; /* มุมมน */
  background-color: #ecf0f1; /* สีพื้นหลังของ input */
  color: #34495e; /* สีข้อความใน input */
}

.update-button {
  padding: 10px 15px; /* Padding */
  background-color: #1abc9c; /* สีเขียวสำหรับปุ่ม */
  color: white; /* สีข้อความ */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 5px; /* มุมมน */
  cursor: pointer; /* แสดงมือเมื่อ hover */
  transition: background-color 0.3s; /* Transition */
}

.update-button:hover {
  background-color: #16a085; /* เปลี่ยนสีเมื่อ hover */
}

.back-button {
  padding: 10px 15px; /* Padding */
  background-color: #007bff; /* สีน้ำเงินสำหรับปุ่ม */
  color: white; /* สีข้อความ */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 5px; /* มุมมน */
  cursor: pointer; /* แสดงมือเมื่อ hover */
  transition: background-color 0.3s; /* Transition */
}

.back-button:hover {
  background-color: #0056b3; /* เปลี่ยนสีเมื่อ hover */
}
</style>
