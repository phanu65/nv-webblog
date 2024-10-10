<template>
  <div class="users-container">
    <h1>รายการผู้ใช้</h1>
    <div class="action-buttons">
      <button class="create-button" v-on:click="navigateTo('/user/create')">สร้างผู้ใช้</button>
      <button class="logout-button" v-on:click="logout">Logout</button>
    </div>
    <hr />
    <div v-if="users.length">
      <div class="user-count"><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div><b>ID:</b> {{ user.id }}</div>
        <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>อีเมล:</b> {{ user.email }}</div>
        <div><b>สถานะ:</b> {{ user.status }}</div>
        <div><b>ประเภท:</b> {{ user.type }}</div>
        <div class="button-group">
          <button class="view-button" v-on:click="navigateTo('/user/' + user.id)">ดูข้อมูล</button>
          <button class="edit-button" v-on:click="navigateTo('/user/edit/' + user.id)">แก้ไขข้อมูล</button>
          <button class="delete-button" v-on:click="deleteUser(user)">ลบข้อมูล</button>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'login'
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.users-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
}

.action-buttons {
  display: flex;
  justify-content: space-between; /* จัดปุ่มให้อยู่ซ้ายและขวา */
  margin-bottom: 15px;
}

.create-button, .logout-button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-button {
  background-color: #28a745; /* สีเขียวสำหรับปุ่มสร้าง */
}

.create-button:hover {
  background-color: #218838; /* เปลี่ยนสีเมื่อ hover */
}

.logout-button {
  background-color: #e74c3c; /* สีแดงสำหรับ logout */
}

.logout-button:hover {
  background-color: #c0392b; /* เปลี่ยนสีเมื่อ hover */
}

.user-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: scale(1.02);
}

.button-group {
  margin-top: 10px;
}

.view-button, .edit-button, .delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 5px;
  color: white;
}

.view-button {
  background-color: #007bff;
}

.view-button:hover {
  background-color: #0056b3;
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

.user-count {
  font-size: 18px;
  color: #34495e;
  margin-bottom: 20px;
}
</style>
