<template>
    <v-navigation-drawer v-model="drawer" :rail="(rail && !mobile)" :temporary="mobile" :permanent="!mobile">
        <v-list>
            <v-list-item
              title="BANYOKU"
              prepend-avatar="@/assets/logo.png"
              style="font-weight: 900; font-size: 1.5rem;"
            >
            </v-list-item>
        </v-list>

        <v-list v-model:opened="openedGroups">
          <SidebarItem
            v-for="menu in sidebarMenu.filter((menu) => menu.meta?.isSidebar)"
            :key="menu.path"
            :item="menu"
          />
        </v-list>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { sidebarMenu } from '@/router';
  import SidebarItem from './SidebarItem.vue';

  const route = useRoute()

  const mobile = defineModel<boolean>('mobile');
  const drawer = defineModel<boolean>('drawer');
  const rail = defineModel<boolean>('rail');

  const openedGroups = ref<string[]>([])

  /**
   * Traverse the menu tree and find all parent group values
   * that should be expanded for the currently active route.
   * Each group is identified by its meta.title.
   */
  function findActiveGroups(items: any[], parents: string[] = []): string[] {
    for (const item of items) {
      if (item.children) {
        // This is a group node — use its meta.title as the group identifier
        const groupValue = item.meta?.title || item.path
        const result = findActiveGroups(item.children, [...parents, groupValue])
        if (result.length > 0) return result
      } else {
        // This is a leaf node — check if it matches the current route
        let isActive = false

        // Match by route name (most reliable)
        if (item.name && route.name === item.name) {
          isActive = true
        }

        // Fallback: match by absolute path
        if (!isActive && item.path && item.path.startsWith('/')) {
          isActive = route.path === item.path || route.path.startsWith(item.path + '/')
        }

        if (isActive) return parents
      }
    }
    return []
  }

  // Watch route changes and auto-expand the parent groups of the active route
  watch(() => route.fullPath, () => {
    const activeGroups = findActiveGroups(sidebarMenu as any[])
    if (activeGroups.length > 0) {
      // Merge with existing opened groups so user-opened groups don't collapse
      const merged = new Set([...openedGroups.value, ...activeGroups])
      openedGroups.value = Array.from(merged)
    }
  }, { immediate: true })

</script>

<style scoped>
/* Level 2 submenu left padding */
:deep(.v-list-group__items .v-list-item) {
  padding-inline-start: 2rem !important;
}

/* Level 3 submenu with more indentation */
:deep(.v-list-group__items .v-list-group__items .v-list-item) {
  padding-inline-start: 3rem !important;
}

/* Level 4+ submenu with even more indentation */
:deep(.v-list-group__items .v-list-group__items .v-list-group__items .v-list-item) {
  padding-inline-start: 4rem !important;
}
</style>