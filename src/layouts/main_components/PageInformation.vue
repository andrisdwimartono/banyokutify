<template>
    <v-card
        class="w-100"
        :style="{ padding: '0rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }"
        :elevation="0"
    >
        <div style="font-size: 1.5rem; font-weight: 500; margin-left: 1rem">
            {{ title }}
        </div>
        <!-- <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:prepend>
                <v-icon icon="$vuetify" size="small"></v-icon>
            </template>
        </v-breadcrumbs> -->
    </v-card>
</template>
<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { sidebarMenu } from '@/router';

    const route = useRoute()
    const { t } = useI18n()

    const title = computed(() => {
        const key = route.meta.title as string
        return key ? t(key) : ''
    })

    const breadcrumbs = computed(() => {
        // const key = route.meta.title as string
        // const menu = sidebarMenu.filter((menu) => menu.meta?.isSidebar)
        // const items = menu.map((menu) => {
        //     if(menu.meta?.title === key) {
        //         return {
        //             title: t(menu.meta?.title as string),
        //             disabled: false,
        //             href: menu.path,
        //         }
        //     }else{
        //         return {
        //             title: t(menu.meta?.title as string),
        //             disabled: true,
        //             href: menu.path,
        //         }
        //     }
        //     // return {
        //     //     title: t(menu.meta?.title as string),
        //     //     disabled: false,
        //     //     href: menu.path,
        //     // }
        // })
        const items = sidebarMenu.filter((menu) => menu.meta?.isSidebar).map((menu) => {
            return {
                title: t(menu.meta?.title as string),
                disabled: false,
                href: menu.path,
            }
        })
        return items
        // const key = route.meta.title as string
        // // key like this "banyoku.administration.master.user._label"
        // // the breadcrumb will be like this "banyoku.administration" / "banyoku.administration.master" / "banyoku.administration.master.user._label"
        // // banyoku not include in breadcrumb
        // // the key should "banyoku.administration" / "banyoku.administration.master" / "banyoku.administration.master.user._label"
        // const breadcrumbs = key?.split('.')

        // const items = breadcrumbs?.map((item, index) => {
        //     return {
        //         title: t(item),
        //         disabled: index === breadcrumbs.length - 1,
        //         href: item,
        //     }
        // })
        // return items?.filter((item) => item.href !== 'banyoku')
    })
</script>