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
              <Modal v-if="hideModalBuy" type="modal-buy" @hide-modal="handleHideModalBuy"></Modal>
              <div v-for="(item, index) in items" :key="index" class="content-text">
                  <div v-for="(info, indexinfo) in info" :key="indexinfo">
                      <template v-if="index === count - 1">
                          <div class="edit"><b>
                                  <p style="margin-right: 4px;">{{ dynamicTexts.text1 }}</p>
                              </b>
                              <p style="margin-left: 0;">{{ item.role }}</p>
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
                              :sexId="1" :id="count"></TextEdit>
                          <TextEdit :title="dynamicTexts.text8" :female="info.female"
                              :apiUrl="`/api/edit-description`" :sexId="2" :id="count"></TextEdit>
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
          <h2>Bình luận</h2>
          <div class="comment-textarea">
              <textarea placeholder="Để lại bình luận của bạn tại đây." class="comment__text" v-model="commentText"></textarea>
              <Button @click="addComment" type="nav">Gửi</Button>
          </div>
          <hr style="border: none; height: 2px; background-color: #f5f5f5;">
          <div v-for="(comment, indexCmt) in comment" :key="indexCmt" class="comment-list">
              <div class="box-infor">
                  <div class="box-infor__avatar">
                      <span>M</span>
                  </div>
                  <p class="box-infor__name">Mạnh</p>
              </div>
              <div class="box-comment">
                  <div class="box-comment__question">
                      <p v-if="!editStatus[indexCmt]">{{ comment.content }}</p>
                      <span v-else> 
                          <textarea v-model="editText[indexCmt]" style="width: 60vw; height: 30px;"></textarea>
                          <div style="color: red; font-size: 10px;">
                              nhấn esc để 
                              <button style="color: #06F;" @click="cancelEdit(indexCmt)">hủy</button>  
                              • nhấn enter để
                              <button style="color: #06F;" @click="saveEdit(indexCmt)">lưu</button> 
                          </div>
                      </span>
                      <div class="comment-button">
                          <button title="Chỉnh sửa" style="color: rgba(248, 248, 255, 80%); width: 30px; height: 30px;" @click="toggleEdit(indexCmt)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                  aria-hidden="true" fill="none">
                                  <path fill="currentColor"
                                      d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"
                                      class></path>
                              </svg>
                          </button>

                          <button title="Xóa" style="color: red; width: 30px; height: 30px;" @click="deleteComment(indexCmt)">
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
</template>

<script>
import Resource from '@/helper/resource.js'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import EthnicStore from "@/store/ethnic"
import axiosInstance, {setBearerToken} from '@/helper/api.js'
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
  },

  watch: {
      count(newValue, oldValue) {
          this.loadData(newValue);
          this.loadComments(newValue);
          this.costumeId = newValue;
      }
  },

  methods: {
      /**
       * Author: NVManh(26/02/2024)
       * Chuyển hướng tới trang tiếp theo
       */
      gotoNextPage() {
          const nextPageIndex = this.count + 1;
          const nextPage = this.items[nextPageIndex - 1].role;
          const nextPageEncoded = encodeURIComponent(nextPage);
          this.$router.push(`/ethnic/${nextPageEncoded}`);
      },

      /**
       * Author: NVManh(26/02/2024)
       * Chuyển hướng tới trang trước đó
       */
      gotoPreviousPage() {
          const previousPageIndex = this.count - 1;
          const previousPage = this.items[previousPageIndex - 1].role;
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
          this.hideModalBuy = true;
      },

      handleHideModalBuy(value) {
          this.hideModalBuy = value;
      },

      async loadData(id) {
          axiosInstance.get('/api/get-costumes/' + id)
              .then(response => {
                  const newItem = { ...this.ethnic }
                  newItem.material = response.data.material
                  newItem.pattern = response.data.pattern
                  newItem.other = response.data.other
                  newItem.characteristic = response.data.characteristic
                  newItem.male = response.data.listCostumesDetail[0].description
                  newItem.female = response.data.listCostumesDetail[1].description
                  this.info.push(newItem)
              })
              .catch(error => {
                  throw new Error(error);
              })
      },

      async loadComments(id) {
          axiosInstance.post('/api/get-comments', { costumeId: id })
              .then(response => {
                  console.log(response.data)
                  response.data.forEach(item => {
                      const newItem = { ...this.comments }
                      newItem.content = item.content
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
              "id": '',
              "costumeId": this.costumeId,
              "userId": ''
          };
          const token = localStorage.getItem("token");
          setBearerToken(token);
          axiosInstance.delete('/api/post-comments', deleteComment)
              .then(response => {
                  window.location.reload();
              }
              ).catch(error => {
                  console.error(error);
              });
          console.log(this.comment[index].content);
      },

      cancelEdit(index) {
          this.$set(this.editStatus, index, false);
      },

      saveEdit(index) {
          const updateComment = {
              "id": '',
              "content": this.editText[index],
              "costumeId": this.costumeId
          };
          const token = localStorage.getItem("token");
          setBearerToken(token);
          axiosInstance.post('/api/update-comments', deleteComment)
              .then(response => {
                  window.location.reload();
              }
              ).catch(error => {
                  console.error(error);
              });
          this.$set(this.editStatus, index, false);
      },

      async addComment() {
          const addComment = {
              "content": this.commentText,
              "costumeId": this.costumeId
          };
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
          ethnics: {
              role: '',
              material: '',
              pattern: '',
              other: '',
              characteristic: '',
              male: '',
              female: '',
          },
          comments: {
              avatar: '',
              name: '',
              content: '',
          },
          costumeId: 0,
          commentText: '',
          comment: [],
          items: [],
          info: [],
          isDataFetched: false,
          editStatus: [],
          editText: []
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
  margin-top: 3vh;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-weight: 900;
  background-color: aqua;
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
</style>