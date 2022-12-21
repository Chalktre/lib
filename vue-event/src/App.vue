<template>
  <div id="app">
    <el-button>123</el-button>
  </div>
</template>

<script>
import { registerApi } from '@/api'
export default {
  async created () {
    const res = await registerApi()
    console.log(res)
  }
}
</script>

<style lang="less" scoped>
</style>
