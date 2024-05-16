<template>
    <div class="repository">
        <div class="leftbar">
            <div class="leftbar__title">
                <h1 v-if="!isEnglish">Nhà kho tổng hợp</h1>
                <h1 v-else>General warehouse</h1>
            </div>
            <div class="leftbar__text">
                <p v-if="!isEnglish">Nếu bạn cần tiếp cận các thông tin của dự án một cách nhanh chóng mà không cần quan
                    tâm đến hình thức
                    trình bày, thì đây là nơi dành cho bạn. </p>
                <p v-else>If you need to access project information quickly without worrying about presentation format,
                    this is the place for you.</p>
            </div>
        </div>

        <div class="content">
            <div>
                <h1>
                    <span>1&nbsp;</span>.&nbsp;
                    <span v-if="!isEnglish">Danh sách 54 dân tộc</span>
                    <span v-else>List of 54 ethnic groups</span>
                </h1>
                <div style="display: flex; flex-wrap: wrap;">
                    <div v-for="(item, index) in ethnics" :key="index" style="display: flex;">
                        <nuxt-link
                            :to="'/ethnic/' + item.role.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()"
                            style="display: flex;  color: inherit;">
                            <p>{{ index + 1 }}</p>.<p>{{ item.role }}</p>
                        </nuxt-link>
                        <template v-if="index !== ethnics.length - 1">&nbsp;|&nbsp;</template>
                    </div>
                </div>
            </div>

            <div>
                <h1>
                    <span>2&nbsp;</span>.&nbsp;
                    <span v-if="!isEnglish">Thông tin về các dân tộc</span>
                    <span v-else>Information about ethnic groups</span>
                </h1>
                <div style="display: flex;">
                    <p v-if="!isEnglish">Thông tin tổng hợp: &nbsp;</p>
                    <p v-else>General information: &nbsp;</p>
                    <a href="https://docs.google.com/spreadsheets/d/1K3vMSu37P1ZBp7-p2H5-_qssWIU0_b6i/edit#gid=649320117"
                        target="_blank" style="color: inherit;">Link</a>
                </div>
            </div>

            <div>
                <h1>
                    <span>3&nbsp;</span>.&nbsp;
                    <span v-if="!isEnglish">Nguồn tài liệu chủ đạo</span>
                    <span v-else>Main source of documents</span>
                </h1>
                <div>
                    <div style="display: flex;">
                        1.&nbsp;
                        <p v-if="!isEnglish">Hình ảnh trang phục truyền thống 54 dân tộc, <a
                                href="https://www.facebook.com/dongbaovietphuc" target="_blank"
                                style="color: inherit;">Đồng Bào Việt Phục</a></p>
                        <p v-else>Images of traditional costumes of 54 ethnic groups,<a
                                href="https://www.facebook.com/dongbaovietphuc" target="_blank"
                                style="color: inherit;">Đồng Bào Việt Phục</a></p>
                    </div>
                    <div style="display: flex;">
                        2.&nbsp;
                        <p v-if="!isEnglish">Thông tin trang phục truyền thống 54 dân tộc, <a
                                href="https://www.facebook.com/100044511276269/posts/2947272475546524/" target="_blank"
                                style="color: inherit;">Đồng Bào Việt Phục</a></p>
                        <p v-else>Information on traditional costumes of 54 ethnic groups, <a
                                href="https://www.facebook.com/100044511276269/posts/2947272475546524/" target="_blank"
                                style="color: inherit;">Đồng Bào Việt Phục</a></p>
                    </div>
                    <div style="display: flex;">
                        3.&nbsp;
                        <p v-if="!isEnglish">Hình ảnh avatar 54 dân tộc, <a href="https://www.instagram.com/nhoto.vietnam/"
                            target="_blank" style="color: inherit;">Nhỏ to Việt Nam</a></p>
                        <p v-else>Avatar images of 54 ethnic groups, <a href="https://www.instagram.com/nhoto.vietnam/"
                            target="_blank" style="color: inherit;">Nhỏ to Việt Nam</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EthnicStore from "@/store/ethnic";

export default {
    name: "Repository",

    mounted() {
        EthnicStore.get('/api/get-ethnics')
            .then(response => {
                response.data.forEach(item => {
                    const newItem = { ...this.ethnic }
                    newItem.role = item.name
                    this.ethnics.push(newItem)
                })
            }
            ).catch(error => {
                console.error(error);
            });
    },

    computed: {
        isEnglish() {
            return this.$store.state.isEnglish;
        },
    },

    data() {
        return {
            ethnic: {
                imageUrl: '',
                role: '',
                index: ''
            },
            ethnics: [],
        }
    }
}
</script>

<style>
.repository {
    display: flex;
}

.repository .leftbar {
    width: 38vw;
}

.repository .leftbar__title {
    padding-left: 109px;
    padding-bottom: 30px;
    font-size: 36px;
    color: rgb(99, 99, 99);
    line-height: normal;
}

.repository .leftbar__text {
    padding-left: 109px;
}

.repository .content {
    flex: 1;
    padding-top: 30px;
    padding-left: 110px;
}

.repository .content h1 {
    font-size: 26px;
    margin-bottom: 10px;
}
</style>