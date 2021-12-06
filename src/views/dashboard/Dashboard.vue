<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <dashboard-statistics-card></dashboard-statistics-card>
    </v-col>

    <v-col
      cols="12"
      sm="12"
      md="12"
    >
      <dashboard-weekly-overview></dashboard-weekly-overview>
    </v-col>
  </v-row>
</template>

<script>
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'

export default {
  components: {
    DashboardStatisticsCard,
    DashboardWeeklyOverview,
  },
}
</script>
