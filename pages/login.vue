<template>
    <div>
        <Form :type="login"></Form>
    </div>
</template>
<script>

import Form from '@/components/Form.vue'
    export default {
        components: {
            Form,
        },

        data() {
            return {
                login: "login",
            }
        },
    }
</script>