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

      <div style="margin-bottom: 10vh;">
        <input type="text" placeholder="Tìm kiếm">
      </div>

      <div class="avatar-container">
        <div v-for="(item, index) in itemsToShow" :key="index" class="avatar-wrapper">
          <Avatar :imageUrl="item.imageUrl" :role="item.role"></Avatar>
        </div>
      </div>
      <Button @click="showMore" :hidden="this.currentIndexItem + this.itemsPerPage === 60" type="icon">
        <div v-if="dynamicTitle">See more</div>
        <div v-else>Xem thêm</div>
      </Button>
      <div class="home-footer">

      </div>
    </div>

    
  </div>
</template>
<script>
import { eventBus } from '@/helper/index.js'
import Resource from '@/helper/resource.js'
import Avatar from '@/components/Avatar.vue';
import Button from '@/components/Button.vue';
import bg1 from '@/assets/img/bgcostume1.png';
import bg2 from '@/assets/img/bgcostume2.png';
import bg3 from '@/assets/img/bgcostume3.png';
import bg4 from '@/assets/img/bgcostume4.png';
import image1 from '@/assets/img/avatar01.png';
import image2 from '@/assets/img/avatar02.png';
import image3 from '@/assets/img/avatar03.png';
import image4 from '@/assets/img/avatar04.png';
import image5 from '@/assets/img/avatar05.png';
import image6 from '@/assets/img/avatar06.png';
import image7 from '@/assets/img/avatar07.png';
import image8 from '@/assets/img/avatar08.png';
import image9 from '@/assets/img/avatar09.png';
import image10 from '@/assets/img/avatar10.png';
import image11 from '@/assets/img/avatar11.png';
import image12 from '@/assets/img/avatar12.png';
import image13 from '@/assets/img/avatar13.png';
import image14 from '@/assets/img/avatar14.png';
import image15 from '@/assets/img/avatar15.png';
import image16 from '@/assets/img/avatar16.png';
import image17 from '@/assets/img/avatar17.png';
import image18 from '@/assets/img/avatar18.png';
import image19 from '@/assets/img/avatar19.png';
import image20 from '@/assets/img/avatar20.png';
import image21 from '@/assets/img/avatar21.png';
import image22 from '@/assets/img/avatar22.png';
import image23 from '@/assets/img/avatar23.png';
import image24 from '@/assets/img/avatar24.png';
import image25 from '@/assets/img/avatar25.png';
import image26 from '@/assets/img/avatar26.png';
import image27 from '@/assets/img/avatar27.png';
import image28 from '@/assets/img/avatar28.png';
import image29 from '@/assets/img/avatar29.png';
import image30 from '@/assets/img/avatar30.png';
import image31 from '@/assets/img/avatar31.png';
import image32 from '@/assets/img/avatar32.png';
import image33 from '@/assets/img/avatar33.png';
import image34 from '@/assets/img/avatar34.png';
import image35 from '@/assets/img/avatar35.png';
import image36 from '@/assets/img/avatar36.png';
import image37 from '@/assets/img/avatar37.png';
import image38 from '@/assets/img/avatar38.png';
import image39 from '@/assets/img/avatar39.png';
import image40 from '@/assets/img/avatar40.png';
import image41 from '@/assets/img/avatar41.png';
import image42 from '@/assets/img/avatar42.png';
import image43 from '@/assets/img/avatar43.png';
import image44 from '@/assets/img/avatar44.png';
import image45 from '@/assets/img/avatar45.png';
import image46 from '@/assets/img/avatar46.png';
import image47 from '@/assets/img/avatar47.png';
import image48 from '@/assets/img/avatar48.png';
import image49 from '@/assets/img/avatar49.png';
import image50 from '@/assets/img/avatar50.png';
import image51 from '@/assets/img/avatar51.png';
import image52 from '@/assets/img/avatar52.png';
import image53 from '@/assets/img/avatar53.png';
import image54 from '@/assets/img/avatar54.png';
  export default {
    components: {
      Avatar,
      Button,
    },

    data() {
      return {
        images: [bg1,bg2,bg3,bg4],
        currentIndex: 0,
        intervalId: null,
        showAvatar: false,
        items: [
          { imageUrl: image1, role: 'Cống' },
          { imageUrl: image2, role: 'Hà Nhì' },
          { imageUrl: image3, role: 'Kháng' },
          { imageUrl: image4, role: 'Khơ Mú' },
          { imageUrl: image5, role: 'La Ha' },
          { imageUrl: image6, role: 'La Hủ' },
          { imageUrl: image7, role: 'Lào' },
          { imageUrl: image8, role: 'Lự' },
          { imageUrl: image9, role: 'Mảng' },
          { imageUrl: image10, role: 'Si La' },
          { imageUrl: image11, role: 'Xinh-mun' },
          { imageUrl: image12, role: 'Bố Y' },
          { imageUrl: image13, role: 'Dao' },
          { imageUrl: image14, role: 'Giáy' },
          { imageUrl: image15, role: 'Mông' },
          { imageUrl: image16, role: 'Phù Lá' },
          { imageUrl: image17, role: 'Thái' },
          { imageUrl: image18, role: 'Cờ Lao' },
          { imageUrl: image19, role: 'La Chí' },
          { imageUrl: image20, role: 'Lô Lô' },
          { imageUrl: image21, role: 'Ngái' },
          { imageUrl: image22, role: 'Nùng' },
          { imageUrl: image23, role: 'Tà Thẻn' },
          { imageUrl: image24, role: 'Pu Péo' },
          { imageUrl: image25, role: 'Sán Chay' },
          { imageUrl: image26, role: 'Sán Dìu' },
          { imageUrl: image27, role: 'Tày' },
          { imageUrl: image28, role: 'Mường' },
          { imageUrl: image29, role: 'Việt' },
          { imageUrl: image30, role: 'Bru- Vân Kiều' },
          { imageUrl: image31, role: 'Chứt' },
          { imageUrl: image32, role: 'Cơ-tu' },
          { imageUrl: image33, role: 'Ơ-đu' },
          { imageUrl: image34, role: 'Tà-ôi' },
          { imageUrl: image35, role: 'Thổ' },
          { imageUrl: image36, role: 'Co' },
          { imageUrl: image37, role: 'Ra Glai' },
          { imageUrl: image38, role: 'Brâu' },
          { imageUrl: image39, role: 'Chu-ru' },
          { imageUrl: image40, role: 'Cơ-ho' },
          { imageUrl: image41, role: 'Ê-đê' },
          { imageUrl: image42, role: 'Gia-rai' },
          { imageUrl: image43, role: 'Mạ' },
          { imageUrl: image44, role: 'Mnông' },
          { imageUrl: image45, role: 'Rơ-măm' },
          { imageUrl: image46, role: 'Xơ-đăng' },
          { imageUrl: image47, role: 'Ba-na' },
          { imageUrl: image48, role: 'Giẻ-triêng' },
          { imageUrl: image49, role: 'Hrê' },
          { imageUrl: image50, role: 'Chơ-ro' },
          { imageUrl: image51, role: 'X`Tiêng' },
          { imageUrl: image52, role: 'Khmer' },
          { imageUrl: image53, role: 'Hoa' },
          { imageUrl: image54, role: 'Chăm' }
        ],
        itemsPerPage: 10,
        currentIndexItem: 0,
        dynamicTitle: '',
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
        if (this.dynamicTitle) {
          return Resource.mainTitle.en; 
        } else {
          return Resource.mainTitle.vi;
        }
      },  

      maintext() {
        if (this.dynamicTitle) {
          return Resource.mainText.en; 
        } else {
          return Resource.mainText.vi;
        }
      }
    },

    mounted() {
      // Bắt đầu tự động lướt qua sau mỗi 5 giây
      this.intervalId = setInterval(this.nextImage, 5000);
      
      eventBus.$on('data-sent', (isEnglish) => {
        this.dynamicTitle = isEnglish;
      });
    },

    beforeDestroy() {
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
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');

.container {
  margin: 0;
  padding: 0;
  font-family: 'Maitree', sans-serif;
}

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
  font-family: maitree, serif;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  color: #636363;
}

svg {
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
}

.avatar-wrapper {
  width: 20%; /* Hiển thị 5 phần tử trên mỗi hàng */
  padding: 10px; /* Khoảng cách giữa các avatar */
  margin-bottom: 5vh;
  box-sizing: border-box; /* Đảm bảo tính toàn vẹn của phần tử */
}
</style>



