<template>
  <div>
    <el-cascader :value="value" :options="TreeData" :props="defaultProps" separator="-" @change="handleChange"></el-cascader>
  </div>
</template>

<script>
import { departmentApi } from '@/api/department'
import { transListToTree } from '@/utils/transListToTree'
export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },  
  data() {
    return {
      TreeData: [],
      defaultProps: { label: 'name', children: 'children',value:'id'}
    };
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let res = await departmentApi()
      this.TreeData = transListToTree(res.data, 0)
    },
    handleChange(list) {
      console.log(list);
      if (list.length > 0) {
        console.log(list[list.length - 1]);
        this.$emit('input', list[list.length - 1])
      } else {
        this.$emit('input', null)
      }
    }
  },
  components: {},
  filters: {},
  watch: {},

};
</script>

<style lang="scss" scoped></style>