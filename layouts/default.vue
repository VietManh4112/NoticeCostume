<template>
  <v-main>
    <v-container>
      <v-app-bar app color="primary" light>
        <v-toolbar-title class="toolbar__title">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="toolbar__items">
          <v-btn to="/">Home</v-btn>
          <v-btn to="/project">Project</v-btn>
          <v-btn to="/artist">Artist</v-btn>
          <v-btn to="/repository">Repository</v-btn>
          <v-btn to="/about">About</v-btn>
        </v-toolbar-items>
        <div class="toolbar__languages">
          <v-switch v-model="isEnglish" class="toolbar__switch" @click="sendData()"></v-switch>
          <div v-if="isEnglish"><img src="https://assets.snapedit.app/images/flags/en.svg" class="toolbar__flag">English
          </div>
          <div v-else><img src="https://assets.snapedit.app/images/flags/vn.svg" class="toolbar__flag">Vietnamese</div>
        </div>
        <Button v-if="!hide" type="login" @click="login">{{ loginBtn }}</Button>
        <Button v-if="!hide" type="register" @click="register">{{ registerBtn }}</Button>
        <img v-if="hide" class="user__avatar" :src="url">
        <div v-if="hide" class="user__name">
          <p>{{ sub }}</p>
        </div>
        <button v-if="hide" @click="logout" style="display: flex;justify-content: center;align-items: center;" title="Thoát">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="icon-md">
            <path d="M11 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H11" stroke="currentColor"
              stroke-width="2" stroke-linecap="round"></path>
            <path d="M20 12H11M20 12L16 16M20 12L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
        </button>
      </v-app-bar>
      <Nuxt />
    </v-container>
  </v-main>
</template>

<script>
import Resource from '@/helper/resource.js'
import Button from '@/components/Button.vue'
import { mapState, mapMutations } from 'vuex';
import register from '~/pages/register.vue';
export default {
  name: 'DefaultLayout',

  components: {
    Button,
  },

  computed: {
    title() {
      if (this.isEnglish) {
        return Resource.Title.en;
      } else {
        return Resource.Title.vi;
      }
    },

    loginBtn() {
      if (this.isEnglish) {
        return Resource.loginBtn.en;
      } else {
        return Resource.loginBtn.vi;
      }
    },

    registerBtn() {
      if (this.isEnglish) {
        return Resource.registerBtn.en;
      } else {
        return Resource.registerBtn.vi;
      }
    },

    ...mapState(['isEnglish']),

    isEnglish: {
      get() {
        return this.$store.state.isEnglish;
      },
      set(value) {
        this.$store.commit('setIsEnglish', value);
      }
    },
  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      hide: false,
      sub: '',
      url: '',
    }
  },

  mounted() {
    const jwt = require('jsonwebtoken');
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    if (decoded) {
      this.sub = decoded.sub;
      this.url = decoded.url;
    }
    if (token && token.trim() !== "") {
      this.hide = true;
    }
  },

  beforeUpdate() {
    this.sendData();
  },

  methods: {
    ...mapMutations(['setIsEnglish']),
    sendData() {
      this.setIsEnglish(this.isEnglish);
    },

    login() {
      this.$router.push(`/login`);
    },

    register() {
      this.$router.push(`/register`);
    },

    logout() {
      localStorage.setItem("token", "");
      window.location.reload();
    }
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');

.container {
  margin: 0;
  padding: 0;
  font-family: 'Maitree', sans-serif;
}


.toolbar__title {
  width: 20vw;
  display: flex;
  justify-content: flex-start;
  margin-left: 5vw;
}

.toolbar__items {
  width: 40vw;
  display: flex;
  justify-content: flex-start;
}

.toolbar__languages {
  width: 15vw;
  display: flex;
  align-items: center;
}

.v-input__control {
  margin-top: 3vh;
}

.toolbar__flag {
  width: 30px;
  height: 20px;
  padding-top: 0.3vw;
  margin-left: 0.3vw;
  margin-right: 0.3vw;
}

.user__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.user__name {
  margin: 0 10px;
}
</style>
