<template>
  <div>
    <div class="toast">
      <div class="toast-creat-order success" v-if="type === 'toastSuccess'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          class="svg-success"
        >
          <path
            fill="#FFF"
            d="M19.5 8.08a1 1 0 0 0-1.42 0l-6.93 6.93-2.12-2.12a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 1.42 0l7.5-7.5a1 1 0 0 0 0-1.42z"
          />
        </svg>
        <p class="toast-description">{{ messageSuccess }}</p>
      </div>
      <div class="toast-creat-order fail" v-if="type === 'toastFail'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          class="svg-error"
        >
          <path
            fill="#FFF"
            d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1 13h-2v-2h2zm0-4h-2v-6h2z"
          />
        </svg>
        <p class="toast-description">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Toast',
  props: {
    type: String,
    message: String,
    messageSuccess: String,
  },
}
</script>
<style>
.toast-creat-order {
  display: flex;
  text-align: center;
  justify-items: center;
  width: 400px;
  height: 40px;
  border-radius: 1px;
  line-height: 40px;
  position: absolute;
  right: -300px;
  top: 580px;
  animation: toast-slide-in 1s forwards;
}

@keyframes toast-slide-in {
  0% {
    right: -300px;
  }
  100% {
    right: 0px;
  }
}
.toast-description {
  text-align: center;
  color: #fff;
}
.success {
  background: #6fec61;
}
.fail {
  background: #f44336;
  color: #e82d1f;
  top: 530px;
}
.svg-success {
  transform: scale(1.5);
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
}
.svg-error {
  transform: scale(1.5);
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
}
</style>
