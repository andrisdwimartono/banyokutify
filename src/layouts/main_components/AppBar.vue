<template>
  <v-app-bar :elevation="2" rounded>
    <template v-slot:prepend>
        <v-app-bar-nav-icon @click="rail = !rail" v-if="!mobile">
            <v-icon :icon="!rail ? 'mdi-menu-open' : 'mdi-menu-close'"></v-icon>
        </v-app-bar-nav-icon>
        <v-app-bar-nav-icon @click="drawer = !drawer" v-else="mobile">
            <v-icon :icon="!drawer ? 'mdi-menu' : 'mdi-close'"></v-icon>
        </v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>

    <template v-slot:append>
        <v-btn @click="locale = (locale === 'en' ? 'id' : 'en')">
            {{ locale === 'id' ? '🇮🇩' : '🇬🇧' }}
        </v-btn>
        
        <v-btn :icon="theme === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'" @click="theme = (theme === 'light' ? 'dark' : 'light')"></v-btn>

        <v-btn :style="{marginRight: '1rem', height: '48px', padding: '4px 12px'}">
            <div style="display: flex; align-items: center; gap: 0;">
                <v-avatar size="40">
                    <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="{{ auth.fullName }}">
                </v-avatar>
                <div style="display: flex; align-items: center; height: 40px; padding: 0 12px; background-color: rgba(var(--v-theme-on-surface), 0.08); border-radius: 4px;">
                    <span style="font-size: 14px; font-weight: 500;">{{ auth.fullName }}</span>
                </div>
            </div>
            <v-menu activator="parent" offset="16">
                <v-list>
                    <v-list-item>
                        <!-- cursor: pointer -->
                        <v-list-item-title @click="router.push('/profile')" style="cursor: pointer">
                            <v-icon icon="mdi-account"></v-icon>
                            Profile
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-icon icon="mdi-cog"></v-icon>
                            Settings
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-icon icon="mdi-logout"></v-icon>
                            Logout
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
    </template>
    </v-app-bar>
</template>
<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth.store'
    import { useRouter } from 'vue-router'
    const auth = useAuthStore()
    const router = useRouter()

    const mobile = defineModel<boolean>('mobile');
    const drawer = defineModel<boolean>('drawer');
    const rail = defineModel<boolean>('rail');
    const theme = defineModel<string>('theme');
    const locale = defineModel<string>('locale');
</script>
