<template>
    <v-navigation-drawer v-model="drawer" :rail="(rail && !mobile)" :temporary="mobile" :permanent="!mobile">
        <v-list>
            <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="BANYOKU"
            >
            </v-list-item>
        </v-list>

        <v-list>
          <SidebarItem
            v-for="menu in sidebarMenu.filter((menu) => menu.meta?.requiresAuth)"
            :key="menu.path"
            :item="menu"
          />
        </v-list>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { sidebarMenu } from '@/router';
  import SidebarItem from './SidebarItem.vue';

  onMounted(() => {
    // console.log(sidebarMenu)
  })

  const mobile = defineModel<boolean>('mobile');
  const drawer = defineModel<boolean>('drawer');
  const rail = defineModel<boolean>('rail');

  const openedGroups = ref<string[]>([])

  const open = ref(['User'])

  // Handle group click to expand sidebar and toggle group
  const handleGroupClick = async (groupValue: string, isOpen: boolean) => {
    if (isOpen) {
      openedGroups.value.push(groupValue)
    } else {
      openedGroups.value = openedGroups.value.filter((value) => value !== groupValue)
    }
  };

</script>

<style scoped>
/* Reduce submenu left padding */
:deep(.v-list-group__items .v-list-item) {
  padding-inline-start: 2rem !important;
}
</style>