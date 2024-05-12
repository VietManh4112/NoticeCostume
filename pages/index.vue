<template>
  <div>
    <div class="home-header">
      <img class="img-bg" :src="currentImage">
    </div>
    <div class="home-main">
      <div class="main-title">
        <h2>{{ maintitle }}</h2>
      </div>

      <div class="main-text">
        <p>{{ maintext }}</p>
      </div>

      <div style="position: relative;">
        <div class="main-search">
          <TextField type="textfield" :value="searchKeyword" @input="searchKeyword = $event"></TextField>
        </div>
        <div class="search-items">
          <div v-for="(item, index) in filteredItems" :key="index" :style="{ top: (50 + index * 70) + 'px' }">
            <nuxt-link :to="'/ethnic/' + item.role.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()" class="item__roles" :style="{ 'justify-content': isFoundEthnic ? 'initial' : 'center' }">
              <div v-if="isFoundEthnic" style="width: 120px;">
                <img :src="item.imageUrl" style="width: 60px; height: 55px">
              </div>
              <p>{{ item.role }}</p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="avatar-container">
        <div v-for="(item, index) in itemsToShow" :key="index" class="avatar-wrapper">
          <Avatar :imageUrl="item.imageUrl" :role="item.role"></Avatar>
        </div>
      </div>
      <Button @click="showMore" :hidden="this.currentIndexItem + this.itemsPerPage === 60" type="icon">
        <div v-if="isEnglish">See more</div>
        <div v-else>Xem thêm</div>
      </Button>
      <div class="home-footer">

      </div>
      <button @click="scrollToTop" v-if="showScroll" class="button--scroll">
        <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
          <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="scale(1.5)"></path>
        </svg>
      </button>
    </div>


  </div>
</template>
<script>
import axiosInstance, { setBearerToken } from '@/helper/api.js'
import Resource from '@/helper/resource.js'
import Avatar from '@/components/Avatar.vue';
import Button from '@/components/Button.vue';
import TextField from '@/components/TextField.vue';
import EthnicStore from "@/store/ethnic";
import bg1 from '@/assets/img/bgcostume1.png';
import bg2 from '@/assets/img/bgcostume2.png';
import bg3 from '@/assets/img/bgcostume3.png';
import bg4 from '@/assets/img/bgcostume4.png';
  export default {
    components: {
      Avatar,
      Button,
      TextField,
    },

    data() {
      return {
        images: [bg1,bg2,bg3,bg4],
        currentIndex: 0,
        intervalId: null,
        showAvatar: false,
        ethnic : {
          imageUrl: '',
          role: '',
          index: ''
        },
        items : [],
        itemsPerPage: 10,
        currentIndexItem: 0,
        searchKeyword: '',
        isFoundEthnic: true,
        showScroll: false,
      }
    },

    computed: {
      // Hiển thị ảnh nền
      currentImage() {
        return this.images[this.currentIndex];
      },

      // Hiển thị ảnh avatar
      itemsToShow() {
        return this.items.slice(0, this.currentIndexItem + this.itemsPerPage);
      },
      
      maintitle() {
        if (this.isEnglish) {
          return Resource.mainTitle.en;
        } else {
          return Resource.mainTitle.vi;
        }
      },

      maintext() {
        if (this.isEnglish) {
          return Resource.mainText.en;
        } else {
          return Resource.mainText.vi;
        }
      },

      isEnglish() {
        return this.$store.state.isEnglish;
      },

      filteredItems() {
        const keyword = this.searchKeyword.toLowerCase().trim();
        if (!keyword) return [];

        const filteredAndReversed = this.items.filter(item => {
          return item.role.toLowerCase().includes(keyword.toLowerCase());
        }).reverse();

        const foundEthnics = filteredAndReversed.slice(0, 6);
        if (foundEthnics == 0) {
          if (!this.isEnglish) {
            this.isFoundEthnic = false;
            return [{role:"Không tìm thấy dân tộc"}];
          } else {
            this.isFoundEthnic = false;
            return [{role:"No ethnicity found"}];
          }
        } else {
          this.isFoundEthnic = true;
          return foundEthnics;
        }
      },
    },

    mounted() {
      window.addEventListener("scroll", this.handleScroll);

      EthnicStore.get('/api/get-ethnics')
      .then(response => {
          response.data.forEach(item => {
            const newItem = {...this.ethnic}
            newItem.index = item.id
            newItem.imageUrl = item.imageUrl
            newItem.role = item.name
            this.items.push(newItem)
          })
        }
      ).catch(error => {
        console.error(error);
      });
      // Bắt đầu tự động lướt qua sau mỗi 5 giây
      this.intervalId = setInterval(this.nextImage, 5000);
    },

    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);

      // Xóa interval khi component bị hủy
      clearInterval(this.intervalId);
    },

    methods: {
      nextImage() {
        // Tăng chỉ số hình ảnh
        this.currentIndex++;
        // Nếu đến hình ảnh cuối cùng, quay lại hình ảnh đầu tiên
        if (this.currentIndex === this.images.length) {
          this.currentIndex = 0;
        }
      },

      // Tăng số lượng hiển thị ảnh avatar
      showMore() {
        this.currentIndexItem += this.itemsPerPage;
      },

      moreEthnic() {
        this.index += this.numberEthnic;
      },

      scrollToTop() {
        window.scrollTo({ top: 700, behavior: "smooth" });
      },

      handleScroll() {
        this.showScroll = window.scrollY > 900;
      }
    },
  }
