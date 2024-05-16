<template>
    <div>
        <div class="main">
            <div class="left-bar">
                <img :src="imgleft" class="img-costume img-left">
            </div>
            <div class="content">
                <div class="button__buy">
                    <button @click="buyCostume" title="Đặt hàng">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="17" cy="19" r="2" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l14 1l-1.5 7h-11.5" />
                        </svg>
                    </button>
                </div>
                <Modal v-if="hideModalBuy" type="modal-buy" @hide-modal__buy="handleHideModalBuy"
                    :hideModalBuy="hideModalBuy"></Modal>
                <Modal v-if="hideModalContinue" type="modal-continue" @hide-modal__continue="handleHideModalContinue"
                    :hideModalContinue="hideModalContinue"></Modal>
                <div v-for="(item, index) in items" :key="index" class="content-text">
                    <div v-for="(info, indexinfo) in (isEnglish ? [dataEthnicEn[count - 1]] : info)" :key="indexinfo">
                        <template v-if="index === count - 1">
                            <div class="edit"><b>
                                    <p style="margin-right: 4px;">{{ dynamicTexts.text1 }}</p>
                                </b>
                                <p v-if="!isEnglish" style="margin-left: 0;">{{ item.role }}</p>
                                <p v-else style="margin-left: 0;">{{
                    item.role.normalize('NFD').replace(/[\u0300-\u036f]/g, '') }}</p>
                            </div>
                            <hr>
                            <div>
                                <TextEdit :title="dynamicTexts.text2" :material="info.material"
                                    :apiUrl="`/api/edit-costumes`" :id="count"></TextEdit>
                                <TextEdit :title="dynamicTexts.text3" :pattern="info.pattern"
                                    :apiUrl="`/api/edit-costumes`" :id="count"></TextEdit>
                            </div>
                            <hr>
                            <TextEdit :title="dynamicTexts.text4" :other="info.other" :apiUrl="`/api/edit-costumes`"
                                :id="count"></TextEdit>
                            <TextEdit :title="dynamicTexts.text5" :characteristic="info.characteristic"
                                :apiUrl="`/api/edit-costumes`" :id="count"></TextEdit>
                            <hr>
                            <p><b>{{ dynamicTexts.text6 }}</b></p>
                            <TextEdit :title="dynamicTexts.text7" :male="info.male" :apiUrl="`/api/edit-description`"
                                :sexId="info.idMale" :id="count"></TextEdit>
                            <TextEdit :title="dynamicTexts.text8" :female="info.female"
                                :apiUrl="`/api/edit-description`" :sexId="info.idFemale" :id="count"></TextEdit>
                        </template>
                    </div>
                </div>
                <div class="content-logo">
                    <div class="content-logo__btn">
                        <Button @click="gotoPreviousPage" :disabled="count === 1" type="nav">Previous</Button>
                    </div>
                    <div class="content-logo__img">
                        <img src="@/assets/img/logo.png" class="img-logo">
                    </div>
                    <div class="content-logo__btn">
                        <Button @click="gotoNextPage" :disabled="count === 54" type="nav">Next</Button>
                    </div>
                </div>
            </div>
            <div class="right-bar">
                <img :src="imgright" class="img-costume img-right">
            </div>
        </div>
        <div class="comment">
            <h2 v-if="!isEnglish">Bình luận</h2>
            <h2 v-else>Comment</h2>
            <div class="comment-textarea">
                <textarea :placeholder="placeholderComment" class="comment__text"
                    v-model="commentText"></textarea>
                <Button @click="addComment" type="nav">
                    <p v-if="!isEnglish">Gửi</p>
                    <p v-else>Send</p>
                </Button>
            </div>
            <hr style="border: none; height: 2px; background-color: #f5f5f5;">
            <div v-for="(comment, indexCmt) in comment" :key="indexCmt">
                <div v-if="comment.status.includes('0')" class="comment-list">
                    <div class="box-infor">
                        <img :src="comment.url" width="20px" height="20px" class="box-infor__avatar">
                        <p class="box-infor__name">{{ comment.name }}</p>
                    </div>
                    <div class="box-comment">
                        <div class="box-comment__question">
                            <p v-if="!editStatus[indexCmt]">{{ comment.content }}</p>
                            <span v-else>
                                <textarea v-model="editText[indexCmt]" style="width: 60vw; height: 30px;"></textarea>
                                <div style="color: red; font-size: 10px;">
                                    nhấn để
                                    <button style="color: #06F;" @click="cancelEdit(indexCmt)">hủy</button>
                                    • nhấn để
                                    <button style="color: #06F;" @click="saveEdit(indexCmt, comment.id)">lưu</button>
                                </div>
                            </span>
                            <div class="comment-button">
                                <button v-if="userIdToken === comment.userId" title="Chỉnh sửa"
                                    style="color: rgba(248, 248, 255, 80%); width: 30px; height: 30px;"
                                    @click="toggleEdit(indexCmt)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        aria-hidden="true" fill="none">
                                        <path fill="currentColor"
                                            d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"
                                            class></path>
                                    </svg>
                                </button>

                                <button v-if="userIdToken === comment.userId || sub.includes('admin')" title="Xóa"
                                    style="color: red; width: 30px; height: 30px;" @click="deleteComment(comment.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        aria-hidden="true" fill="none">
                                        <path fill="currentColor"
                                            d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"
                                            class></path>
                                        <path fill="currentColor" fill-rule="evenodd"
                                            d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
                                            clip-rule="evenodd" class></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Resource from '@/helper/resource.js'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import EthnicStore from "@/store/ethnic"
