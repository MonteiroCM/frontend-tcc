<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-settings-account :account-data="user"></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-address></account-settings-address>
      </v-tab-item>

      <v-tab-item>
        <account-settings-info :information-data="user"></account-settings-info>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsAddress from './AccountSettingsAddress.vue'
import AccountSettingsInfo from './AccountSettingsInfo.vue'

export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsAddress,
    AccountSettingsInfo,
  },
  computed: {
    ...mapState('auth', ['user']),
  },

  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      {
        title: 'Perfil', icon: mdiAccountOutline,
      },
      {
        title: 'Endereços', icon: mdiLockOpenOutline,
      },
    ]

    return {
      tab,
      tabs,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
    }
  },
}
</script>
