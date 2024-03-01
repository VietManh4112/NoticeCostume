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
      </v-app-bar>
      <Nuxt/>
    </v-container>
  </v-main>
</template>

<script>
import Resource from '@/helper/resource.js'
import { eventBus } from '@/helper/index.js'
export default {
  name: 'DefaultLayout',

  computed: {
    title() {
      if (this.isEnglish) {
        return Resource.Title.en; 
      } else {
        return Resource.Title.vi;
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
      isEnglish: false,
    }
  },

  updated() {
    this.sendData();
  },

  methods: {
    sendData() {
      eventBus.$emit('data-sent', this.isEnglish);
    }
  },

  
}
</script>

<style>
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
  width: 20vw;
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
</style>
