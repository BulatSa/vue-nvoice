<template>
  <div class="day">
    <h2 class="day_title">День {{dayNumber}}</h2>
    <div class="day_part day_part--visible" data-part="morning">
      <h3 @click="toggleDayText">Утро</h3>
      <div class="day_part-info-wrap">
        <div class="day_part-info" v-html="morningHTML"></div>
        <span class="day_part-checked" @click="checkedDay('morning', $event)">Понял!</span>
      </div>
    </div>

    <div class="day_part" data-part="afternoon">
      <h3 @click="toggleDayText">День</h3>
      <div class="day_part-info-wrap">
        <div class="day_part-info" v-html="afternoonHTML"></div>
        <span class="day_part-checked" @click="checkedDay('afternoon', $event)">Сделал!</span>
      </div>
    </div>

    <div class="day_part" data-part="evening">
      <h3 @click="toggleDayText">Вечер</h3>
      <div class="day_part-info-wrap">
        <div class="day_part-info" v-html="eveningHTML"></div>
        <span class="day_part-checked" @click="checkedDay('evening', $event)">Готово!</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import data from '@/data/data.json';

@Component({})

export default class Day extends Vue {
  dayNumber = Number(this.$route.params.dayNumber);

  todayData = data.find((item) => item.id === this.dayNumber)

  morningHTML = this.todayData?.parts.morning;

  afternoonHTML = this.todayData?.parts.afternoon;

  eveningHTML = this.todayData?.parts.evening;

  mounted() {
    const checkedDaysMap = JSON.parse(localStorage.getItem('nvoiceCheckedDaysMap') || '{}');
    const checkedDayPartsList = checkedDaysMap[this.dayNumber] || [];

    checkedDayPartsList.forEach((dayPart:string) => {
      // eslint-disable-next-line no-unused-expressions
      document.querySelector(`[data-part=${dayPart}]`)?.classList.add('done');
    });
  }

  toggleDayText(e: any, isCheckedPart = false):void {
    const dayPartElement = e.target.closest('.day_part');
    if (dayPartElement) {
      dayPartElement.classList.toggle('open');
    }
    if (dayPartElement && isCheckedPart) {
      dayPartElement.classList.toggle('done');
    }
  }

  checkedDay(dayPart: string, event: Event): void {
    const checkedDaysMap = JSON.parse(localStorage.getItem('nvoiceCheckedDaysMap') || '{}');
    const checkedDayPartsList = checkedDaysMap[this.dayNumber];
    const isPartInCheckedList = checkedDayPartsList
      ?.find((checkedDayPart: string) => checkedDayPart === dayPart);

    if (!checkedDayPartsList) {
      checkedDaysMap[this.dayNumber] = [dayPart];
    } else if (!isPartInCheckedList) {
      checkedDayPartsList.push(dayPart);
      checkedDaysMap[this.dayNumber] = checkedDayPartsList;
    }

    localStorage.setItem('nvoiceCheckedDaysMap', JSON.stringify(checkedDaysMap));

    this.toggleDayText(event, true);
  }
}

</script>

<style lang="scss" scoped>
.day {
  color: #000;
  font-size: 24px;
}

.day_title {
  margin-bottom: 1.5em;
  font-size: 24px;
  text-align: center;
  color: #fff;
}

.day_part {
  padding: 0 18px;
  margin-bottom: 16px;
  border-radius: 5px;
  background: #fff;
  opacity: 0.5;
  pointer-events: none;
  transition: all 0.3s ease;
  @include res(m) {
    padding: 0 12px;
  }
  h3 {
    position: relative;
    padding: 11px 0;
    cursor: pointer;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    &:before {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 0;
      width: 18px;
      height: 18px;
      font-size: 16px;
      line-height: 1;
      border: 1px solid #000;
      opacity: 0;
      transition: all 0.3s ease;
      transform: translate3d(0, -50%, 0);
    }
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      width: 16px;
      height: 16px;
      border-right: 2px solid rgba($color: #000000, $alpha: 1);
      border-bottom: 2px solid rgba($color: #000000, $alpha: 1);
      border-left: 2px solid rgba($color: #000000, $alpha: 0);
      border-top: 2px solid rgba($color: #000000, $alpha: 0);
      transition: all 0.3s ease;
      transform: translate3d(0, -75%, 0) rotate(45deg);
    }
  }
  &.open {
    padding-bottom: 20px;
    h3 {
      &:after {
        transform: translate3d(0, -35%, 0) rotate(45deg);
        border-right: 2px solid rgba($color: #000000, $alpha: 0);
        border-bottom: 2px solid rgba($color: #000000, $alpha: 0);
        border-left: 2px solid rgba($color: #000000, $alpha: 1);
        border-top: 2px solid rgba($color: #000000, $alpha: 1);
      }
    }
    .day_part-info-wrap {
      height: auto;
      opacity: 1;
    }
    &.done {
      background: #fff;
    }
  }
  &.done {
    background: $green-light;
    h3 {
      padding: 6px 0;
      &:before {
        opacity: 1;
      }
    }
    .day_part-checked {
      display: none;
    }
    &+.day_part {
      opacity: 1;
      pointer-events: all;
    }
  }
  &--visible {
    opacity: 1;
    pointer-events: all;
  }
}

.day_part-info-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 0px;
  opacity: 0;
  font-size: 20px;
  line-height: 28px;
  overflow: hidden;
  transition: all 0.6s ease;
}

.day_part-checked {
  display: inline-block;
  margin: 10px auto 2px;
  padding: 12px;
  line-height: 1;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background: $blue;
  transition: all 0.3s ease;
  transform: translate3d(0,0,0);
  &:hover {
    box-shadow: 0px 2px 0px 0 #000;
    transform: translate3d(0,-2px,0);
  }
}

</style>
