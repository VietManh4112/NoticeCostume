<template>
    <div class="edit">
        <p><b>{{ title }}</b> 
            <span v-if="!isEditing">{{ text }}</span>
            <span v-else> 
                <textarea v-model="editText" ref="textInput"></textarea>
                <div style="color: red; font-size: 10px;">
                    nhấn esc để 
                    <button style="color: #06F;" @click="cancel">hủy</button>  
                    • nhấn enter để
                    <button style="color: #06F;" @click="save">lưu</button> 
                </div>
            </span>
        </p>
        
        <div class="button__edit">
            <button title="Chỉnh sửa" @click="editInfo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
                    fill="none">
                    <path fill="currentColor"
                        d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"
                        class></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import EthnicStore from "@/store/ethnic";
export default {
    name: "TextEdit",

    props: {
        title: String,
        text: String,
        apiUrl: String,
    },

    methods: {
        editInfo() {
            if (!this.isEditing) {
                this.isEditing = true;
                this.$nextTick(() => {
                    this.$refs.textInput.focus();
                });

                this.editingItem = {
                    text: this.text,
                };
            }
        },

        cancel() {
            this.isEditing = false;
        },

        async save() {
            if (!this.editingItem) return;
            this.isEditing = false;            
            try {
                const response = await EthnicStore.post(this.apiUrl, { name: this.editText });
                console.log(response.data);
            } catch (error) {
                console.error('Error saving data:', error);
            }
        },

        handleKeyPress(event) {
            if (event.key === 'Escape') {
                this.cancel();
            } else if (event.key === 'Enter') {
                this.save();
            }
        }
    },

    mounted() {
        document.addEventListener('keydown', this.handleKeyPress);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeyPress);
    },

    data() {
        return {
            isEditing: false,
            editText: this.text,
            editingItem: null,
        }
    },
}
</script>

<style>
.edit {
    display: flex;
}

.button__edit {
    display: flex;
    justify-content: center;
    visibility: hidden;
}

.edit:hover .button__edit {
    visibility: visible;
}

textarea {
    width: 41vw;
    background-color: #fff;
}

</style>