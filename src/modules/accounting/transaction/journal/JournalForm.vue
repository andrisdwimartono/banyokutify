<template>
  <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
    >
        <v-row>
            <!-- star red for required field -->
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="journalRequest.journalNo"
                    @update:model-value="journalRequest.journalNo = $event"
                    :label="t('banyoku.accounting.transaction.journal.journalNo')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="journalRequest.date"
                    @update:model-value="journalRequest.date = $event"
                    :label="t('banyoku.accounting.transaction.journal.date')"
                    :rules="[v => !!v || t('validation.required')]"
                    type="date"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="journalRequest.reference"
                    @update:model-value="journalRequest.reference = $event"
                    :label="t('banyoku.accounting.transaction.journal.reference')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="12" lg="12" xl="12" xxl="12" sm="12">
                <v-text-field
                    :model-value="journalRequest.description"
                    @update:model-value="journalRequest.description = $event"
                    :label="t('banyoku.accounting.transaction.journal.description')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-form>
  

  <JournalDetailGrid
    v-model:source="journalRequest.journalDetails"
    v-model:isDark="isDark"
    style="width: 100%;"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { journalApi } from '@/services/api/accounting/transaction/journal/journal.api'
import { useSnackbarStore } from '@/stores/snackbar.store'
import JournalDetailGrid from '@/modules/accounting/transaction/journal/JournalDetailGrid.vue'
import type { JournalRequest } from '@/types/accounting/transaction/journal/journal.request'

const route = useRoute();
const { id: routeId } = route.params as { id?: string }

const snackbar = useSnackbarStore()

const { t } = useI18n()
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const valid = ref(false)
const journalRequest = ref<JournalRequest>({
        journalNo: '',
        date: '',
        reference: '',
        description: '',
        journalDetails: [],
    })

journalRequest.value.journalDetails.push({
    accountId: '',
    debit: 0,
    credit: 0,
    description: '',
    rowNo: 1
})

journalRequest.value.journalDetails.push({
    accountId: '',
    debit: 0,
    credit: 0,
    description: '',
    rowNo: 2
})

const id = ref<string | null>(null)

const submit = async () => {
        if (!journalRequest.value) return

        try {
            if (id.value) {
                const res = await journalApi.update(id.value, journalRequest.value)
                snackbar.show('Success', t(res.data.code), 'success')
            } else {
                const res = await journalApi.create(journalRequest.value)
                snackbar.show('Success', t(res.data.code), 'success')
            }
        } catch (err: any) {
            snackbar.show('Error', t(err.response.data.code), 'success')
        }
    }
</script>