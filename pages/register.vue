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
<style>
@import url('https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap');
</style>