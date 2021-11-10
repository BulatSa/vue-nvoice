<template>
  <div id="app" class="container">
    <div class="header">
      <router-link to="/"><h1>Natural Voice</h1></router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import DayList from './components/DayList.vue';

@Component({
  components: {
    DayList,
  },
})

export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app {
  overflow: hidden;
}
.header {
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  color: #fff;
  a {
    color: #fff;
  }
}

.fade-enter {
  opacity: 0;
  transform: translate3d(100px,0,0);
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(-100px,0,0);
}

.fade-leave-active {
  transition: all 0.3s ease;
}
</style>
