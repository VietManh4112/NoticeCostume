<template>
    <div style="display: flex;">
        <div class="leftbar">
            <div class="leftbar__title">
                <h1>Nhà kho tổng hợp</h1>
            </div>
            <div class="leftbar__text">
                <p>Nếu bạn cần tiếp cận các thông tin của dự án một cách nhanh chóng mà không cần quan tâm đến hình thức
                    trình bày, thì đây là nơi dành cho bạn. </p>
            </div>
        </div>

        <div class="content">
            <div>
                <h1>
                    <span>1&nbsp;</span>.&nbsp;<span>Danh sách 54 dân tộc</span>
                </h1>
                <div style="display: flex; flex-wrap: wrap;" >
                    <div v-for="(item, index) in ethnics" :key="index"  style="display: flex;">
                        <nuxt-link :to="'/ethnic/' + item.role.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()"  style="display: flex;  color: inherit;">
                            <p>{{ index + 1 }}</p>.<p>{{ item.role }}</p>
                        </nuxt-link>
                        <template v-if="index !== ethnics.length - 1">&nbsp;|&nbsp;</template>
                    </div>
                </div>
            </div>

            <div>
                <h1>
                    <span>2&nbsp;</span>.&nbsp;<span>Thông tin về các dân tộc</span>
                </h1>
                <div style="display: flex;">
                    <p>Thông tin tổng hợp: &nbsp;</p><a href="https://docs.google.com/spreadsheets/d/1K3vMSu37P1ZBp7-p2H5-_qssWIU0_b6i/edit#gid=649320117" target="_blank" style="color: inherit;">Link</a>
                </div>
            </div>

            <div>
                <h1>
                    <span>3&nbsp;</span>.&nbsp;<span>Nguồn tài liệu chủ đạo</span>
                </h1>
                <div> 
                    <p>1.&nbsp;Hình ảnh trang phục truyền thống 54 dân tộc, <a href="https://www.facebook.com/dongbaovietphuc" target="_blank" style="color: inherit;">Đồng Bào Việt Phục</a></p>
                    <p>2.&nbsp;Thông tin trang phục truyền thống 54 dân tộc, <a href="https://www.facebook.com/100044511276269/posts/2947272475546524/" target="_blank" style="color: inherit;">Đồng Bào Việt Phục</a></p>
                    <p>3.&nbsp;Hình ảnh avatar 54 dân tộc, <a href="https://www.instagram.com/nhoto.vietnam/" target="_blank" style="color: inherit;">Nhỏ to Việt Nam</a></p>
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
.leftbar {
    width: 38vw;
}

.leftbar__title {
    padding-left: 109px;
    padding-bottom: 30px;
    font-size: 36px;
    color: rgb(99, 99, 99);
    line-height: normal;
}

.leftbar__text {
    padding-left: 109px;
}

.content {
    flex: 1;
    padding-top: 30px;
    padding-left: 110px;
}

.content h1 {
    font-size: 26px;
    margin-bottom: 10px;
}
</style>