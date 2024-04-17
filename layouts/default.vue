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
          <div v-if="isEnglish"><img src="https://assets.snapedit.app/images/flags/en.svg" class="toolbar__flag">English</div>
          <div v-else><img src="https://assets.snapedit.app/images/flags/vn.svg" class="toolbar__flag">Vietnamese</div>
        </div>
        <Button v-if="!isLogin" type="login" @click="login">{{ loginBtn }}</Button>
        <Button v-if="!isLogin" type="register" @click="register">{{ registerBtn }}</Button>
        <img v-if="isLogin" class="user__avatar" src="https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbDrspelpWewsXWvkQz_kkbEb2_Atp5O6Hxgijr1wk25-SQa7K54p1pqos5DP5cav6rw1DJWisOp85InFU2oRMFMOCB5O45Yxs=w1910-h885-v0">
      </v-app-bar>
      <Nuxt/>
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

    isLogin() {
      return this.$store.state.isLogin;
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

    }
  },

  beforeUpdate() {
    this.sendData();
    this.getData();
  },

  methods: {
    ...mapMutations(['setIsEnglish']),
    sendData() {
      this.setIsEnglish(!this.isEnglish);
    },

    getData() {
      const tokenlocal = localStorage.getItem('token');
      console.log('default:    ' + tokenlocal);
    },

    login() {
      this.$router.push(`/login`);
    },

    register() {
      this.$router.push(`/register`);
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
</style>
