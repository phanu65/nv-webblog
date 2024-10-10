<template>
  <div class="edit-medicine-container">
    <h1>แก้ไขยา</h1>
    <form v-on:submit.prevent="editMedicine" class="medicine-form">
      <div class="form-group">
        <label for="title">ชื่อยา:</label>
        <input type="text" id="title" v-model="medicine.title" required class="form-input" />
      </div>
      <transition name="fade">
        <div class="thumbnail-pic" v-if="medicine.thumbnail !== 'null'">
          <img :src="BASE_URL + medicine.thumbnail" alt="thumbnail" />
        </div>
      </transition>
      <div enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files)" accept="image/*" class="input-file" />
          <p v-if="isInitial">ลากไฟล์ของคุณมาที่นี่เพื่อเริ่ม<br />หรือคลิกเพื่อเรียกดู</p>
          <p v-if="isSaving">กำลังอัปโหลด {{ fileCount }} ไฟล์...</p>
          <p v-if="isSuccess">อัปโหลดสำเร็จ.</p>
        </div>
      </div>
      <transition-group tag="ul" class="pictures">
        <li v-for="picture in pictures" :key="picture.id">
          <img :src="BASE_URL + picture.name" alt="picture image" />
          <br />
          <button v-on:click.prevent="useThumbnail(picture.name)">ใช้เป็นภาพย่อ</button>
          <button v-on:click.prevent="delFile(picture)">ลบ</button>
        </li>
      </transition-group>
      <div class="clearfix"></div>
      <p><strong>รายละเอียด:</strong></p>
      <vue-ckeditor v-model.lazy="medicine.content" :config="config" @blur="onBlur" @focus="onFocus" />
      <div class="form-group">
        <label for="category">ประเภท:</label>
        <input type="text" id="category" v-model="medicine.category" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="status">สถานะ:</label>
        <input type="text" id="status" v-model="medicine.status" required class="form-input" />
      </div>
      <div class="button-group">
        <button type="submit" class="submit-button">อัปเดตยา</button>
        <button v-on:click="navigateTo('/medicines')" class="back-button">กลับ</button>
      </div>
    </form>
  </div>
</template>

<script>
import MedicinesService from "@/services/MedicinesService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
  components: { VueCkeditor },
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      currentStatus: STATUS_INITIAL,
      uploadFieldName: "userPhoto",
      pictures: [],
      medicine: {
        title: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        category: "",
        status: "",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
      },
    };
  },
  methods: {
    async delFile(material) {
      if (confirm("ต้องการลบใช่หรือไม่?")) {
        try {
          await UploadService.delete({ filename: material.name });
          this.pictures = this.pictures.filter(p => p.id !== material.id);
        } catch (err) {
          console.error(err);
        }
      }
    },
    async editMedicine() {
      try {
        await MedicinesService.put(this.medicine);
        this.$router.push({ name: "medicines" });
      } catch (err) {
        console.error(err);
      }
    },
    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async filesChange(fieldName, fileList) {
      const formData = new FormData();
      Array.from(fileList).forEach(file => {
        formData.append(fieldName, file, file.name);
      });
      await this.save(formData);
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;
      } catch (error) {
        console.error(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    useThumbnail(filename) {
      this.medicine.thumbnail = filename;
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  async created() {
    try {
      let medicineId = this.$route.params.medicineId;
      this.medicine = (await MedicinesService.show(medicineId)).data;

      if (this.medicine.pictures) {
        this.pictures = JSON.parse(this.medicine.pictures); // แปลงข้อมูลเป็น JSON ถ้ามีข้อมูล
        this.pictureIndex = this.pictures.length; // ปรับค่า index ของภาพ
      } else {
        console.error("Pictures data is undefined or null."); // แจ้งข้อผิดพลาด
        this.pictures = []; // ตั้งค่าภาพเป็น array ว่าง
      }
    } catch (error) {
      console.error("Error fetching medicine:", error); // แจ้งข้อผิดพลาดเมื่อไม่สามารถดึงข้อมูลได้
    }
  }
};
</script>

<style scoped>
.edit-medicine-container {
  max-width: 600px;
  /* กำหนดความกว้างสูงสุด */
  margin: 50px auto;
  /* จัดกลาง */
  padding: 20px;
  /* Padding รอบฟอร์ม */
  background-color: #ffffff;
  /* สีพื้นหลัง */
  border-radius: 10px;
  /* มุมมน */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  /* เงา */
}

h1 {
  text-align: center;
  /* จัดกลางข้อความ */
  color: #34495e;
  /* สีข้อความ */
  font-family: 'Montserrat', sans-serif;
  /* ฟอนต์ */
}

.form-group {
  margin-bottom: 15px;
  /* ระยะห่างระหว่างฟอร์ม */
}

label {
  display: block;
  /* ให้ label เป็น block */
  margin-bottom: 5px;
  /* ระยะห่างด้านล่าง */
  color: #333;
  /* สีข้อความ */
}

.form-input {
  width: 100%;
  /* ให้ input กว้างเต็มที่ */
  padding: 10px;
  /* Padding */
  border: 1px solid #bdc3c7;
  /* เส้นขอบ */
  border-radius: 5px;
  /* มุมมน */
  background-color: #ecf0f1;
  /* สีพื้นหลังของ input */
  color: #34495e;
  /* สีข้อความใน input */
}

.form-input:focus {
  border-color: #1abc9c;
  /* เปลี่ยนสีขอบเมื่อ focus */
  outline: none;
  /* ปิดเส้นขอบเมื่อ focus */
}

.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
  margin-bottom: 15px;
  /* ระยะห่างด้านล่าง */
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.thumbnail-pic img {
  width: 200px;
  /* ขนาดของ thumbnail */
}

.submit-button {
  padding: 10px 15px;
  /* Padding */
  background-color: #007bff;
  /* สีน้ำเงินสำหรับปุ่ม */
  color: white;
  /* สีข้อความ */
  border: none;
  /* ไม่มีเส้นขอบ */
  border-radius: 5px;
  /* มุมมน */
  cursor: pointer;
  /* แสดงมือเมื่อ hover */
  transition: background-color 0.3s;
  /* Transition */
}

.submit-button:hover {
  background-color: #0056b3;
  /* เปลี่ยนสีเมื่อ hover */
}

.back-button {
  padding: 10px 15px;
  /* Padding */
  background-color: #dc3545;
  /* สีแดงสำหรับปุ่มกลับ */
  color: white;
  /* สีข้อความ */
  border: none;
  /* ไม่มีเส้นขอบ */
  border-radius: 5px;
  /* มุมมน */
  cursor: pointer;
  /* แสดงมือเมื่อ hover */
  transition: background-color 0.3s;
  /* Transition */
  margin-left: 10px;
  /* ระยะห่างด้านซ้าย */
}

.back-button:hover {
  background-color: #c82333;
  /* เปลี่ยนสีเมื่อ hover */
}
</style>
