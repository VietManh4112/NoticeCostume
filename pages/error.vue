<template>
    <v-app dark>
        <div>
            <h1>{{ pageNotFound }}</h1>
            <p>Bạn không có quyền truy cập vào trang!!!</p>
        </div>
      <NuxtLink to="/"> Home page </NuxtLink>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pageNotFound: '403 Forbidden',
        otherError: 'An error occurred',
      }
    },
  }
  </script>
  
  <style scoped>
  h1 {
    font-size: 20px;
  }
  </style>
  