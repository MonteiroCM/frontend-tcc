<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <dashboard-statistics-card></dashboard-statistics-card>
    </v-col>
  </v-row>
</template>

<script>
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'

export default {
  components: {
    DashboardStatisticsCard,
  },
}
</script>
