<template>
  <div>
    <el-dialog title="提示" :visible="showDialog" @close="close">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="负责人名称" prop="manager">
          <el-select v-model="ruleForm.manager" placeholder="请选择活动区域">
            <el-option v-for="item in simple" :key="item.id" :label="item.username" :value="item.username"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { departmentApi, departsimpleApi } from '@/api/department.js'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const visibleone = (rules, val, callback) => {
      const boolen = this.list.some(item => item.name == val)
      if (boolen) {
        callback(new Error('项目名称已存在'))
      } else {
        return true
      }
    }
    return {
      list: [],
      simple: [],
      ruleForm: {
        manager: '',
        name: '',
        code: '',
        introduce: '',
        pid: ''
      },
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        { validator: visibleone }
        ],
        cede: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 10, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        manager: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
      }
    }
  },
  methods: {
    async getlist() {
      const res = await departmentApi()
      console.log(res);
      this.list = res.data
      const resone = await departsimpleApi()
      console.log(resone);
      this.simple = resone.data
    },
    close() {
      let show = false
      this.$emit('update:showDialog', show)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created() {
    this.getlist()
  }
}
</script>

<style lang="scss" scoped></style>

