<template>
    <div class="edit">
        <p><b>{{ title }}</b> 
            <span v-if="!isEditing">{{ displayValue }}</span>
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
import axiosInstance from '@/helper/api.js'
export default {
    name: "TextEdit",

    props: {
        title: String,
        role: String,
        material: String,
        pattern: String,
        other: String,
        characteristic: String,
        male: String,
        female: String,
        apiUrl: String,
        id: Number,
        sexId: Number,
    },

    computed: {
        displayValue() {
            if (this.role !== undefined) {
                return this.role;
            } else if (this.material !== undefined) {
                return this.material;
            } else if (this.pattern !== undefined) {
                return this.pattern;
            } else if (this.other !== undefined) {
                return this.other;
            } else if (this.characteristic !== undefined) {
                return this.characteristic;
            } else if (this.male !== undefined) {
                return this.male;
            } else if (this.female !== undefined) {
                return this.female;
            }
        }
    },

    created() {
        this.editText = this.displayValue;
        const newInfo = {...this.infocostume}
        const newDes = {...this.description}
        newInfo.id = this.id;
        newDes.sexId = this.sexId;
        if (this.material !== undefined) {
            newInfo.material = this.material;
        }
        if (this.pattern !== undefined) {
            newInfo.pattern = this.pattern;
        }
        if (this.other !== undefined) {
            newInfo.other = this.other;
        }
        if (this.characteristic !== undefined) {
            newInfo.characteristic = this.characteristic;
        }
        if (this.male !== undefined) {
            newDes.description = this.male;
        } else if (this.female !== undefined) {
            newDes.description = this.female;
        }
        this.updateCostume.push(newInfo);
        this.updateDescription.push(newDes);
    },

    methods: {
        editInfo() {
            if (!this.isEditing) {
                this.isEditing = true;
                this.$nextTick(() => {
                    this.$refs.textInput.focus();
                });

                this.editingItem = {
                    displayValue: this.displayValue,
                };
            }
        },

        cancel() {
            this.isEditing = false;
        },

        updateInfo(propName) {
            if (this[propName] !== undefined) {
                this.updateCostume.forEach(info => {
                    info[propName] = this.editText;
                });
            }
        },

        async save() {
            if (!this.editingItem) return;
            this.isEditing = false;            
            try {
                if (this.material !== undefined || this.pattern !== undefined || this.characteristic !== undefined ||this.other !== undefined) {
                    this.updateInfo("material");
                    this.updateInfo("pattern");
                    this.updateInfo("characteristic");
                    this.updateInfo("other");
                    axiosInstance.post(this.apiUrl, this.updateCostume[0]);
                } else {
                    if (this.male !== undefined) {
                        this.updateDescription.forEach(info => {
                            info.description = this.editText;
                        });
                    }
                    if (this.female !== undefined) {
                        this.updateDescription.forEach(info => {
                            info.description = this.editText;
                        });
                    }
                    axiosInstance.post(this.apiUrl, this.updateDescription[0])
                }
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
            infocostume: {
                id: '',
                material: '',
                pattern: '',
                other: '',
                characteristic: '',
            },
            description: {
                sexId: '',
                description: '',
            },
            updateCostume : [],
            updateDescription: [],
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