import axiosInstance, { setBearerToken } from '@/helper/api.js'
import TextEdit from '@/components/TextEdit.vue'
export default {
    name: "CostumeInfomation",

    components: {
        Button,
        Modal,
        TextEdit,
    },

    props: {
        imgleft: String,
        imgright: String,
        count: Number,
    },

    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);

        const jwt = require('jsonwebtoken');
        const token = localStorage.getItem("token");
        const decoded = jwt.decode(token);
        if (decoded) {
            this.sub = decoded.sub;
            this.userIdToken = decoded.id;
        }

        EthnicStore.get('/api/get-ethnics')
            .then(response => {
                response.data.forEach(item => {
                    const newItem = { ...this.ethnic }
                    newItem.role = item.name
                    this.items.push(newItem)
                })
            }
            ).catch(error => {
                console.error(error);
            });

            if (!this.isEnglish) {
                this.placeholderComment = "Để lại bình luận của bạn tại đây.";
            } else {
                this.placeholderComment = "Leave your comment here.";
            }
    },

    watch: {
        count(newValue, oldValue) {
            this.loadData(newValue);
            this.loadComments(newValue);
            this.costumeId = newValue;
        },

        isEnglish(newValue) {
            if (!this.isEnglish) {
                this.placeholderComment = "Để lại bình luận của bạn tại đây.";
            } else {
                this.placeholderComment = "Leave your comment here.";
            }
        }
    },

    methods: {
        /**
         * Author: NVManh(26/02/2024)
         * Chuyển hướng tới trang tiếp theo
         */
        gotoNextPage() {
            const nextPageIndex = this.count + 1;
            const nextPage = this.items[nextPageIndex - 1].role.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const nextPageEncoded = encodeURIComponent(nextPage);
            this.$router.push(`/ethnic/${nextPageEncoded}`);
        },

        /**
         * Author: NVManh(26/02/2024)
         * Chuyển hướng tới trang trước đó
         */
        gotoPreviousPage() {
            const previousPageIndex = this.count - 1;
            const previousPage = this.items[previousPageIndex - 1].role.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const previousPageEncoded = encodeURIComponent(previousPage);
            this.$router.push(`/ethnic/${previousPageEncoded}`);
        },

        /**
         * Author: NVManh(26/02/2024)
         * Điều hướng trang web bằng nút mũi tên
         */
        handleKeyDown() {
            if (event.key === 'ArrowLeft' && this.count > 1) {
                this.gotoPreviousPage();
            } else if (event.key === 'ArrowRight' && this.count < 54) {
                this.gotoNextPage();
            }
        },

        buyCostume() {
            if (this.userIdToken === "") {
                this.hideModalContinue = true;
            } else {
                this.hideModalBuy = true;
            }
        },

        handleHideModalBuy(value) {
            this.hideModalBuy = value;
        },

        handleHideModalContinue(value) {
            this.hideModalContinue = value;
        },

        async loadData(id) {
            await axiosInstance.get('/api/get-costumes/' + id)
                .then(response => {
                    console.log(response.data)
                    const newItem = { ...this.ethnic }
                    newItem.material = response.data.material
                    newItem.pattern = response.data.pattern
                    newItem.other = response.data.other
                    newItem.characteristic = response.data.characteristic
                    newItem.male = response.data.listCostumesDetail[0].description
                    newItem.female = response.data.listCostumesDetail[1].description
                    newItem.idMale = response.data.listCostumesDetail[0].id
                    newItem.idFemale = response.data.listCostumesDetail[1].id
                    this.info.push(newItem)
                })
                .catch(error => {
                    throw new Error(error);
                })
        },

        async loadComments(id) {
            axiosInstance.post('/api/get-all-comments', { costumeId: id })
                .then(response => {
                    response.data.forEach(item => {
                        const newItem = { ...this.comments }
                        newItem.id = item.commentDto.id
                        newItem.status = item.commentDto.status
                        newItem.content = item.commentDto.content
                        newItem.name = item.name
                        newItem.url = item.url
                        newItem.userId = item.commentDto.userId
                        this.comment.push(newItem)
                    })
                }
                ).catch(error => {
                    console.error(error);
                });
        },

        itemsToShow() {
            return this.items;
        },

        toggleEdit(index) {
            this.editStatus.forEach((status, i) => {
                this.$set(this.editStatus, i, false);
            });
            this.$set(this.editStatus, index, true);
            this.$set(this.editText, index, this.comment[index].content);
        },

        deleteComment(index) {
            const deleteComment = {
                "id": index,
                "costumeId": this.costumeId,
                "userId": this.userIdToken
            };
            console.log(deleteComment)
            const token = localStorage.getItem("token");
            setBearerToken(token);
            axiosInstance.post('/api/delete-comments', deleteComment)
                .then(response => {
                    window.location.reload();
                }
                ).catch(error => {
                    console.error(error);
                });
        },

        cancelEdit(index) {
            this.$set(this.editStatus, index, false);
        },

        saveEdit(indexCmt, id) {
            const updateComment = {
                "id": id,
                "content": this.editText[indexCmt],
                "costumeId": this.costumeId
            };
            const token = localStorage.getItem("token");
            setBearerToken(token);
            axiosInstance.post('/api/update-comments', updateComment)
                .then(response => {
                    this.comment[indexCmt].content = this.editText[indexCmt];
                    delete this.editText[indexCmt];
                }
                ).catch(error => {
                    console.error(error);
                });
            this.$set(this.editStatus, indexCmt, false);
        },

        async addComment() {
            if (this.userIdToken === "") {
                this.hideModalContinue = true;
            } else {
                const addComment = {
                    "content": this.commentText,
                    "costumeId": this.costumeId
                };
                if (this.commentText.trim() !== "") {
                    const token = localStorage.getItem("token");
                    setBearerToken(token);
                    axiosInstance.post('/api/post-comments', addComment)
                        .then(response => {
                            window.location.reload();
                        }
                        ).catch(error => {
                            console.error(error);
                        });
                }
            }
        },
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
            }
        },
    },

    data() {
        return {
            hideModalBuy: false,
            hideModalContinue: false,
            ethnics: {
                role: '',
                material: '',
                pattern: '',
                other: '',
                characteristic: '',
                male: '',
                female: '',
                idMale: '',
                idFemale: ''
            },
            comments: {
                id: '',
                status: '',
                url: '',
                name: '',
                content: '',
                userId: '',
            },
            costumeId: 0,
            commentText: '',
            comment: [],
            items: [],
            info: [],
            isDataFetched: false,
            editStatus: [],
            editText: [],
            userIdToken: '',
            sub: '',
            placeholderComment: '',
            dataEthnicEn: [
                { material: 'Textile fabric', pattern: 'Mainly blue, red, yellow, and white colors are arranged alternately combined with embroidered thread patterns in each strip. There are additional square silver accessory strips attached.', other: "For the older generation, traditional clothing is the most precious and closest dowry when a girl returns to her husband's family. For the younger generation, clothing represents filial piety, inheritance and preservation. as well as pride for parents and grandparents and the ethnic community.", characteristic: 'The costumes are similar to those of Thai people, mixed a lot in both materials and styles.', male: 'Quite simple, mostly black indigo. The shirt has no collar and is tight-fitting, the buttons are tied with fabric buttons. The pants have a drawstring waistband and straight wide legs.', female: 'Tops, short skirts, scarves, belts and other jewelry. Characterized by two sleeves decorated with alternating blue, red, yellow, and white patches. The skirt is the same style as the Thai dress, but has many woven patterns along the skirt body.' },
                { material: 'Fabric.', pattern: "Ha Nhi Hoa women's costumes are mainly red, or red mixed with white. Ha Nhi Den women's costumes are mainly black, decorated with white or blue patterns. Decorative motifs are different between Ha Nhi branches but all represent the harmony between human and natural elements.", other: 'Black Ha Nhi women already wear scarves, especially indigo scarves, which means to announce: I am married. According to the spiritual customs of the Ha Nhi people, the top of the head is the part that holds the soul, so when you get married, you have to keep the soul tightly, so wearing a scarf on it will keep the soul longer.', characteristic: '', male: 'Simple: clothes, headgear and belt. The shirt is tailored with slits in the armpits and chest, narrow across, and fastened together with fabric buttons. Pants with lame legs, high crotch, short waistband and legs, tightened with a fabric belt.', female: "Shirt, bib, pants, belt and head scarf. The distinctive features of Ha Nhi Den women's costumes are their hair and head scarf. When Black Ha Nhi women get married, they often braid their hair into a roll, then wrap it around their head, then wear a scarf." },
                { material: 'Fabric', pattern: "Women's clothing is characterized by 'lipstick' studded with metallic beads and coins. The skirt cover is decorated with blue, red, yellow fabric clips and lace tassels.", other: 'Metal coins are attached to the lipstick, which means good luck and ward off evil spirits. The Khang sisters also have hobbies like dyeing their teeth black and chewing betel.', characteristic: 'The ethnic identity is blurred, growing cotton in exchange for fabric and clothing of the Black Thai people, so the costumes of these two people are quite similar.', male: 'Usually wears crippled pants and an indigo shirt with a slit in the chest.', female: 'Almost similar to the grass dress of the Black Thai people, but the patterns and motifs have their own identity, especially the small red piece of fabric in the shape of a long trapezoid joining both sides of the chest. Camisole covering skirt with green belt. The young woman tied her hair in a high bun similar to the way the Thai people "hang the dog". However, do not install the brooch facing forward but to the right. Wrap a scarf with thread or wool tassels at both ends. The style of the pieu scarf is similar to that of the Thai people, but the pattern is a bit different.' },
                { material: 'Indigo dyed cotton fabric, handwoven fabric.', pattern: "The main color is indigo. Women's head scarves are decorated with embroidery thread, tassels and colored fabric flowers at both ends of the scarf, mixed in many colors, closely arranged, and have their own characteristics.", other: '', characteristic: "Weaving is not developed, so we often buy clothes and dresses from Thai people to wear. The Khmu nuances expressed in costumes have almost faded away, although women's jewelry still has a few unique features.", male: 'Indigo dyed clothes and berets. During Tet holidays, young people often wear short shirts with buttons made of black fabric. Old people wear ao dai.', female: 'The grass shirt has rectangular buttons (pam) or butterfly shapes (pem) on the chest, waistband, skirt, leggings, headband, sash... The head is covered with a scarf, but the way of wrapping is completely different from Thai people: Tie your hair in a neat bun on your head, use hair filler for a beautiful bun; Then, wrap the scarf around your head, one end hanging down the back of your neck, while the other end is hidden in the rim of the scarf.' },
                { material: 'Indigo dyed fabric.', pattern: 'Monochrome outfit, no outstanding patterns.', other: 'Young women tie their hair in a bun right at the back of their neck, while young women tie their hair in a bun on top of their head like the Thai Den people. In some places, from little girls to old people, they only tie their hair in a bun on the top of their head, or due to the influence of the White Thai people, they only tie their hair in a bun at the back of their neck, regardless of whether they are married or not.', characteristic: '', male: 'Black indigo dyed blouse, low collar, slit, two pockets; Lame-legged pants, wide crotch, have a waistband so that when wearing, fold the two sides together and then fold them down to keep them secure. In the past, hair was tied in a bun at the back of the head, but now only a few old people and priests keep this custom.', female: "Similar to the Black Thai people: shirt with slit in the chest, silver butterfly buttons, along with a black skirt and head scarf. Some places also wear an apron on the front skirt or on the back when it's cold." },
                { material: 'Fabric.', pattern: "Depending on each person's personal preference, sew floral fabric edges of various colors like blue, white, black, red or attach silver coins, aluminum coins and red thread.", other: 'Every La Hu girl, when she reaches adulthood, consciously sews a traditional ao dai for herself.', characteristic: '', male: 'The five-piece shirt has slits in the armpits and chest, is fastened with fabric buttons, the pants have lame legs, and have a waistband. When wearing, fold the waistband and use a long fabric belt to tighten it on the outside.', female: 'There are two shirts: a long inner shirt, buttoned to the right armpit; Short outer shirt without sleeves, buttoned in the middle of the chest, worn on Tet holidays. The ao dai has a black hem, with red as the main color accented on the collar, chest brace, and sleeves. The sleeves are long and narrow, women use old fabric as the inner lining, the outside is sewn upside down. The chest is the overlapping contours of fabrics. Lame-legged pants. Characterized by the elaborate way of wearing the scarf, consisting of four layers: red-brown plastic ring, embroidered fabric scarf with beaded patterns, tassel colored thread.' },
                { material: 'Cotton fabric is self-collected, dyed and woven.', pattern: 'Pattern with rich colors on indigo background. Many different types of patterns, popular patterns include red-necked dragons, tigers, a pair of entwined snakes, a girl turning into a bird, and an elephant with a rider. Each type of pattern is associated with a different story, has high educational meaning and represents a part of beliefs and concepts about life.', other: "Today, Lao women are still weaving and passing on their experiences to their daughters. Some new pattern motifs have been born, but traditional patterns are still popular and appear most on women's costumes.", characteristic: '', male: 'Long sleeve shirt, black pants over the knee, buttoned. Often tattooed with a "swastika" on the wrist and often with an animal tattoo on the thigh.', female: 'A tight short blouse with silver buttons, a black skirt tied across the chest, reaching to the calves, the hem of the skirt has many colorful patterns. Wear a scarf across your chest. The belt is made of copper or strict silver. When not wearing scarves, women like to wear many silver brooches and hair buns. Young women often tie their hair in a bun to the left. Wear many bracelets on your wrist and tattoo a vegetable plant on the back of your hand.' },
                { material: 'Fabric woven from cotton or silkworm cocoons.', pattern: 'Patterns of flowers and red and blue diamonds follow each other on an indigo background.', other: "The Lu people use the standard to evaluate a woman's role in the family as well as in the village by the quality of the textile products she makes.", characteristic: '', male: 'Simple. The clothes are made of black indigo fabric, the blouse is split in the chest, buttoned with braided fabric, has two pockets on the two hems and one pocket on the left chest, pants from the knee down with patterns. Brothers wear black scarves, folded and rolled many times.', female: 'Fan-shaped shirt with six pieces of fabric pieced together to create a wide spread compared to the waist; The skirt is made of three different pieces of fabric assembled into a tube shape and divided into three parts including the waistband, body and skirt; The head scarf is long and wide, on the black background of the two ends of the scarf are interwoven white threads of different sizes and tassels at both ends. Women wrap the scarf in many rings around the bun, tilting it towards the left side of the head; In addition, women often wear necklaces as jewelry accessories to create an overall highlight.' },
                { material: 'Fabric purchased from Thai Trang, Ha Nhi people or industrial fabric.', pattern: "Women's hair bands have tassels at both ends. The tassels are small plastic beads in blue, red, black, white, and yellow; The tassel ends are red fabric fibers.", other: 'The Mang people have the custom of having their faces tattooed.', characteristic: 'Traditional costumes are still preserved, although people now dress like Thai and Kinh people.', male: 'Quite simple, including a slit blouse and pants.', female: 'Blouse with slit in the chest (flat) with pants (tang kha) and wrapped with a white cloth with decorative patterns across the body. The head is bare, the hair is tied on the head with a tasseled string (pang chu ngut), the legs are wrapped in leggings.' },
                { material: 'Fabric.', pattern: "Men's monochrome uniform. Women's costumes are blue and black with red thread to create a highlight. Hem or sew strips of fabric of different colors, and also attach coins and colorful threads.", other: 'Traditional costumes are usually only worn during holidays and New Year, while on weekdays people wear shirts and skirts in the style of Thai people.', characteristic: '', male: 'Simple. Blouses with chest slits, buttoned, stand-up collar, two or three pockets, lame-leg pants. In addition, the brothers also wear white turbans and ax headscarves.', female: 'Unique and diverse, including head scarves, shirts, overalls, skirts, and leggings. The collar is loose, around the collar are two strips of blue and red fabric. The stitching between the neck and body of the shirt is made of colored thread and embossed for decoration. Shirt buttoned on the right armpit. In particular, the chest flap is filled with sparkling silver and aluminum coins, and the neck and sleeves are decorated with colorful fabric lines. There are two types of towels: white towels and black towels. 13-14 year old girls start wearing white scarves with patterns embroidered with red thread. After getting married, they all use black scarves with colored thread flowers, stems in the shape of buffalo horns, and a bun inside.' },
                { material: 'Cotton woven fabric.', pattern: 'There are no outstanding patterns, influenced by Thai people.', other: 'Traditional costumes are now only in the memories of the elderly. The Xinh Mun community in some areas does not have traditional costumes and no one makes their own national costumes.', characteristic: 'Costumes are influenced by the costumes of the Black Thai people.', male: 'Simple. Clothes include a head scarf and a bag to carry around when going to the fields or going to the market.', female: 'Includes shirt, skirt, scarf and belt. Short waist-length shirt, high and round neck, tight long sleeves. Long black dress and a green belt tied tightly over the waistband of the dress. Wear a scarf decorated with buttons at the four corners and around the edge. Women also wear bracelets, necklaces, and earrings.' },
                { material: 'Shirt and pants made of linen. The puffy outer garment is made of rough fabric, dyed indigo.', pattern: "Women's costumes come in many colors such as blue, red, purple, gray and indigo with unique motifs such as peonies, symmetrical butterflies and striking pink.", other: 'Usually, people of all ages often wear a lot of jewelry, especially young women and girls who wear bright dresses and the most beautiful jewelry to go to the market, sing love songs to find a partner...', characteristic: '', male: 'Pretty simple. Four-piece shirt, short wings, hem collar and indigo-colored pants.', female: 'The undershirt (puff) is an open-chested, four-piece style shirt with a copper button attached to the neck. The two front flaps have two small, symmetrical pockets. The outer shirt (pup pap) is a four-piece style with no buttons, only a pair of fabric straps, one attached to the bottom of the left hem, one attached to the right armpit slit, when wearing the shirt they are tied together. . The headgear (ba can) and apron (dao scale) are meticulously made and decorated with elaborate motifs. Women like to wear a lot of jewelry such as necklaces, bracelets, and necklaces.' },
                { material: 'Self-woven coarse fabric, cotton and indigo fabric. Nowadays, very few people weave their own fabric. They mostly use purchased fabric and then bring it home to embroider decorative patterns on it.', pattern: 'Each Dao group has its own pattern, not embroidering according to a pre-drawn pattern on the fabric but relying entirely on memory, embroidering on the left side of the fabric so that the pattern emerges on the right side.', other: '', characteristic: '', male: 'All Dao groups are basically the same, including: head scarves (each Dao group has a different way of wrapping their heads), shirts and pants. There are two types of shirts: short shirts and long shirts. Short dresses are worn every day, long dresses are worn on holidays.', female: 'Very diverse: ao dai combined with pants, most importantly the shirt is designed to reach nearly the knee. The shirt has two flaps with elaborate patterns embroidered on the tail of the shirt. Wearing pants with lame legs, leaf-shaped sand, wide crotch. Wear a handmade fabric belt around your body, tie it and leave the tail strip down your back. The head wrap is embroidered with many colorful patterns. There are three types of towels: square towels, rectangular towels and long towels. In addition to the main outfit, women also like to use a lot of jewelry.' },
                { material: 'Wool or fiber fabric.', pattern: 'Monochrome clothes are mainly purple, blue, pink,...', other: 'Giay people believe that canvas shoes have the power to transform a world of life, bringing people back to their youth. Old people who have passed away wear colorful canvas shoes like young people in the hope of rejuvenation. In the spiritual world, they are still Giay people but more beautiful and younger than when they died.', characteristic: '', male: "Blouse with chest slit, round neck, and fabric buttons. Shirts usually have three pockets, two lower pockets, one upper right pocket. The shirt body is a bit short, indigo color. Wear straight-leg pants with wide waistbands, don't use elastic straps, just wear them on your body. Some brothers wear scarves on their heads and even grow their hair long to wear it in a bun.", female: 'The shirt covers the buttocks, has slits in the right armpit, wide sleeves, and covers the neck and sleeves with different colored fabrics. The inner shirt is a short-sleeved blouse with a chest slit and a low round neck. Wear pants or skirts. Often wearing colorful square scarves woven from wool.' },
                { material: 'Self-woven fabric, pattern dyed with beeswax.', pattern: 'Patterns with a variety of colors create a warm feeling and are different between Mong groups.', other: '', characteristic: '', male: 'Short blouse at or below the waist, narrow body, slightly loose sleeves; The lame-legged pants are very wide to make it easier to climb hills and dance; The head is often covered with a scarf, some groups wear hats, some groups wear belts around the waist.', female: 'Four-piece shirt, chest slit, no buttons, hem not sewn or tucked into the skirt; The skirt is tight, has many folds, is wide, and when flared out, it has a circular shape with a decorative embroidered fabric belt in the middle; Apron worn in front of the abdomen covering the legs. Women often wear long hair wrapped around their heads, and some groups wear scarves wrapped high on their heads.' },
                { material: 'Self-woven cotton fabric.', pattern: 'The indigo background symbolizes the mountains and forests. The motifs and patterns are expressed from the idea of simulating the natural world, trees, flowers and animals. For women, the upper part of the shirt is beaded in straight lines, the waist is decorated with whole mountain snail shells or some monochromatic colors to create balance.', other: '', characteristic: 'Brings traditional beauty and is also quite "modern".', male: 'Simple with round neck, armpit slit, cuffed sleeves, no buttons, bare chest, back bodice is embroidered with cross stitches. Other groups wear pants, long shirts with slits in the chest, or short shirts with slits in the armpits.', female: 'The pullover shirt has a short, square neck and does not cover the waistband of the skirt, so it has an extra band outside the waistband. The neck, arms, body and hem are embroidered with repeating patterns; The skirt is closed, the waistband is smaller than the hem, the skirt hem is embroidered with many patterns; Wear a black or indigo square scarf, the four corners and the middle of the scarf are studded with beads.' },
                { material: 'Silk or cotton fabric.', pattern: "Monochrome outfit, main colors are black and white, no decorative patterns. The highlight is the pattern on the pieu scarf and the silver buttons on the women's clothes.", other: 'Young women will wear shirts with odd rows of buttons, while married people will wear shirts with even rows of buttons. According to Thai folk beliefs, two rows of silver buttons on the two lapels of the ancient shirt symbolize the union of man and woman, creating the longevity of the race. Young women tie their hair in a bun at the back of their neck, while young women tie their hair in a bun on top of their head.', characteristic: '', male: 'Blouse with chest slit and pockets, wrapped in scarf. There are two types of blouses: short blouses and long blouses, without decorative patterns. During Tet holidays, wear ao dai with slits in the right armpit, indigo color, and wrap your head with a scarf.', female: 'Short blouse with slit in the chest, round neck, tight-fitting short shirt with butterfly, spider or cicada buttons (sho cham), ao dai (sho cham and tua luang), skirt (dull), belt (sao cam), scarf (pieu), hat (cup), leggings (pepăn kha) along with earrings, necklaces, bracelets and soap bars.' },
                { material: 'Handmade cotton, wool, rustic or pre-made fabrics.', pattern: 'The female outfit is typically blue in color with red fabric patches on the neck and sleeves.', other: '', characteristic: "The costume's personality is unclear, influenced by the costumes of the Tay - Thai language group.", male: "Four-piece shirt with fabric buttons and long pants. On the wedding day, the groom is required to wear a blue ao dai like a woman's and wrap a red scarf around his body.", female: 'Wear pants combined with a five-armed ao dai, long above the knee, decorated with many strips of fabric sewn onto the chest from the middle of the chest to the right armpit, along the split edge. Wear a scarf without decorative patterns, folded in half and wrapped many times around the head.' },
                { material: 'Fabric woven from cotton and indigo fabric.', pattern: 'Embroidered on an indigo background with triangular, dotted, and diamond-shaped patterns combined with borders in many different colors such as blue, white, red, yellow, and purple, creating highlights of the motifs. The main decorative motif is the pattern in the middle, surrounded by embroidered borders forming round dots in many different colors.', other: 'At weddings, relatives often give the bride and groom a pair of slings with the meaning of wishing luck, peace and hope that the couple will soon have children. Therefore, the sling is always made very carefully and meticulously, meticulously and delicately in every line.', characteristic: '', male: 'Unsophisticated. Includes a five-part shirt that reaches mid-calf length (today the shirt is shorter), long-sleeved pants, and a roll or turban.', female: 'Includes a long scarf (sling) over the forehead, a long dress with a slit in the middle, a waistband, a bib, and can be worn with pants or a skirt depending on the person.' },
                { material: 'Colored fabric.', pattern: 'Usually red is the main color, Lo Lo people love red because it symbolizes the sun. The pattern is quite elaborate and is made of triangular pieces of colored fabric forming squares with jagged patterns like rice flowers, and spider webs. Rows of plastic buttons shaped like flowers or beads, round silver, and colored tassels attached to the edge of the scarf.', other: '', characteristic: 'The costumes of the two groups, Lo Lo Den and Lo Lo Hoa, are a bit different, but they are all decorated by sewing pieces of colored fabric together. Rich in types, unique shirt styling techniques. Artistic style, difficult to confuse with any ethnic group.', male: 'Short blouse, wide-leg pants. During Tet holidays, wear black and red indigo scarves. The two ends of the scarf are long with colorful tassels and embroidered with colorful threads of many types of patterns running along the edges and ends of the scarf.', female: "The shirt and sleeves are four long pieces sewn together. On these sections, sew circles of colored fabric similar to the pattern on the shirt body. Wide-leg pants with patterns running along the legs and near the hem. A cotton belt with decorative patterns, the edge and two ends of the belt have colored tassels and beads attached, when tied, the two ends of the belt hang out in front. Same headgear as men's" },
                { material: 'Fabric.', pattern: 'There is almost no pattern.', other: '', characteristic: 'Dress like the Chinese people. In addition to clothes, people also wear hats and hats of all kinds made from leaves, rattan and bamboo, as well as scarves and umbrellas.', male: 'Short shirt with split chest, long pants and belt.', female: 'The five-piece shirt is cut below the neck, diagonally across the right armpit, long beyond the buttocks, has a cloth button on the right armpit, and likes to braid her hair around her head.' },
                { material: 'The fabric is woven from white cotton and silk thread, cut and dyed by hand.', pattern: 'The colors are quite diverse, from light blue, to dark blue, charcoal purple, dark blue, but the most popular is indigo. Patterns are not elaborate, most do not have many patterns and lines, but are more about creating shapes.', other: '', characteristic: 'The art of sewing and accessories differs between groups.', male: 'Four-piece shirt, waist-length, long and wide sleeves, round collar, seven buttons and usually four or two pockets; pants, belt and headgear.', female: "The five-piece shirt is short, with wide sleeves, the collar has a row of fabric buttons on the right armpit, the wrist and lotus leaf are covered with a piece of fabric and the four pockets have no lids; Wide-leg pants with decoration at the hem; The skirt's body is assembled from 4 pieces, the hem is covered with different colored fabric. There are two types of head scarves: regular scarves (bau ga) and Tet scarves (bau chep). The way of wearing scarves and decorative scarves is slightly different among Nung groups. In addition, women also wear aprons, leggings, shoulder pads, canvas shoes and some jewelry made of metal." },
                { material: 'Self-woven fabric.', pattern: "Men's clothes are indigo. Red is the main color of women's clothing. On the red fabric background of the sleeves and hem are geometric patterns, dog shapes, mountain shapes, star shapes, chicken feet shapes... skillfully decorated for color patches.", other: 'According to traditional customs, red is a color with a specific meaning: In the past, the Pa Then people lived in the mountains, red was the color of the firebird with brilliant colors expressing the strong vitality and hope of Pa Then people.', characteristic: 'Due to settling in high mountains and often having to cope with natural disasters, sun and wind, the traditional costumes of Pa Then women are very discreet from the feet to the top of the head. Having ethnic characteristics creates a unique style.', male: 'Short blouse with slit in the chest and loose-fitting pants, along with a characteristic red headband.', female: 'The shirt is collarless, when worn, the front two bodies cross each other and the back body is longer than the front body. The sleeves and entire body of the shirt are decorated in colorful colors to add shape to the shirt. Young women often wear an extra shirt inside and turn the collar to the outside. They often wear long hair with a scarf wrapped around their, a red scarf on the outside, spread out like a hat, with two yellow and red tassels attached to both ends of the scarf.' },
                { material: 'The fabric was dyed in many colors, later using industrial colored fabrics.', pattern: "Mainly dark colors, indigo background. Do not embroider on the outfit, but fill the skirt with colored fabric, around the hem of the skirt and the head scarf. Triangles, diamonds, expressing the general ideas of the beliefs of the Pu Peo people.", other: 'According to the beliefs of the people, red represents men, symbolizing the respect Pu Peo women have for the breadwinner in the family. Whenever sewing a costume, red is always prioritized first, while blue represents the woman in the family.', characteristic: '', male: 'Short blouse with slit in the chest; The pants are the same color. During Tet holidays, the brothers wear indigo scarves wrapped in the benevolence style, and wear ao dai with slits in the right armpit, indigo or white.', female: 'There are two types of shirts: the outer shirt has a split chest without buttons, the inner shirt has buttons on the right armpit; Long black dress, decorated with patterns around the hem, some even decorated in the middle of the body. The outside is a skirt. In particular, the long diamond-shaped belt with both ends decorated with colorful patterns hangs down the entire skirt. Young women often tie their hair around their heads and wrap a purple scarf around the outside. The young woman wears her hair in a bun in front of her forehead, with a wooden comb on top, this is one of the cultural characteristics of the Pu Peo sisters.' },
                { material: 'White fabric dyed indigo.', pattern: "Monochrome outfit, no patterns. Men's clothes are indigo. Women wear blue and black clothes.", other: 'Currently, the San Chay robes are similar to those of the Kinh and Tay people. To preserve the beauty of traditional culture, especially costumes that will not be lost over time, the San Chay sisters have actively taught how to sew and embroider traditional costumes for the next generation. young people, especially girls.', characteristic: '', male: 'Simple, sewn in Ba Ba style with two large pockets. Long pants, elastic waistband, wide legs.', female: 'Shirts are worn in pairs. The inner shirt is a light-colored shirt, the outer shirt is an indigo shirt with two pieces sewn diagonally to the right, the length of the shirt is the same as the skirt; Calf-length indigo skirt; Put your hair up, wear a black scarf and wear a silver necklace and bracelet.' },
                { material: 'Silk fabric, rough fabric, rustic fabric,...', pattern: 'Main colors are black and white. The edges of the shirt are bordered by a red strip. The highlight is the blue, red, and yellow tassels.', other: '', characteristic: 'Simple but still beautiful, neat and thereby exuding a strong and healthy look.', male: 'The shirt is tailored in Ba Ba style, with two large pockets. Long pants, elastic waistband, very wide pant legs to facilitate mountain climbing and farming.', female: 'Headscarves, dresses, short dresses, skirts, bibs, belts and leggings. A knee-length shirt, a short shirt worn underneath, a white bib on the chest, a multi-layered knee-length split skirt, white leggings on the calves and a blue or red silk belt. Long four-piece shirt, turn-down collar with smooth brace. And especially through the way of wearing clothes, there is a distinction between married people and unmarried people.' },
                { material: 'Cotton fabric, silk fabric, floral fabric.', pattern: 'The main color is indigo. No textures.', other: '', characteristic: 'The Tay ethnic costume can be considered one of the simplest costumes of the 54 ethnic groups.', male: "Four-piece blouse (slua cam) with head scarf, pants and canvas shoes. The shirt is sewn in a style with chest slits, side slits, standing round neck, and various fabrics. The youth's shirt has a pocket on the left chest; A middle-aged man's shirt has pockets on both sides. During Tet holidays, brothers wear ao dai, with buttons on the side. Pants with lame legs, wide crotch, long pants to the ankles.", female: "Short blouse with chest slit, round neck, waistline with two small pockets on the front flaps. The ao dai is sewn in a five-part style, buttoned at the armpit, the long skirt reaches the back, and the calves have a waistline. Long, wide-leg pants. When wearing ao dai, women use a belt to wrap around the waist, tie it and release it behind the back into a long strip reaching the feet. Young women wear long skirts near their ankles with blue and red belts. Elderly people wear knee-length skirts with indigo and black belts. The indigo square scarf when worn is folded diagonally like a crow's beak." },
                { material: 'Silk fabric, industrial fabric.', pattern: 'There are two main colors: blue and white, there are also localities that use pink shirts. The patterns on the top of the skirt are mainly embroidered with dragons, phoenixes and other shapes, but are prominent and popular with the cultural influence on the Dong Son bronze drum surface.', other: '', characteristic: '', male: 'Blouse with chest slit, round neck, shoulder buttons, two pockets below or an additional pocket on the left chest, covering the buttocks, buttoned to the chest or diagonally to the side. Wide-leg pants are tied with a scarf around the middle of the stomach (turban scarf). Hair cut short or wrapped in a white scarf.', female: "Short brown or white blouse, chest slit, long sleeves, with camisole inside. Attached to the ankle-length skirt is a blue belt. The body of the dress is woven with a silk fabric, the color is dyed according to the wearer's preference. The head wears a white rectangular scarf without patterns that goes over the head to tie at the back of the neck." },
                { material: 'Quite rich and diverse, combined from sample fabrics and decorated with handmade lines or embroidered patterns.', pattern: 'Over time and many reforms, the patterns on the clothes mainly depend on the designer. Most use images of birds and flowers.', other: 'During Tet holidays: Men wear a black ao dai or a white lining inside, a turban, and white pants. It is a long-sleeved shirt with slits in the right armpit and has no decorative patterns. If there is any, it is only a woven pattern of the same color on the fabric. Feet are wooden clogs. Women wear ao dai. The front and back flaps stretch from the neck to the ankles and cover wide-leg pants with hems touching the ground.', characteristic: '', male: 'Brown blouse, chest slit, round neck, slits, two bottom pockets. Wide-leg pants with waistband or drawstring. In the past, people used to have long hair, buns or head scarves, and wore loincloths.', female: 'Women in the North and Central regions wear short brown blouses with a camisole and a tight skirt inside, some places wear them short to the shins. The belt is a colored fabric sheath (in some places called statue intestine) that wraps around the waistband of the skirt. Southern women wear Ba Ba shirts combined with bandanas and conical hats.' },
                { material: 'People do not know how to grow cotton and weave fabric. In the past, people used to take the bark of the unlucky tree (a ung) to make loincloths and shirts. Later, due to interactions with Vietnamese people, he gradually improved his outfit.', pattern: 'Mainly warm colors like pink purple, red, orange with large geometric patterns with horizontal strip layout.', other: 'According to the beliefs of the people, silver bracelets have high aesthetic value, are used as a dowry, and are used to ward off evil spirits and prevent the penetration of poisonous winds that cause pain and illness. On the other hand, jewelry is also given by parents to their daughters when they get married, or as souvenirs when they get old.', characteristic: '', male: 'Simple. Closed, naked or clothed. The shirt has no sleeves or collar, when worn, it is threaded from the bottom through the collar.', female: 'Includes shirt and skirt. In the past, naked and wearing a skirt. Now, she wears a shirt with a split chest dyed indigo black, decorated with circular silver metal rows at the neck edge and both sides of the shirt. Some items are considered priceless "assets" such as Xan, Ada shirt, Dam scarf. The scarf is woven from fabric with horizontal strips, with tentacles at both ends, about 1 meter long, often colorful, used to wrap many rounds around the head and then hang at the back of the neck.' },
                { material: 'Bark of sui tree, sycamore tree, bamboo tree.', pattern: 'The costumes are still rudimentary because they do not know how to grow cotton and weave fabrics or sew clothes. If you want clothes to wear, you must buy or exchange with the Kinh or Lao people in the area.', other: '', characteristic: '', male: 'In the past, because living conditions were too harsh. So in the summer, men wear loincloths and women wear skirts. When winter comes, people use the bark to dry, then use the bark to make clothes. Now, dress like Kinh people. There are no traditional costumes.', female: 'In the past, because living conditions were too harsh. So in the summer, men wear loincloths and women wear skirts. When winter comes, people use the bark to dry, then use the bark to make clothes. Now, dress like Kinh people. There are no traditional costumes.' },
                { material: 'Use cotton and jute to process it into fabric. Dyeing fabric from brown tubers, ghost tubers, shady plants,...', pattern: 'Among the three main color tones: black, red, yellow, people value indigo as the color of the earth (Abhuyh-Catúc), red as the color of the sun (Abhu-yh-pleeng). These two colors are indispensable in life as well as costumes and are associated with their beliefs as a supernatural power. Decorative patterns follow the principle of horizontal ribbon layout with geometric motifs and beaded patterns: love flower (Ablom), pinwheel shape (Atut), male figure dancing around, image female dada dancer, betel leaf (A ba)...', other: '', characteristic: '', male: 'Put on a loincloth, go naked or wear a pullover with a slit collar. This is a short-sleeved shirt, the body of the shirt has red stripes running along it. In the cold season, wear an indigo cloak decorated with patterns. Wear a towel or wear your hair normally.', female: 'In the past, women only wore a piece of cloth like a bib to cover their breasts, a linen skirt, and a blanket. Now, she wears pullovers with low necklines, short torsos, short sleeves, and short skirts. Women like to wear jewelry. Many people also wear knotted bamboo rings or white forest rope rings (ronok) and some types of bird feathers on their heads.' },
                { material: 'Silk cloth.', pattern: "Men's clothing is light red and indigo. Women's clothing is black, and the skirt is often embroidered with zigzag shapes.", other: '', characteristic: 'Nowadays, people dress in the style of Thai and Kinh people in the region. There are very few traditional costumes left.', male: 'Shirt with two pockets sewn on the bottom of the shirt. In the past, because there were no buttons, the two bodies of the shirt were sewn with strings to tie together; The pants do not have buttons, buttons and elastic bands, but are used with a string to hold them in place when worn.', female: 'The shirt only has long sleeves, but the length of the shirt just touches the waist, no buttons, no buttons, but uses four diagonal strings; Black ankle-length dress; Belts and head wraps are not embroidered with patterns.' },
                { material: 'Cotton fabric, brocade.', pattern: 'The main color is indigo. The pattern is created with red and yellow yarn and white beads forming images of animals, plants, nature and objects.', other: 'There is a custom of wearing agate, a symbol of power, wealth, luxury and status.', characteristic: 'Ethnic personality is not clear and prominent, but there is the interference of many other cultural elements in the costumes.', male: 'Be naked, wear a loincloth, or wear a sleeveless pullover. On cold days or holidays, wrap an X-shaped shawl over your chest.', female: 'Short tube skirts with shirts, or long skirts that cover from the chest down, some places use woven belts.' },
                { material: 'Cotton and hemp fabrics.', pattern: 'Monochrome outfits with few patterns. Main colors are brown, white, black.', other: '', characteristic: '', male: 'Ba Ba style, pants with wide crotch, dyed brown. During Tet holidays, wear a five-piece ao dai, dyed reddish brown, white flared pants with waistbands or drawstring waistbands, and a turban on your head.', female: 'Shirts, skirts, bibs, belts, scarves and jewelry. There are two types of shirts, blouses and long dresses. Five-piece blouse, straight cut, no waist, round neck, front opening, buttoned, long sleeves and tight. During Tet holidays, women wear ao dai. Tubular skirt, slightly flared hem, high waist, can be replaced with a camisole to cover the chest. In addition to skirts, women also wear pants. Young women wear green belts, old people wear yellow belts. Wear a white square scarf. In some places, people wear black scarves.' },
                { material: 'Cotton, hemp, and black indigo brocade fabrics.', pattern: 'Rows of patterns such as red, yellow, and blue woven on an indigo background are connected with yellow tassels. In particular, large and small beads of many different colors, but the dominant color is still blue, are attached to the long tassel of the loincloth or strung into a chain that wraps many times around the forehead, and hips for women.', other: '', characteristic: 'Costumes are mainly bought from Xo Dang and Kinh people. Simple structure, characterized by motifs and decorations.', male: "When naked, wear a blue or black T-shaped loincloth with few patterns. There are two types of loincloths: ordinary loincloths (tanon) and ceremonial loincloths (tanon chua). When it's cold, they often wear a shawl (ra mak) tied in front of their chest. On holidays, wear a loincloth and wear a brocade covering up to your calves (soap).", female: 'Tubular skirt. Depending on the age, the skirt is embroidered with many colorful tassels. Beaded jewelry is considered one of the outstanding features of women. As for the shirt: The young woman wears a silver-white, sleeveless shirt with a pullover and a slit neck. Along the body of the shirt are patterned borders. Young girls or old women wear silver-white bibs, V-shaped, with a string around their neck and a waistband.' },
                { material: 'Fabric.', pattern: "Color combination depends on the wearer's preference.", other: 'According to the development of society, people have changed their habit of wearing traditional costumes with common costumes like Kinh people.', characteristic: 'The clothes our people are wearing, as we see, are completely according to their preferences, not according to any standards. Costumes vary by region.', male: 'Wear loincloths or pants and a shirt with many alternating black and white rings.', female: 'Relaxed shirt, slightly rounded collar, long sleeves reaching the middle of the elbow. Young women wear pullover shirts, young women wear shirts with front slits to make it easier to breastfeed. During Tet holidays, wear ao dai, the top is made into alternating squares. Wearing a skirt, the hem is embroidered with a patterned circle.' },
                { material: 'In the past, people wove clothes using forest bark. Now, practice handicrafts with the guidance of project staff to weave and knit fabric.', pattern: "The patterns on the men's clothes are sinewy, shaped like fences and arrows. Patterns on women's clothes are flowers, plants, agate, beads, arrow shapes, alphabetic characters,...", other: 'The uniqueness of the costume is also shown by the accompanying jewelry such as bird feathers, ivory or metal objects bearing ancient marks. Women believe that the more bracelets they wear, the more men they will admire. Over time and with the development of society, costumes and jewelry have undergone certain changes but have not lost their traditional features.', characteristic: '', male: 'In the past, men wore shirtless clothes and wore loincloths. In the summer, both men and women go shirtless or wear pullovers, short wings, and low-cut necklines. In the cold season, you often wear a soft cloth or a pullover, sleeveless, low-cut shirt. This is a short, straight shirt with an overall almost square shape.', female: 'In the past, women were naked and wore open dresses wrapped around their bodies.' },
                { material: 'Fabric.', pattern: 'The main color is white. No textures.', other: '', characteristic: 'The costumes of the Chu Ru people are a cross between the Co Ho people and the Cham people.', male: 'White ao dai with white pants. During Tet holidays, people wrap their heads in white scarves and wear a large cloth across their bodies.', female: 'The shirt is worn over a cape, the casual version is black, the holiday version is white. Skirts are usually dark blue.' },
                { material: 'When fabric was still difficult to find, people used forest bark to soak off the sap, folded it in half, cut out the neck and sewed the sleeves with rattan strings to make cold-proof clothes.', pattern: 'Dark blue and dark blue fabric background. The main motifs are geometric figures, animals, and familiar objects in daily life.', other: 'The most beautiful dresses that the women weave themselves are reserved for festivals and weddings when the villagers gather happily to the sound of gongs. Whoever has a beautiful dress is a hard-working and talented person, will be noticed by many guys and will have more conditions to choose to "catch a husband".', characteristic: 'In the past, people dressed very simply, everyone was shirtless, men wore loincloths, women wore short skirts. Nowadays, traditional costumes are less widely used in everyday life.', male: 'Wear a loose loincloth, wear a round neck, sleeveless pullover with patterns concentrated on the bottom of the shirt.', female: "Wrap your skirt up to your knees. When it's cold, wear a coat. Later, wear tight shirts and tunics that match the traditional dress." },
                { material: 'Fabric dyed from forest trees.', pattern: 'There are five colors: red, black, yellow, blue, white. On an indigo background, the borders combine with small strips of red yarn patterns and other colorful patterns.', other: '', characteristic: '', male: 'Includes shirt and loincloth. The shirt (Ao êkei) is cut horizontally from the left shoulder to the right shoulder. The collar is rounded and split into a line in front of the chest. The sleeves are quite long with two flaps of unequal length, the back flap is longer than the front flap. Depending on social status and occasions, loincloths have different lengths. People of higher class often have longer fortunes.', female: "Includes shirt and skirt. The shirt (Ao mnie) is similar to the men's shirt but has a boat neck, hugs the body and reaches the waist. The arms can be short or long. The two flaps are of equal length and do not reveal the flaps. A sheet skirt is a cloth wrapped around the waist in many loops and secured together with strings. The skirt is decorated with horizontal stripes on the top edge, bottom edge and middle of the body with colored threads." },
                { material: 'Fabric.', pattern: 'Mainly indigo, red, white with geometric patterns, animal and plant images and human figures (mơ nuih).', other: '', characteristic: 'The costumes are more or less similar to the costumes of the Ede people but have unique features in the styling and decoration style.', male: 'Black pullover shirt, short-sleeved, open armpit, with a patch of red thread for buttons and buttonholes from neck to chest. Below the button strip is a square piece of red fabric sewn in to mark the shirt. Close the size of white striped fabric (Toai). During the Tet holiday, the brothers wear indigo colored loincloths with many brilliant patterns (Toai Kteh). The head wears an indigo scarf, wrapped many times and then hanging over one ear.', female: 'Short, tight-fitting, long-sleeved blouse and indigo skirt with decorative patterns at the hem, chest, shoulders, armpits and sleeves. The skirt is not sewn into a tube, so when worn, it is only rolled around the body so that the area where the two ends meet is forward.' },
                { material: 'Natural dyed fabric: turmeric yellow, tree bark red, indigo bark dark green,...', pattern: 'On the white fabric background are blue, red, and yellow patterns with unique meanings such as geometry, geometric shapes, water waves, human figures, animals, and familiar familiar objects associated with daily life. .', other: "People believe that the color black symbolizes the land to which people are attached all their lives from birth to death. Red symbolizes a person's desire, will to rise, and love. Green is the color of earth, sky, and leaves. Yellow is the color of light, a harmonious combination between humans and nature. There is also the custom of grinding teeth and straining ears.", characteristic: "Have your own personality when it comes to shaping women's shirts, especially your aesthetic style.", male: 'Wear a loincloth, wear an open shirt, the back hem is longer than the front hem. There are long loincloths, short ones, some simple ones with just a dark indigo color and two simple patterns along the edge, some have beads and long tassels attached to both ends of the loincloth.', female: 'Close-fitting shirt, rectangular shape, no slit, low round collar. The front and back halves of the shirt are decorated with red and blue patterns in a strip layout across the body. Wear an open dress that goes above your calves.' },
                { material: 'In the past, people used tree bark clothes to protect against the cold. Later, the people used wild cotton (blang) to create fabrics of many different colors, but the shirt design still followed the old shape, thus preserving the traditional cultural identity in the outfit.', pattern: '', other: "The main traditional brocade colors are black, red, yellow, purple, white, blue... Men's flower loincloths are decorated with silver or copper flowers or five-colored beads. The chest of the women's shirt is braided with a red thread, believed to be an eagle's wings.", characteristic: '', male: "Loincloth and wrapped cloak (r'hap). There are three types of loincloth: white loincloth, black loincloth and flower loincloth. As for white loincloths, there are two types: loincloths woven with bark fibers and loincloths woven with white thread; This loincloth is only one or two waist lengths, and is the clothing of the poor. The black dress is three to five waist long, and is the costume of ordinary people.", female: 'Once I was naked, now I wear clothes. The lower body is wrapped in a skirt. There are three types of skirts: skirts woven from bark fibers (nah djăr), skirts woven from cotton threads (nah rnô) and woven skirts with embroidered patterns (nah nrang), worn from the navel down to below the knees. To keep the skirt tight, the back of the skirt is tied with a belt made of string or copper wire.' },
                { material: 'Clothes woven from self-grown cotton. Later, I bought industrial fabric for sewing.', pattern: "Drying usually uses the pure white color of rustic fabric. The hem of the women's shirt has a red decorative ribbon and geometric patterns.", other: '', characteristic: '', male: 'Bare and dressed in a pure white loincloth, the front hem hangs nearly to the knees, the back hem is nearly to the shins.', female: "Shirts and wrap skirts are shin-length or knee-length, with decorative hems. When it's cold, cover yourself with a blanket or piece of cloth." },
                { material: 'Cotton fabric.', pattern: "On the right side of the women's shawl is decorated with a diamond-shaped pattern alternating with black, white, and red strips.", other: "When Xo Dang girls reach adulthood, they often wear a cloak around their bodies as a sign to let the boys know that they have not yet built a family so they can talk and get to know each other. When returning to her husband's house, the daughter brings the shawl with her and keeps it as a precious souvenir of her girlhood.", characteristic: '', male: 'Naked, wearing a loincloth with both ends hanging down to near the ankles. During Tet holidays, brothers often wrap a piece of cloth diagonally across their chest.', female: 'Shirt, skirt, shawl (shoulder scarf). The shirt is a pullover style, sleeveless. The cape is two pieces of fabric put together in many colors.' },
                { material: 'Cotton for processing into fabric. Use honey to make wax to lubricate fabric fibers. Dyeing fabrics with plants: Ktrong cu Kxan tubers,...', pattern: "Use 3 main color tones: yellow, red, black. The body of the men's shirt has horizontal red stripes and a white hem. The back of the shirt is embroidered with plants, and the hem is decorated with chrysanthemums. Women's shirts and skirts are decorated according to the principle of horizontal ribbon layout. The belt is woven with embroidered patterns and fabric tassels at both ends.", other: 'Three colors yellow, red and black. Red symbolizes strength and love. White symbolizes aspirations and dreams. Black symbolizes power and strength of the mountains and forests, of nature. Among the colors, the Ba Na people value black the most and worship it as a supernatural power.', characteristic: '', male: 'Pullover; T-shaped neckline; The head is covered with a scarf in the style of an ax head.', female: 'Square neck pullover shirt, short body, sleeved or sleeveless with open black skirt. The shirt, skirt, and belt are all woven and embroidered with patterns. The belt is tied and hangs long at both ends to the sides of the skirt. Around his belly he also wore copper rings and a smoking pipe attached to it.' },
                { material: 'Dyed fabric woven from cotton.', pattern: "The skirt's background is indigo and black, with horizontal striped patterns combining the three colors red, white and yellow.", other: "On occasions when the house has guests, the man's coat becomes a blanket, showing the homeowner's hospitality.", characteristic: '', male: 'Naked, wearing a loincloth. Loincloths are narrow and long. The body and edges are bordered and decorated with patterns at both ends. During Tet holidays, bring a large shawl to cover your body.', female: 'The long skirt is high and close to the armpit, the tube is relatively long and wide. The top of the dress, the middle of the body and the hem of the dress are decorated with patterned stripes. This style of wearing both a skirt and a shirt is a very distinct characteristic of Gie Trieng sisters. Leave your hair long, wrap it behind your neck and beautify it with a variety of jewelry.' },
                { material: 'Brocade fabric.', pattern: 'The main colors are black, white, red, in which black is the main background. People believe that black is a discreet, gentle and strong color. With the edges of clothes made of red thread or fabric, combined with white or red beads, creating unique patterns and rich national identity.', other: '', characteristic: '', male: 'Put on a loincloth or wear three-piece clothes. There are two types of loincloths: for young and middle-aged people (Hpen dham); for older, well-off men (Hpen vroang). The three-piece set includes a round neck shirt, long sleeves, two front pockets, slightly split sides and ankle-length pants, no pockets.', female: 'Includes brocade shirt and skirt or fabric skirt. There are three types of fabric skirts: one-layer skirt, below the knee length (Ca tu li); two-layer skirt, one layer below the knee, one layer reaching the ankles (Ca tui moiq li, moiq hchon); skirt with two equal layers, ankle length, (Ca tuu hjup).' },
                { material: 'Skirts and loincloths were woven from cotton or made from tree bark. The fabric is naturally dyed.', pattern: 'Main colors are purple, red, black, white. Depending on each product, the weaver arranges appropriate colors. Patterns are usually antler heads, borders, nails, owl eyes,...', other: '', characteristic: '', male: "In the past, people were all topless and men wore loincloths. The shirt is a tie-up pullover. When it's cold, put on a shawl outside. Now I dress like the Kinh people.", female: "In the past, people were all topless and women wore skirts. The shirt is a tie-up pullover. When it's cold, put on a shawl outside. Now dressing like the Kinh people, the Cho Ro people can only be easily recognized by their habit of often carrying baskets and by their preference for wearing copper, silver bracelets, and beaded jewelry." },
                { material: 'Cotton fabric, brocade.', pattern: 'Rich colors. Pattern with 4 horizontal patches, in the middle is a zigzag motif, a galaxy, and a stylized strawberry flower. The outermost border is yellow, white, and red threads.', other: 'People believe that the bigger the ear, the more beautiful it is. Ivory earrings are not only jewelry for women, but they are also valuable items when exchanged.', characteristic: '', male: 'Naked, wearing a loincloth. During Tet holidays, people wear a short pullover and wrap a blanket over it.', female: 'Wrap the Ka nan skirt high on the chest to form a tube shape, with tassels at both ends, and bare shoulders.' },
                { material: 'Silk, silk.', pattern: 'Main colors are yellow and orange. Colorful patterns and beads and sequins are used a lot.', other: '', characteristic: 'Traditional costumes have their personality in wearing skirts. Costume style associated with Buddhist beliefs.', male: 'Short shirt, stiff collar, chest slit, buttoned in the middle with sarong (a large piece of brocade, when worn, rolled up to cover the lower half of the body).', female: 'Tam Vong shirt (round neck shirt) is harmoniously combined with a sarong or Sampot (a silk, tubular skirt) along with a Sbay scarf wrapped diagonally from the left shoulder to the right side.' },
                { material: 'Industrial fabric.', pattern: "Costumes are often monochrome or have patterns with many colors: navy blue, jet black. Women's clothes are usually pink or red, along with bold colors.", other: 'The so-called traditional costumes of the Chinese people are now only seen on some elderly people or in wedding and funeral ceremonies. The daily clothes of young people are completely no different from those of the Kinh people.', characteristic: '', male: 'Black or dark blue shirt, buttoned on one side, stand-up collar, slit or four-piece style, split in the middle, stand-up collar, with pockets (xà ug). Wear pants that are a little longer than the knee, wide legged, and tied with a drawstring. And a bandana, sometimes a cotton scarf draped over the shoulders or wrapped around the belly.', female: 'The shirt is short, the collar is slightly high, the sleeves are longer than the elbow, the button is pulled from the neck down to the right side. Narrow, ankle-length pants. During Tet holidays, women wear shirts with high necklines, buttoned on one side, high slits or ao dai, fitted around the waist, slit below the thighs (cheongsam, called cheongsam by the Chinese people). Likes to wear jewelry, especially bracelets, earrings, necklaces...' },
                { material: 'Self-woven fabric.', pattern: 'The main theme is always bright red and golden yellow with diverse geometric patterns.', other: '', characteristic: 'There are different local groups with their own styles and decorations that are difficult to confuse with ethnic groups within a linguistic group or region.', male: 'The shirt has diagonal wings and straps on the side, usually a white shirt. Inside is striped pants, outside is a skirt. Older men often have long hair and wear white scarves with embroidered patterns on the edges and ends of the scarf as well as the tassels.', female: 'Ao dai, skirt, diagonal belt (talei kabak), horizontal belt (talei ka-in), head scarf. The ao dai is sewn tightly, without slits, the collar is cut wide in an oval shape, and the opening below the knee is sewn to fit one foot. White (for young women) or black (for young women and older women) dresses. Nowadays, there is a stylization of colors, so skirts and shirts are often sewn in the same color but slightly different in density to help the outfit harmonize.' }
            ]
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
    background-image: radial-gradient(circle at 16.3021% 100%, rgba(229, 112, 34, 70%) 0%, rgba(229, 112, 34, 0%) 35%),
        radial-gradient(circle at 75.4264% 74.1960%, #F6CCB0 0%, rgba(246, 204, 176, 0%) 40%),
        radial-gradient(circle at 14.1699% 17.4837%, #F6CCB0 0%, rgba(246, 204, 176, 0%) 70%),
        radial-gradient(circle at 79.4987% 0%, rgba(229, 112, 34, 72%) 0%, rgba(229, 112, 34, 0%) 70%),
        radial-gradient(circle at 48.9014% 49.5215%, #FFF 0%, rgba(255, 255, 255, 0%) 100%);
    width: 100vw;
    height: 91vh;
}

.comment {
    width: 70vw;
    margin: 0px 0px 14px calc((100% - 750px) * 0.5);
    padding: 10px;
    background-color: #f9fafb;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 10%), 0 2px 6px 2px rgba(60, 64, 67, 15%);
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
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 10%), 0 2px 6px 2px rgba(60, 64, 67, 15%);
}

.comment__text:focus {
    outline: none;
}

.comment-list {
    height: 15vh;
    padding: 20px;
}

.button__buy {
    position: absolute;
    right: 0;
    top: 16px;
}

/**
* css chung cho khung left-bar, right-bar
*/
.left-bar,
.right-bar {
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
    font-size: 13px;
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

.content-logo__btn,
.content-logo__img {
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

.box-infor {
    display: flex;
}

.box-infor__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.box-infor__name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
}

.box-comment__question {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 10%), 0 2px 6px 2px rgba(60, 64, 67, 15%);
    width: calc(100% - 25px);
    margin-left: auto;
    padding: 10px;
    border-radius: 13px;
    position: relative;
}

.comment-button {
    position: absolute;
    visibility: hidden;
    display: flex;
    align-items: center;
    background-color: #444;
    border-radius: 5px;
    right: 20px;
    top: -10px;
}

.box-comment__question:hover .comment-button {
    visibility: visible;
}

h2 {
    padding: 0;
    color: rgb(99, 99, 99);
    font-size: 40px;
}
</style>