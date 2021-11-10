<template>
  <router-link :to="dayUrl" class="day-list-item" :class="checkedDayClass">
    <span class="day-list-item__count">{{dayData.id}}</span>
    <span class="day-list-item__name">День</span>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})

export default class DayListItem extends Vue {
  @Prop({
    default: {},
  }) dayData: any;

  dayUrl = `day/${this.$props.dayData.id}`;

  checkedDayClass = '';

  mounted() {
    const checkedDaysMap = JSON.parse(localStorage.getItem('nvoiceCheckedDaysMap') || '{}');
    const checkedDayPartsList = checkedDaysMap[this.dayData.id] || [];

    if (checkedDayPartsList.length === 3) {
      this.checkedDayClass = 'day-list-item--complete';
    }
  }
}
</script>

<style lang="scss" scoped>
.day-list-item {
  width: calc(100% / 5 - 20px);
  margin: 0 10px;
  padding: 10px 20px 15px;
  text-align: center;
  font-size: 24px;
  box-shadow: 0 0 5px 0 rgba($color: #fff, $alpha: 0.0);
  background: #fff;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 7px 0 rgba($color: #fff, $alpha: 1.0);
  }
  @include res(m) {
    width: calc(100% / 3 - 16px);
    margin: 0 8px;
  }
  &--complete {
    .day-list-item__count {
      background: #00B73E;
    }
  }
}

.day-list-item__count {
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 5px;
  line-height: 48px;
  border-radius: 50%;
  color: #fff;
  background: #0057FF;
}

.day-list-item__name {
  display: block;
  color: #000;
}
</style>
