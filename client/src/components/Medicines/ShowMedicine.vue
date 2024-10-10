<template>
  <div class="medicine-container">
    <h1>Show Medicine</h1>
    <div class="medicine-details">
      <p><strong>ID:</strong> {{ medicine.id }}</p>
      <p><strong>ชื่อยา:</strong> {{ medicine.name }}</p>
      <p><strong>สรรพคุณ:</strong> {{ medicine.description }}</p>
      <p><strong>ประเภท:</strong> {{ medicine.type }}</p>
      <p><strong>วันหมดอายุ:</strong> {{ medicine.expirationDate }}</p>

      <!-- การแสดงผลรูปภาพ ถ้ามี thumbnail -->
      <div v-if="medicine.thumbnail">
        <p><strong>รูปภาพ:</strong></p>
        <img :src="medicine.thumbnail" alt="Medicine Image" class="medicine-image" />
      </div>
    </div>
    <div class="button-group">
      <button v-on:click="navigateTo('/medicine/edit/' + medicine.id)">แก้ไข Medicine</button>
      <button v-on:click="navigateTo('/medicines')">กลับ</button>
    </div>
  </div>
</template>

<script>
import MedicinesService from '@/services/MedicinesService';

export default {
  data() {
    return {
      medicine: null // เริ่มต้น medicine เป็น null
    };
  },
  async created() {
    await this.fetchMedicine(); // ดึงข้อมูล medicine เมื่อคอมโพเนนต์ถูกสร้าง
  },
  methods: {
    async fetchMedicine() {
      try {
        const medicineId = this.$route.params.medicineId; // ดึง medicineId จาก route params
        this.medicine = (await MedicinesService.show(medicineId)).data; // เรียกข้อมูล medicine จาก API
      } catch (error) {
        console.error("Error fetching medicine:", error); // แสดงข้อผิดพลาดในคอนโซล
      }
    },
    navigateTo(route) {
      this.$router.push(route); // เปลี่ยนเส้นทางไปยัง route ที่กำหนด
    }
  }
};
</script>

<style scoped>
.medicine-container {
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

.medicine-details {
  font-size: 16px; /* ขนาดฟอนต์ */
  color: #555; /* สีข้อความ */
  margin-bottom: 20px; /* ระยะห่างด้านล่าง */
}

strong {
  color: #007bff; /* สีสำหรับข้อความที่ใช้ <strong> */
}

.button-group {
  display: flex; /* ใช้ flexbox สำหรับการจัดรูปแบบปุ่ม */
  justify-content: center; /* จัดกลาง */
}

button {
  margin: 0 5px; /* ระยะห่างระหว่างปุ่ม */
  padding: 10px 15px; /* Padding */
  background-color: #007bff; /* สีพื้นหลังของปุ่ม */
  color: white; /* สีข้อความ */
  border: none; /* ไม่มีเส้นขอบ */
  border-radius: 5px; /* มุมมน */
  cursor: pointer; /* แสดงมือเมื่อ hover */
  transition: background-color 0.3s; /* Transition */
}

button:hover {
  background-color: #0056b3; /* เปลี่ยนสีเมื่อ hover */
}

/* เพิ่มสไตล์สำหรับรูปภาพ */
.medicine-image {
  width: 150px;  /* กำหนดความกว้างของรูปภาพ */
  height: auto;  /* ปรับอัตราส่วนตามความสูง */
  border-radius: 10px;  /* มุมมนสำหรับรูปภาพ */
  margin-top: 10px;  /* ระยะห่างด้านบน */
}
</style>
