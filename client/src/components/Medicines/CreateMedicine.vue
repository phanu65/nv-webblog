<template>
  <div class="create-medicine-container">
    <h1>สร้างยา</h1>
    <form @submit.prevent="createMedicine" class="medicine-form">
      <!-- Field for Medicine Name -->
      <div class="form-group">
        <label for="title">ชื่อยา:</label>
        <input type="text" id="title" v-model="medicine.name" required class="form-input" />
      </div>

      <!-- Field for Medicine Type -->
      <div class="form-group">
        <label for="type">ประเภท:</label>
        <select id="type" v-model="medicine.type" required class="form-input select-input">
          <option value="" disabled selected>เลือกประเภท</option>
          <option value="ยาอันตราย">ยาอันตราย</option>
          <option value="ยาควบคุมพิเศษ">ยาควบคุมพิเศษ</option>
          <option value="ยาสามัญประจำบ้าน">ยาสามัญประจำบ้าน</option>
        </select>
      </div>

      <!-- Field for Description -->
      <div class="form-group">
        <label for="description">สรรพคุณ:</label>
        <textarea id="description" v-model="medicine.description" required class="form-input description-input"></textarea>
      </div>

      <!-- Field for Expiration Date -->
      <div class="form-group">
        <label for="expirationDate">วันหมดอายุ:</label>
        <input
          type="date"
          id="expirationDate"
          v-model="medicine.expirationDate"
          @blur="validateExpirationDate"
          required
          class="form-input"
        />
        <div v-if="expirationDateError" class="error-message">{{ expirationDateError }}</div>
      </div>

      <!-- File Upload Field -->
      <div class="dropbox">
        <input
          type="file"
          multiple
          :name="uploadFieldName"
          @change="filesChange($event.target.files)"
          accept="image/*"
          class="input-file"
        />
        <p>ลากไฟล์ของคุณมาที่นี่เพื่อเริ่มต้น<br />หรือคลิกเพื่อเรียกดู</p>
      </div>

      <!-- Display Uploaded Images -->
      <div>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" :key="picture.id" class="picture-item">
            <img :src="BASE_URL + picture.name" alt="picture image" />
            <br />
            <button class="thumbnail-button" @click.prevent="useThumbnail(picture.name)">Thumbnail</button>
            <button class="delete-button" @click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
      </div>

      <!-- Submit Button -->
      <div class="form-group">
        <button type="submit" class="submit-button" :disabled="expirationDateError">สร้าง Medicine</button>
      </div>
    </form>
  </div>
</template>

<script>
import MedicinesService from "@/services/MedicinesService";
import UploadService from "../../services/UploadService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      uploadFieldName: "userPhoto",
      pictures: [],
      expirationDateError: null,
      medicine: {
        name: "",
        type: "",
        description: "",
        expirationDate: "",
        thumbnail: "null",
        pictures: "null",
      },
    };
  },
  methods: {
    // Validate expiration date
    validateExpirationDate() {
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      if (this.medicine.expirationDate < today) {
        this.expirationDateError = "วันหมดอายุต้องอยู่ในอนาคต"; // Error message
      } else {
        this.expirationDateError = null; // No error
      }
    },

    // Handle file deletion
    async delFile(picture) {
      if (confirm("ต้องการลบใช่หรือไม่?")) {
        try {
          await UploadService.delete({ filename: picture.name });
          this.pictures = this.pictures.filter(p => p.id !== picture.id);
        } catch (err) {
          console.error(err);
        }
      }
    },

    // Create new medicine entry
    async createMedicine() {
      this.medicine.pictures = JSON.stringify(this.pictures);
      try {
        await MedicinesService.post(this.medicine); // Send data to server
        this.$router.push({ name: "medicines" }); // Redirect after success
      } catch (err) {
        console.error(err);
      }
    },

    // Handle file changes
    async filesChange(fileList) {
      const formData = new FormData();
      Array.from(fileList).forEach(file => {
        formData.append(this.uploadFieldName, file, file.name);
      });
      await this.save(formData); // Call save method
    },

    // Save uploaded files
    async save(formData) {
      try {
        await UploadService.upload(formData);
        this.pictures.push(...Array.from(formData.getAll(this.uploadFieldName)).map((name, index) => ({
          id: index, // Use index as a temporary ID (consider a more robust ID strategy in production)
          name
        })));
      } catch (error) {
        console.error(error);
      }
    },

    // Set selected thumbnail
    useThumbnail(filename) {
      this.medicine.thumbnail = filename;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.create-medicine-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #34495e;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 20px;
}

.medicine-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: 95%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  background-color: #ecf0f1;
  color: #34495e;
  font-size: 16px;
}

.description-input {
  min-height: 120px;
}

.dropbox {
  outline: 2px dashed #bdc3c7;
  background-color: #f9f9f9;
  color: #34495e;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 15px;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 100px;
  position: absolute;
}

.pictures {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
}

.picture-item img {
  width: 100px;
  border-radius: 5px;
}

.thumbnail-button,
.delete-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0;
  cursor: pointer;
}

.thumbnail-button:hover,
.delete-button:hover {
  background-color: #2980b9;
}

.submit-button {
  padding: 12px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background-color: #16a085;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