</script>
<style>
.img-bg {
  width: 100vw;
  height: 100vh;
}

.home-header {
  height: 100vh;
}

.home-main {
  margin: 0;
  width: 100vw;
  text-align: center;
  background-image: radial-gradient(circle at 16.3021% 100%, rgba(229,112,34,70%) 0%, rgba(229,112,34,0%) 35%),
                    radial-gradient(circle at 75.4264% 74.1960%, #F6CCB0 0%, rgba(246,204,176,0%) 40%),
                    radial-gradient(circle at 14.1699% 17.4837%, #F6CCB0 0%, rgba(246,204,176,0%) 70%),
                    radial-gradient(circle at 79.4987% 0%, rgba(229,112,34,72%) 0%, rgba(229,112,34,0%) 70%),
                    radial-gradient(circle at 48.9014% 49.5215%, #FFF 0%, rgba(255,255,255,0%) 100%);
}

.home-footer {
  width: 100%;
  height: 100px;
}

.main-title {
  padding-top: 48px;
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
}

h2 {
  padding: 0;
  color: rgb(99, 99, 99);
  font-size: 40px;
}

.main-text {
  margin: 0px 0px 14px calc((100% - 750px) * 0.5);
  width: 50vw;
}


.main-text p {
  text-align: center;
  line-height: 1.5em;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  color: #636363;
}

.main-search {
  display: flex;
  justify-content: center;
}

.search-items {
  position: absolute;
  margin: 0px 0px 0px calc((100% - 380px) * 0.5);
  background-color: rgb(255, 228, 236);
  border-radius: 0px 0px 30px 30px;
  z-index: 9;
}

.item__roles {
  display: flex;
  align-items: center;
  width: 380px;
  height: 70px;
}

.item__roles:hover {
  cursor: pointer;
  background-color: rgba(128, 127, 127,10%);
}

a {
  text-decoration: none;
}

.item__roles p {
  color: rgba(99,99,99,100%);
}

.avatar-container svg {
  border: 1px solid white;
  border-radius: 50%;
  box-shadow: var(--shd,0 1px 3px rgba(0,0,0,50%));
}

:root {
    --shd: -0.12px 7.00px 10px 0px rgba(229,112,34,40%);
}

svg:hover {
  transform: scale(1.2);
  transition: transform 0.3s ease;
  cursor: pointer;
}

g {
  transform-origin: center center; /* Đặt trục xoay ở giữa */
  transition: transform 0.3s ease; /* Hiệu ứng chuyển đổi mềm mại */
}

.image-caption {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  opacity: 0;
  width: 120px;
  height: 30px;
  transition: opacity 0.3s ease;
  color: white;
  background-color: rgba(0, 0, 0, 40%);
}

svg:hover .image-caption {
  opacity: 1;
}

.avatar-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 62vw;
  margin: auto;
  margin-top: 50px;
}

.avatar-wrapper {
  width: 20%; /* Hiển thị 5 phần tử trên mỗi hàng */
  padding: 10px; /* Khoảng cách giữa các avatar */
  margin-bottom: 5vh;
  box-sizing: border-box; /* Đảm bảo tính toàn vẹn của phần tử */
}

.button--scroll {
  position: fixed;
  height: 30px;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
  border-radius: 50%;
  background-color: white;
}
</style>



