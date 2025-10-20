<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="container d-flex align-items-center">
        <a class="navbar-brand d-flex" href="/">
          <img src="../../public/logo.png" class="brand-logo" alt="Logo" />
          <h3 class="brand-name ps-2 mb-0">Villiana</h3>
        </a>
        <div class="d-flex">
          <button class="btn" type="button">
            <router-link to="/me" class="nav-link">About Me</router-link>
          </button>
          <div class="has-acc">
            <button class="btn" type="button">
              <router-link to="/login" class="nav-link logout-btn text-primary">Nika</router-link>
            </button>

          </div>
          <div class="no-acc">
            <button class="btn" type="button">
              <router-link to="/register" class="nav-link login-btn">Register</router-link>
            </button>
            <button class="btn" type="button">
              <router-link to="/login" class="nav-link login-btn">Login</router-link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.brand-logo {
  width: 25px;
  height: 25px;
}
.brand-name {
  font-family: "Monas";
  color: #fad2e1;
}
.navbar .nav-link {
  text-decoration: none;
  color: #fad2e1;
  transition: all 0.2s ease-in-out;

}
.nav-link:hover {
  color: #fda0c2;

}
.login-btn {
  color: #a4bbfa !important;
  font-weight: 400;
}
.login-btn:hover {
  color: #6f95fd !important;
}
</style>
