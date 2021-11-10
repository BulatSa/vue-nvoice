<template>
  <transition-group tag="div" appear class="day-list">
    <DayListItem
      v-for="dayData in data"
      :key="dayData.id"
      :dayData="dayData" />
  </transition-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DayListItem from './DayListItem.vue';
import dataJson from '@/data/data.json';

@Component({
  components: {
    DayListItem,
  },
})
export default class DayList extends Vue {
  data = dataJson;
}
</script>

<style lang="scss" scoped>
.day-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  @include res(m) {
    margin: 0 -8px;
  }
}
</style>
