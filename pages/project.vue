<template>
    <div>
        <div class="content">
            <div class="container-content">
                <h3 v-if="!isEnglish" class="content-flex">Đôi lời về dự án</h3>
                <h3 v-else class="content-flex">A few words about the project</h3>
                <h1 v-if="!isEnglish" class="content-flex">Trang phục 54 dân tộc</h1>
                <h1 v-else class="content-flex">Costumes of 54 ethnic groups</h1>
                <div class="content-flex">
                    <p v-if="!isEnglish" style="text-align: center;">Web giới thiệu về trang phục các dân tộc Việt Nam
                        được xây dựng để giới thiệu trang phục truyền thống của 54 dân tộc Việt Nam đến tất cả mọi
                        người.
                    </p>
                    <p v-else style="text-align: center;">A website introducing Vietnamese ethnic costumes was built to
                        Introducing the traditional costumes of 54 Vietnamese ethnic groups to everyone.</p>
                </div>
            </div>
            <div class="image-wrapper">
                <img class="background" ref="background"
                    src="https://static.wixstatic.com/media/11062b_df2fd2bad43c4122b7542b0a13eb86ed~mv2.jpeg/v1/fill/w_1816,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_df2fd2bad43c4122b7542b0a13eb86ed~mv2.jpeg"
                    alt="Background Image" />
            </div>
        </div>

        <div class="target">
            <h2 class="content-flex">***</h2>
            <h2 v-if="!isEnglish" class="content-flex">Mục tiêu</h2>
            <h2 v-else class="content-flex">Target</h2>
            <div class="content-flex">
                <p v-if="!isEnglish">Tạo ra một nền tảng trực tuyến để giới thiệu, bảo tồn văn
                    hóa, truyền thống và phong tục của các dân tộc Việt Nam thông qua trang phục truyền thống. Tại đây,
                    bạn sẽ khám phá được không chỉ vẻ đẹp mà
                    còn cả sự sâu sắc và ý nghĩa văn hóa được thể hiện qua từng thiết kế trang phục. Chúng tôi hy vọng
                    rằng trang web này không chỉ là nơi để bạn khám phá về trang phục, mà còn là một cầu nối giao lưu
                    văn hóa, tôn vinh bản sắc dân tộc và khuyến khích sự đa dạng trong trang phục truyền thống. Giúp mọi
                    người tiếp cận dễ dàng hơn trong việc tìm hiểu trang phục truyền thống của 54 dân tộc Việt Nam cũng
                    như hy vọng đưa hình ảnh các trang phục truyền thống của đất nước ta ra khắp thế giới.
                </p>
                <p v-else>Create an online platform to introduce and preserve literature
                    culture, traditions and customs of Vietnamese ethnic groups through traditional costumes. Here,
                    You will discover not only beauty but also
                    There is also profoundness and cultural significance expressed through each costume design. We hope
                    that this website is not only a place for you to discover clothes, but also a bridge for
                    communication
                    culture, honoring national identity and encouraging diversity in traditional costumes. Help everyone
                    It is easier for people to learn about the traditional costumes of the 54 ethnic groups in Vietnam
                    with the hope of bringing images of our country's traditional costumes to the world.</p>
            </div>
        </div>

        <div class="thank">
            <h2 v-if="!isEnglish" class="content-flex">Lời cảm ơn</h2>
            <h2 v-else class="content-flex">Thank you</h2>
            <div class="content-flex" style="margin-bottom: 50px;">
                <p v-if="!isEnglish">Chúng tôi xin gửi lời cảm ơn chân thành đến nhóm tác giả
                    <a href="https://www.facebook.com/dongbaovietphuc" target="_blank"> Đồng Bào Việt Phục</a> và
                    <a href="https://www.instagram.com/nhoto.vietnam/" target="_blank"> Nhỏ to Việt Nam</a> vì đã
                    tạo điều kiện cho chúng tôi sử dụng hình ảnh trang phục truyền thống 54 dân tộc. Sự giúp đỡ từ phía
                    nhóm tác giả
                    đã mang lại một phong cách và ý nghĩa đặc biệt cho dự án của chúng tôi. Bằng việc chia sẻ tác phẩm
                    của mình, họ đã làm phong phú thêm nội dung của chúng tôi và giúp chúng tôi truyền đạt thông điệp
                    một cách sâu sắc và sinh động hơn. Một lần nữa, chúng tôi chân thành cảm ơn sự đồng ý và giúp đỡ
                    đáng quý từ phía nhóm tác giả, và hy vọng sẽ có nhiều cơ hội hợp tác tích cực khác trong tương lai.
                </p>

                <p v-else>We would like to express our sincere thanks to the author group
                    <a href="https://www.facebook.com/dongbaovietphuc" target="_blank"> Dong Bao Viet Phuc</a> and
                    <a href="https://www.instagram.com/nhoto.vietnam/" target="_blank"> Nho to Viet Nam</a> as
                    create conditions for us to use images of traditional costumes of 54 ethnic groups. Help from the
                    side group of authors brought a special style and meaning to our project. By sharing works
                    their content, they have enriched our content and helped us get our message across
                    more deeply and vividly. Once again, we sincerely thank you for your consent and help
                    valuable from the author group, and hope to have many other positive cooperation opportunities in
                    the future.
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    computed: {
        isEnglish() {
            return this.$store.state.isEnglish;
        },
    },

    setup() {
        const background = ref(null);

        const handleScroll = () => {
            const scrollY = window.scrollY;

            const maxBackgroundSize = 120;
            const backgroundSize = scrollY / (maxBackgroundSize - 100) * 2;

            const translateX = scrollY * 0.4;

            background.value.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
        };

        onMounted(() => {
            document.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            document.removeEventListener('scroll', handleScroll);
        });

        return {
            background,
        };
    },
};
</script>

<style scoped>
.content {
    height: 45vh;
}

.container-content {
    position: absolute;
    z-index: 2;
    width: 100vw;
    height: 44.6vh;
    background-color: rgba(11, 36, 2, 65%);
}

.content-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-content h3 {
    color: rgb(238, 177, 136);
    margin-top: 50px;
    font-size: 26px;
}

.container-content h1 {
    font-size: 40px;
    color: rgb(238, 177, 136);
    margin-bottom: 10px;
}

.container-content p {
    width: 40vw;
    font-size: 18px;
    color: white;
}

.image-wrapper {
    width: 100vw;
    height: 45vh;
    overflow: hidden;
    position: relative;
    left: 0;
    z-index: 1;
}

img.background {
    width: 1815.36px;
    height: 314.8px;
    left: -151.28px;
    top: 0px;
    object-fit: cover;
    position: absolute;
}

.target,
.thank,
.conclude {
    width: 100vw;
    margin-top: 50px;
}

.target h2,
.thank h2,
.conclude h2 {
    font-size: 30px;
    color: rgb(153, 153, 153);
    font-weight: 560;
    margin-bottom: 20px;
}

.target p,
.thank p,
.conclude p {
    font-size: 14px;
    width: 50vw;
    text-align: center;
}
</style>