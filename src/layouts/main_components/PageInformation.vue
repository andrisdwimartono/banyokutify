<template>
    <div class="page-info">
        <v-breadcrumbs
            v-if="breadcrumbs.length > 0"
            class="page-breadcrumbs"
        >
            <template v-for="(crumb, index) in breadcrumbs" :key="index">
                <v-breadcrumbs-item :disabled="crumb.disabled">
                    <v-icon
                        v-if="crumb.icon"
                        :icon="crumb.icon"
                        size="x-small"
                        class="breadcrumb-icon"
                    />
                    {{ crumb.title }}
                </v-breadcrumbs-item>
                <v-breadcrumbs-divider v-if="index < breadcrumbs.length - 1">
                    <v-icon icon="mdi-chevron-right" size="x-small" />
                </v-breadcrumbs-divider>
            </template>
        </v-breadcrumbs>
        <div class="page-title">
            {{ title }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { sidebarMenu } from '@/router';

    const route = useRoute()
    const { t } = useI18n()

    interface BreadcrumbItem {
        title: string
        icon?: string
        disabled: boolean
    }

    const title = computed(() => {
        const key = route.meta.title as string
        return key ? t(key) : ''
    })

    /**
     * Build breadcrumbs by traversing the sidebarMenu tree
     * and finding the path to the currently active route.
     * Each breadcrumb includes the icon from the route definition.
     */
    const breadcrumbs = computed(() => {
        const items: BreadcrumbItem[] = []

        const findPath = (menuItems: any[], parentPath: string = ''): boolean => {
            for (const item of menuItems) {
                const itemPath = item.path?.startsWith('/')
                    ? item.path
                    : parentPath
                        ? `${parentPath}/${item.path}`.replace(/\/+/g, '/')
                        : `/${item.path}`

                if (item.children) {
                    // This is a group — push it tentatively
                    const groupTitle = item.meta?.title ? t(item.meta.title) : item.path
                    items.push({
                        title: groupTitle,
                        icon: item.icon,
                        disabled: false,
                    })

                    if (findPath(item.children, itemPath)) {
                        return true
                    }

                    // Not found in this branch, remove the tentative item
                    items.pop()
                } else {
                    // Leaf node — check if it matches current route
                    const isActive =
                        (item.name && route.name === item.name) ||
                        (item.path && item.path.startsWith('/') && (route.path === item.path || route.path.startsWith(item.path + '/'))) ||
                        (itemPath && route.path === itemPath)

                    if (isActive) {
                        const leafTitle = item.meta?.title ? t(item.meta.title) : item.path
                        items.push({
                            title: leafTitle,
                            icon: item.icon,
                            disabled: true,
                        })
                        return true
                    }
                }
            }
            return false
        }

        findPath(sidebarMenu as any[])

        return items
    })
</script>

<style scoped>
.page-info {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem 1.25rem;
}

.page-breadcrumbs {
    padding: 0 0 0.25rem 0;
    min-height: unset;
    font-size: 0.8rem;
    opacity: 0.7;
}

.page-breadcrumbs :deep(.v-breadcrumbs-item) {
    padding: 0;
}

.breadcrumb-icon {
    margin-right: 0.25rem;
}

.page-title {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.01em;
}
</style>