<template>
    <div>
        <div class="main">
            <div class="left-bar">
                <img :src="imgleft" class="img-costume img-left">
            </div>
            <div class="content">
                <div class="content-text">
                    <p><b>{{ dynamicTexts.text1 }}</b> Tày</p>
                    <p><b>{{ dynamicTexts.text2 }}</b> Thổ</p>
                    <p><b>{{ dynamicTexts.text3 }}</b> Thổ, Ngạn, Phén, Thu Lao và Pa Dí</p>
                    <hr>
                    <p><b>{{ dynamicTexts.text4 }}</b> Đông Bắc Bộ</p>
                    <p><b>{{ dynamicTexts.text5 }}</b> Vùng thung lũng các tỉnh Đông Bắc, từ Quảng Ninh, Bắc Giang đến Cao Bằng, Bắc Kạn, Lào Cai, Yên Bái</p>
                    <hr>
                    <div>
                        <p><b>{{ dynamicTexts.text6 }}</b> 2729</p>
                        <p><b>{{ dynamicTexts.text7 }}</b> 0.003%</p>
                    </div>
                    <hr>
                    <p><b>{{ dynamicTexts.text8 }}</b> Tạng - Miến</p>
                    <p><b>{{ dynamicTexts.text9 }}</b> Hán - Tạng</p>
                    <hr>
                    <p><b>{{ dynamicTexts.text10 }}</b></p>
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
                        <Button @click="gotoNextPage" :disabled="index === 53" type="nav">Next</Button>
                    </div>
                </div>
            </div>
            <div class="right-bar">
                <img :src="imgright" class="img-costume img-right">
            </div>
        </div>
        <div class="comment">
            <h2>Bình luận</h2>
            <div class="comment-textarea">
                <textarea placeholder="Để lại bình luận của bạn tại đây." class="comment__text"></textarea>
                <Button type="nav">Gửi</Button>
            </div>
            <hr style="border: none; height: 2px; background-color: #f5f5f5;">
            <div class="comment-list">
                <span>a</span>
            </div>
        </div>
    </div>
</template>

<script>
import Resource from '@/helper/resource.js'
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
                } else if (event.key === 'ArrowRight' && this.index < 53) {
                    this.gotoNextPage();
                }
            }
        },

        computed: {
            isEnglish() {
                return this.$store.state.isEnglish;
            },

            dynamicTexts() {
                return {
                    text1: this.isEnglish ? Resource.text1.en : Resource.text1.vi,
                    text2: this.isEnglish ? Resource.text2.en : Resource.text2.vi,
                    text3: this.isEnglish ? Resource.text3.en : Resource.text3.vi,
                    text4: this.isEnglish ? Resource.text4.en : Resource.text4.vi,
                    text5: this.isEnglish ? Resource.text5.en : Resource.text5.vi,
                    text6: this.isEnglish ? Resource.text6.en : Resource.text6.vi,
                    text7: this.isEnglish ? Resource.text7.en : Resource.text7.vi,
                    text8: this.isEnglish ? Resource.text8.en : Resource.text8.vi,
                    text9: this.isEnglish ? Resource.text9.en : Resource.text9.vi,
                    text10: this.isEnglish ? Resource.text10.en : Resource.text10.vi,
                }
            }
        },

        data() {
            return {
                items: ['Cống','Hà Nhì','Kháng','Khơ Mú','La Ha','La Hủ','Lào','Lự','Mảng','Si La','Xinh-mun','Bố Y','Dao','Giáy','Mông','Phù Lá','Thái','Cờ Lao','La Chí','Lô Lô','Ngái','Nùng','Pà Thẻn','Pu Péo','Sán Chay','Sán Dìu','Tày','Mường','Việt','Bru- Vân Kiều','Chứt','Cơ-tu','Ơ-đu','Tà-ôi','Thổ','Co','Ra Glai','Brâu','Chu-ru','Cơ-ho','Ê-đê','Gia-rai','Mạ','Mnông','Rơ-măm','Xơ-đăng','Ba-na','Giẻ-triêng','Hrê','Chơ-ro','X`Tiêng','Khmer','Hoa','Chăm'],
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

.comment {
    width: 70vw;
    margin: 0px 0px 14px calc((100% - 750px) * 0.5);
    padding: 10px;
    background-color: #f9fafb;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,10%),0 2px 6px 2px rgba(60,64,67,15%);
    border-radius: 10px;
}

.comment-textarea {
    display: flex;
    height: auto;
    margin-bottom: 20px;
}

.comment__text {
    width: 60vw;
    height: 15vh;
    padding: 4px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,10%),0 2px 6px 2px rgba(60,64,67,15%);
}

.comment__text:focus {
    outline: none;
}

.comment-list {
    height: 15vh;
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
    position: relative;
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