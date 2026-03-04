<template>
  <!-- GROUP -->
  <v-list-group v-if="item.children" :value="item.meta?.title || item.path">
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :prepend-icon="item.icon"
        :title="t(item.meta.title)"
        :active="isGroupActive"
      />
    </template>

    <SidebarItem
      v-for="child in item.children.filter((child: any) => child.meta?.isSidebar)"
      :key="child.path"
      :item="child"
    />
  </v-list-group>

  <!-- SINGLE MENU -->
  <v-list-item
    v-else
    :prepend-icon="item.icon"
    :title="t(item.meta.title)"
    :active="isItemActive"
    @click="router.push(resolvePath(item))"
  />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const props = defineProps<{ item: any }>()

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

function resolvePath(item: any) {
  return item.name
    ? { name: item.name }
    : item.path
}

// Check if current item is active
const isItemActive = computed(() => {
  if (props.item.name) {
    return route.name === props.item.name
  }
  if (props.item.path) {
    return route.path === props.item.path
  }
  return false
})

// Check if group or any of its children is active (for highlighting the group header)
const isGroupActive = computed(() => {
  if (!props.item.children) return false

  const checkActive = (items: any[]): boolean => {
    return items.some((child) => {
      // Check by route name (most reliable)
      if (child.name && route.name === child.name) return true

      // Check by absolute path
      if (child.path && child.path.startsWith('/')) {
        if (route.path === child.path || route.path.startsWith(child.path + '/')) return true
      }

      // Recursively check children
      if (child.children) return checkActive(child.children)

      return false
    })
  }

  return checkActive(props.item.children)
})
</script>