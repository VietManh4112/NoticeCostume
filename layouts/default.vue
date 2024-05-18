<template>
  <v-main>
    <v-container>
      <v-app>
        <v-app-bar app color="white" light>
          <v-toolbar-title class="toolbar__title">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="toolbar__items">
            <v-btn to="/">Home</v-btn>
            <v-btn to="/project">Project</v-btn>
            <v-btn to="/repository">Repository</v-btn>
            <v-btn to="/about">About</v-btn>
        
          </v-toolbar-items>
          <div class="toolbar__languages">
            <v-switch v-model="isEnglish" class="toolbar__switch" @click="sendData()"></v-switch>
            <div v-if="isEnglish"><img src="https://assets.snapedit.app/images/flags/en.svg"
                class="toolbar__flag">English
            </div>
            <div v-else><img src="https://assets.snapedit.app/images/flags/vn.svg" class="toolbar__flag">Vietnamese
            </div>
          </div>
          <div @click="viewOrder">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="17" cy="19" r="2" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l14 1l-1.5 7h-11.5" />
                        </svg> 

          </div>
          <div @click="viewWareHouse">
            <svg class="linkButtonIcon_cff89e icon-house" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2.63 4.19A3 3 0 0 1 5.53 2H7a1 1 0 0 1 1 1v3.98a3.07 3.07 0 0 1-.3 1.35A2.97 2.97 0 0 1 4.98 10c-2 0-3.44-1.9-2.9-3.83l.55-1.98ZM10 2a1 1 0 0 0-1 1v4a3 3 0 0 0 3 3 3 3 0 0 0 3-2.97V3a1 1 0 0 0-1-1h-4ZM17 2a1 1 0 0 0-1 1v3.98a3.65 3.65 0 0 0 0 .05A2.95 2.95 0 0 0 19.02 10c2 0 3.44-1.9 2.9-3.83l-.55-1.98A3 3 0 0 0 18.47 2H17Z" class=""></path><path fill="currentColor" d="M21 11.42V19a3 3 0 0 1-3 3h-2.75a.25.25 0 0 1-.25-.25V16a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v5.75c0 .14-.11.25-.25.25H6a3 3 0 0 1-3-3v-7.58c0-.18.2-.3.37-.24a4.46 4.46 0 0 0 4.94-1.1c.1-.12.3-.12.4 0a4.49 4.49 0 0 0 6.58 0c.1-.12.3-.12.4 0a4.45 4.45 0 0 0 4.94 1.1c.17-.07.37.06.37.24Z" class=""></path></svg>
          </div>
          <Button v-if="!hide" type="login" @click="login">{{ loginBtn }}</Button>
          <Button v-if="!hide" type="register" @click="register">{{ registerBtn }}</Button>
          <img v-if="hide" class="user__avatar" :src="url">
          <div v-if="hide" class="user__name">
            <p>{{ sub }}</p>
          </div>
          <button v-if="hide" @click="logout" style="display: flex;justify-content: center;align-items: center;"
            title="Thoát">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"
              class="icon-md">
              <path d="M11 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H11" stroke="currentColor"
                stroke-width="2" stroke-linecap="round"></path>
              <path d="M20 12H11M20 12L16 16M20 12L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </button>
        </v-app-bar>
      </v-app>
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
    },
    viewOrder(){
      this.$router.push('/viewOrder');
    },
    viewWareHouse(){
      this.$router.push('/viewWareHouse');
    }
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');

.v-application--wrap {
  min-height: 0px;
}

.v-application p {
  margin-bottom: 0px;
}

.v-toolbar__content {
  font-family: 'Maitree', sans-serif;
}

.container {
  margin: 0;
  padding: 0;
  font-family: 'Maitree', sans-serif;
}


.toolbar__title {
  width: 22vw;
  display: flex;
  justify-content: center;
}

.toolbar__items {
  width: 35vw;
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
.icon-tabler-shopping-cart{
  margin-right: 20px;
  margin-top: 6px;
  font-size: 40px;
  cursor: pointer;
}
.icon-house{
 margin-top:6px ;
 margin-right: 20px;
 cursor: pointer;
}
</style>
