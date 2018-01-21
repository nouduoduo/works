<template>
  <div class="hello">
    <h1 :distribute="msg"></h1>

  </div>
</template>

<script>
export default {
  name: 'Result',
  pros:["distribute"],
  data () {
    return {
      msg: '结果'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
