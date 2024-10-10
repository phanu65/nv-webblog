<template>
  <div class="nv-navbar">
    <ul class="nav">
      <li><router-link :to="{ name: 'medicines' }">🩺 Medicines</router-link></li>
      <li><router-link :to="{ name: 'users' }">👥 Users</router-link></li>
      <li v-if="isLogin()">
        <a @click="logout">🚪 Logout</a>
      </li>
      <li v-else>
        <router-link :to="{ name: 'login' }">🔑 Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.nv-navbar {
  background-color: #2c3e50; /* สีพื้นหลังเข้มเพื่อความสง่า */
  width: 97%;
  padding: 15px 40px; /* พื้นที่รอบด้าน */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* เงาเพื่อความสวยงาม */
  display: flex;
  justify-content: space-around; /* จัดวางองค์ประกอบให้มีระยะห่างเท่ากัน */
  align-items: center; /* จัดให้อยู่กึ่งกลาง */
}

.nv-navbar .nav {
  list-style: none;
  display: flex;
  align-items: center; /* จัดให้องค์ประกอบภายในอยู่กึ่งกลาง */
}

.nv-navbar .nav li {
  margin: 0 20px; /* ระยะห่างระหว่างองค์ประกอบ */
}

.nv-navbar .nav li a {
  text-decoration: none;
  color: #ecf0f1; /* สีข้อความขาวโพลน */
  font-weight: 500; /* น้ำหนักของฟอนต์ */
  border-radius: 5px; /* มุมมน */
  padding: 10px 15px; /* พื้นที่รอบด้าน */
  transition: all 0.3s ease; /* การเปลี่ยนแปลงที่นุ่มนวล */
}

.nv-navbar .nav li a:hover, .nv-navbar .nav li a.router-link-active {
  background-color: #2980b9; /* สีพื้นหลังเมื่อ hover หรือ active */
  color: #ffffff; /* สีข้อความเมื่อ hover หรือ active */
}

.clearfix {
  clear: both;
}
</style>
