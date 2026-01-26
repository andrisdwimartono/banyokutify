<template>
  <v-snackbar
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    location="top center"
    class="ios-snackbar"
  >
    <div class="ios-card">
      <!-- TITLE -->
      <div class="ios-title">
        {{ snackbar.title || 'Notice' }}
      </div>

      <!-- MESSAGE -->
      <div class="ios-message">
        {{ snackbar.message }}
      </div>

      <!-- DIVIDER -->
      <div class="ios-divider" />

      <!-- ACTION -->
      <button class="ios-button" @click="snackbar.visible = false">
        OK
      </button>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar.store'
const snackbar = useSnackbarStore()
</script>

<style scoped>
.ios-snackbar {
  backdrop-filter: blur(1px);
  border-radius: 4px;
  animation: ios-slide 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  padding-top: 5%;
}
/* Wrapper (remove material look) */
.ios-snackbar :deep(.v-snackbar__wrapper) {
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.ios-snackbar.v-snackbar--active .ios-card {
  transform: scale(1);
  transition: transform 0.25s ease;
}

/* Card */
.ios-card {
  transform: scale(0.98);
  min-width: 280px;
  max-width: 340px;


  /* NOT pure white */
  background: rgba(246, 246, 248, 0.92);


  backdrop-filter: blur(16px);
  border-radius: 14px;
  text-align: center;
  overflow: hidden;


  /* 👇 key parts */
  border: 1px solid rgba(0, 0, 0, 0.08);


  box-shadow:
  0 12px 30px rgba(0, 0, 0, 0.15),
  0 4px 8px rgba(0, 0, 0, 0.08);


  animation: ios-fade-slide 0.35s ease-out;
}

/* Title */
.ios-title {
  padding: 14px 16px 4px;
  font-weight: 600;
  font-size: 16px;
  color: #111;
}

/* Message */
.ios-message {
  padding: 0 16px 14px;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}

/* Divider */
.ios-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
}

/* Button */
.ios-button {
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #007aff; /* iOS blue */
  cursor: pointer;
}

.ios-button:active {
  background: rgba(0, 0, 0, 0.05);
}

.v-theme--dark .ios-card {
  background: rgba(30, 30, 30, 0.9);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);

  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.5);
}

.v-theme--dark .ios-title {
  color: rgba(255, 255, 255, 0.8);
}

.v-theme--dark .ios-message {
  color: rgba(255, 255, 255, 0.8);
}

.v-theme--dark .ios-divider {
  background: rgba(255, 255, 255, 0.15);
}

/* mobile */
@media (max-width: 600px) {
  .ios-snackbar {
    padding-top: 50%;
  }
}

/* Animation */
@keyframes ios-fade-slide {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>