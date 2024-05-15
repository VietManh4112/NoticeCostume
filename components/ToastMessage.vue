<template>
  <div class="toastMessage">
    <div v-show="type === 'createOrder'">
      <div class="message">Bạn đã đặt hàng thành công</div>
      <Button type="nav" @click="closeToast">Ok</Button>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button.vue'
export default {
  name: 'ToastMessage',
  components: {
    Button,
  },
  props: {
    type: String,
  },
  methods: {
    closeToast(){
        this.$emit('hide-toast', false);
    }
  }
}
</script>
