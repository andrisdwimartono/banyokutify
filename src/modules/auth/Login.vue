<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-card
      elevation="8"
      max-width="420"
      width="100%"
      class="pa-6"
    >
      <v-img
        src="/favicon.ico"
        max-width="50"
        class="mx-auto mb-4"
      />

      <!-- Title -->
      <v-card-title class="text-h5 font-weight-bold text-center mb-2">
        Sign In
      </v-card-title>

      <v-card-subtitle class="text-center mb-6">
        Trading Management System
      </v-card-subtitle>

      <v-alert
        v-if="errorShow"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        Invalid email or password
      </v-alert>

      <!-- Form -->
      <v-form ref="formRef" @submit.prevent="onSubmit">
        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          :rules="emailRules"
          required
        />

        <v-text-field
          v-model="form.password"
          label="Password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          :rules="passwordRules"
          required
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />

        <v-btn
          block
          color="primary"
          size="large"
          class="mt-4"
          type="submit"
          :loading="loading"
        >
          Login
        </v-btn>

        <div class="d-flex justify-end">
          <v-btn
            variant="text"
            class="text-decoration-none text-caption"
            to="/forgot-password"
          >
            Forgot Password?
          </v-btn>
        </div>
      </v-form>

      <!-- Or login using -->
      <div class="text-center mt-4">
        Or login using
      </div>
      
      <!-- google and facebook icon circle, not full width -->
      <v-btn
        block
        color="google"
        size="large"
        class="mt-4"
        :loading="loading"
        variant="outlined"
      >
        <v-icon end icon="mdi-google" />
      </v-btn>
      <v-btn
        block
        color="facebook"
        size="large"
        class="mt-4"
        :loading="loading"
        variant="outlined"
      >
        <v-icon end icon="mdi-facebook" />
      </v-btn>

      <!-- Footer -->
      <div class="text-center mt-4 text-caption text-medium-emphasis">
        © {{ new Date().getFullYear() }} BANYOKU
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authApi } from '@/services/api/auth.api'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

const loading = ref(false)
const formRef = ref()
let errorShow = ref(false)
const showPassword = ref(false)

const form = ref({
  email: 'martono@gmail.com',
  password: 'password'
})

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Minimum 6 characters'
]

async function onSubmit() {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  loading.value = true

  try {
    const auth = useAuthStore()

    const res = await authApi.login(form.value)
    
    if(res.status === 200) {
      router.push('/home')
    }else{
      errorShow.value = true
    }

    auth.setAuth({
      id: res.data.id,
      email: res.data.email,
      roles: res.data.roles,
      fullName: res.data.fullName || '',
      profilePicture: res.data.profilePicture || '',
      profilePictureUrl: res.data.profilePictureUrl || '',
      merchantId: res.data.merchantId || '',
      merchantName: res.data.merchantName || '',
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken
    })
  } catch (error) {
    console.log(error)
    errorShow.value = true
  } finally {
    loading.value = false
  }
}
</script>