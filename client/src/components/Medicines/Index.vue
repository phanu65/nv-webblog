<template>
  <div class="medicines-container">
    <h2>รายการยา</h2>
    <div class="header-buttons">
      <button class="create-button" v-on:click="navigateTo('/medicine/create')">สร้าง Medicine</button>
      <button class="logout-button" v-on:click="logout">Logout</button>
    </div>
    <h4>จำนวน Medicine: {{ medicines.length }}</h4>

    <div v-if="medicines.length === 0">
      <p>ไม่พบรายการยา</p>
    </div>

    <div v-for="medicine in medicines" :key="medicine.id" class="medicine-card">
      <p><strong>ID:</strong> {{ medicine.id }}</p>
      <p><strong>ชื่อยา:</strong> {{ medicine.name }}</p>
      <p><strong>สรรพคุณ:</strong> {{ medicine.description }}</p>
      <p><strong>ประเภท:</strong> {{ medicine.type }}</p>
      <p><strong>วันหมดอายุ:</strong>{{ medicine.expirationDate }}</p>

      <!-- การแสดงผลรูปภาพ -->
      <div v-if="medicine.thumbnail">
  <p><strong>รูปภาพ:</strong></p>
  <img :src="BASE_URL + medicine.thumbnail" alt="Medicine Image" class="medicine-image" />
</div>

      <div class="button-group">
        <button class="view-button" v-on:click="navigateTo('/medicine/' + medicine.id)">ดู Medicine</button>
        <button class="edit-button" v-on:click="navigateTo('/medicine/edit/' + medicine.id)">แก้ไข Medicine</button>
        <button class="delete-button" v-on:click="deleteMedicine(medicine.id)">ลบข้อมูล</button>
      </div>
    </div>
  </div>
</template>

<script>
import MedicinesService from '@/services/MedicinesService';

export default {
  data() {
    return {
      medicines: []
    };
  },
  async created() {
    await this.fetchMedicines();
  },
  methods: {
    logout() {
      let result = confirm("คุณต้องการออกจากระบบใช่หรือไม่?");
      if (result) {
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setMedicine', null);
        this.$router.push({ name: 'login' });
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteMedicine(medicine) {
      let result = confirm("ต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await MedicinesService.delete(medicine.id); // ใช้เฉพาะ id ในการลบ
          await this.fetchMedicines(); // รีเฟรชข้อมูลใหม่หลังจากลบข้อมูล
        } catch (err) {
          console.error(err);
          alert('ไม่สามารถลบข้อมูลได้');
        }
      }
    },
    async fetchMedicines() {
      try {
        const response = await MedicinesService.index();
        this.medicines = response.data;
      } catch (error) {
        console.error("Error fetching medicines:", error);
        alert('มีปัญหาในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง');
      }
    }
  }
}
</script>

<style scoped>
.medicines-container {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #34495e;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 20px;
}

.header-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.create-button, .logout-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.create-button {
  background-color: #007bff;
}

.create-button:hover {
  background-color: #0056b3;
}

.logout-button {
  background-color: #e74c3c;
}

.logout-button:hover {
  background-color: #c0392b;
}

.medicine-card {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.medicine-card p {
  margin: 5px 0;
}

.button-group {
  margin-top: 10px;
}

.view-button, .edit-button, .delete-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  color: white;
  transition: background-color 0.3s ease;
}

.view-button {
  background-color: #28a745;
}

.view-button:hover {
  background-color: #218838;
}

.edit-button {
  background-color: #f39c12;
}

.edit-button:hover {
  background-color: #e67e22;
}

.delete-button {
  background-color: #e74c3c;
}

.delete-button:hover {
  background-color: #c0392b;
}

/* เพิ่มสไตล์สำหรับรูปภาพ */
.medicine-image {
  width: 100px;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
