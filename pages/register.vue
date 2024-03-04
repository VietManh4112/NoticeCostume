<template>
    <div>
        <Form :type="register"></Form>
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
                register: "register",
            }
        },
    }
</script>