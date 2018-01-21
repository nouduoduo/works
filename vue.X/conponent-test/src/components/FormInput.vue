<template>
  <div class="formInput">
    <div class="form-line">
      <label >{{label}}</label>
      <input type="text"
             v-model="testData"
             :placeholder="placeholder"
      @keydown.enter="$emit('transData',testData)">

    </div>

  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props:['label','placeholder'],
  data () {
    return {
      testData: ''
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .form-line{
    padding:12px 10px;
  input{
    font-size: 20px;
    padding:6px;
  }
  }

</style>
