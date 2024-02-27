<template>
    <div>
        <div class="main">
            <div class="left-bar">
                <img :src="imgleft" class="img-costume img-left">
            </div>
            <div class="content">
                <div class="content-text">
                    <p><b>Tên tự gọi:</b> Tày</p>
                    <p><b>Tên khác:</b> Thổ</p>
                    <p><b>Nhóm địa phương:</b> Thổ, Ngạn, Phén, Thu Lao và Pa Dí</p>
                    <hr>
                    <p><b>Vùng cư trú:</b> Đông Bắc Bộ</p>
                    <p><b>Khu vực cư trú:</b> Vùng thung lũng các tỉnh Đông Bắc, từ Quảng Ninh, Bắc Giang đến Cao Bằng, Bắc Kạn, Lào Cai, Yên Bái</p>
                    <hr>
                    <div>
                        <p><b>Dân số (2019):</b> 2729</p>
                        <p><b>Dân số:</b> 0.003%</p>
                    </div>
                    <hr>
                    <p><b>Nhóm ngôn ngữ:</b> Tạng - Miến</p>
                    <p><b>Ngữ hệ:</b> Hán - Tạng</p>
                    <hr>
                    <p><b>Trang phục truyền thống:</b></p>
                    <p>Trang phục của phụ nữ Cống khá đơn giản gồm: áo, váy, dây thắt lưng, yếm, khăn đội đầu và một số đồ trang sức. Áo ngắn may bằng vải trắng hoặc màu chàm, tay áo được nối dài, mở ngực, cổ áo liền với nẹp ngực, áo không xẻ tà. Cổ áo là một dải vải đen kéo dài từ vạt áo bên phải chạy vòng qua cổ sang hết vạt áo bên trái. Dọc theo chiều dài của nẹp áo có đính đôi dây bằng sợi bông se lại hình vặn thừng để làm dây buộc.</p>
                    <p>Trang phục nam giới người Cống gồm có khăn, áo, quần may bằng vải, nhuộm chàm không trang trí.</p>
                </div>
                <div class="content-logo">
                    <div class="content-logo__btn">
                        <Button @click="gotoPreviousPage" :disabled="index === 0" type="nav">Previous</Button>
                    </div>
                    <div class="content-logo__img">
                        <img src="@/assets/img/logo.png" class="img-logo">
                    </div>
                    <div class="content-logo__btn">
                        <Button @click="gotoNextPage" :disabled="index === 54" type="nav">Next</Button>
                    </div>
                </div>
            </div>
            <div class="right-bar">
                <img :src="imgright" class="img-costume img-right">
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button.vue'
    export default {
        name: "CostumeInfomation",

        components: {
            Button,
        },

        props: {
            imgleft: String,
            imgright:String,
            index: Number,
        },

        mounted() {
            window.addEventListener('keydown', this.handleKeyDown);
        },

        methods: {
            /**
             * Author: NVManh(26/02/2024)
             * Chuyển hướng tới trang tiếp theo
             */
            gotoNextPage() {
                const nextPageIndex = this.index + 1;
                const nextPage = this.items[nextPageIndex];
                const nextPageEncoded = encodeURIComponent(nextPage);
                this.$router.push(`/ethnic/${nextPageEncoded}`);
            },

            /**
             * Author: NVManh(26/02/2024)
             * Chuyển hướng tới trang trước đó
             */
            gotoPreviousPage() {
                const previousPageIndex = this.index - 1;
                const previousPage = this.items[previousPageIndex];
                const previousPageEncoded = encodeURIComponent(previousPage);
                this.$router.push(`/ethnic/${previousPageEncoded}`);
            },

            /**
             * Author: NVManh(26/02/2024)
             * Điều hướng trang web bằng nút mũi tên
             */
            handleKeyDown() {
                if (event.key === 'ArrowLeft' && this.index > 0) {
                    this.gotoPreviousPage();
                } else if (event.key === 'ArrowRight' && this.index < 54) {
                    this.gotoNextPage();
                }
            }
        },

        data() {
            return {
                items: ['Cống','Hà Nhì','Kháng','Khơ Mú'],
            }
        }
    }
</script>

<style>

.container {
    margin: 0;
    padding: 0;
}

/**
* css cho main
*/
.main {
    display: flex;
    background-image: radial-gradient(circle at 16.3021% 100%, rgba(229,112,34,70%) 0%, rgba(229,112,34,0%) 35%),
                    radial-gradient(circle at 75.4264% 74.1960%, #F6CCB0 0%, rgba(246,204,176,0%) 40%),
                    radial-gradient(circle at 14.1699% 17.4837%, #F6CCB0 0%, rgba(246,204,176,0%) 70%),
                    radial-gradient(circle at 79.4987% 0%, rgba(229,112,34,72%) 0%, rgba(229,112,34,0%) 70%),
                    radial-gradient(circle at 48.9014% 49.5215%, #FFF 0%, rgba(255,255,255,0%) 100%);
    width: 100vw;
    height: 91vh;
}

/**
* css chung cho khung left-bar, right-bar
*/
.left-bar, .right-bar {
    width: 29vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-left {
    animation: moveImageLeft 1s ease-in-out forwards;
}

@keyframes moveImageLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

/**
* css cho khung content 
*/
.content {
    width: 40vw;
}

.img-costume {
    height: 85vh;
    width: 23vw;
}

.content-text {
    margin-top: 3vh;
    font-size: 12px;
}

.content-text p {
    margin: 1.2vh;
}

.content-logo {
    display: flex;
    width: 40vw;
    position: absolute;
    bottom: 3vh;
}

.content-logo__btn, .content-logo__img {
    width: 20%;
    height: auto; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-logo__img {
    flex: 1;
}

.img-logo {
    width: 5vw;
    height: 5vw;
}


/**
* css cho ảnh bên trái
*/
.img-right {
    animation: moveImageRight 1s ease-in-out forwards;
}

@keyframes moveImageRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

hr {
    border: 0;
    height: 1px;
    background-color: black;
}

</style>