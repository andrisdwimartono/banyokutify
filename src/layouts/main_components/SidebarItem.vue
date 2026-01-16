<template>
  <!-- GROUP -->
  <v-list-group v-if="item.children">
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :prepend-icon="item.icon"
        :title="t(item.meta.title)"
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
    @click="router.push(resolvePath(item))"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps<{ item: any }>()

const { t } = useI18n()
const router = useRouter()

function resolvePath(item: any) {
  return item.name
    ? { name: item.name }
    : item.path
}
</script>