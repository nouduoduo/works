<template>
  <div class="home">
    <FormInput  label="测试数据:" placeholder="请输入"
    @transData="getData"
    >
    </FormInput>
    home:{{showData}}
  </div>
</template>

<script>
  import FormInput from '@/components/FormInput'
export default {
  name: 'Home',
  data () {
    return {
      showData: ''
    }
  },
  methods:{
    getData(data){
        this.showData = data;
        this.$emit('postData',data)
    }
  },
  components:{
    FormInput
  }
}
</script>


<style scoped>

</style>
