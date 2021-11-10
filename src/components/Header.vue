<template>
  <div class="header">
    <router-link to="/"><h1>Natural Voice</h1></router-link>
  </div>
</template>

<script>
import { Vue } from 'vue-property-decorator';

export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  color: #fff;
  a {
    color: #fff;
  }
}
</style>
