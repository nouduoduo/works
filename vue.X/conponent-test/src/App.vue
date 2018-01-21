<template>
  <div id="app">
    <nav>
     <router-link :to="{name:'Home'}" exact>首页</router-link>
      <router-link :to="{name:'Result'}">结果</router-link>
    </nav>
    <router-view @postData="getData"
    :distribute ="showData"
    />
    app:{{showData}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showData: '',
    }
  },
  methods:{
    getData(data){
        this.showData = data;
    }
  }

}
</script>

<style lang="scss">
html,body{
  font:20px "微软雅黑";
  margin: 0;
}
  nav{
    $nav-color: #23ccb9;
    height:50px;
    line-height: 50px;
    background: $nav-color;
    a{
      height:100% ;
      width: 78px;
      display: inline-block;
      text-decoration: none;
      color: #fff;
      text-align: center;
      &.router-link-active{
        background: darken($nav-color,19%);
      }
    }
  }
</style>
