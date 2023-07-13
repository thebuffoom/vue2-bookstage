<template>
  <div>
    <el-dialog :title="this.ruleForm.id ? '编辑' : '新增'" :visible="showDialog" @close="close">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="负责人名称" prop="managerId">
          <el-select v-model="ruleForm.managerId" placeholder="请选择活动区域">
            <el-option v-for="item in simple" :key="item.id" :label="item.username" :value="item.id"></el-option>
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
import { departmentApi, departsimpleApi, adddeparApi, updatedepartmentApi, updateDepartment } from '@/api/department.js'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    const visibleone = (rules, val, callback) => {
      if (this.ruleForm.id) {
        this.list = this.list.filter(item => item.id != this.ruleForm.id)
      }
      const boolen = this.list.some(item => item.name == val)
      if (boolen) {
        callback(new Error('项目名称已存在'))
      } else {
        callback()
      }
    }
    return {
      list: [],
      simple: [],
      ruleForm: {
        introduce: '',
        managerId: '',
        name: '',
        code: '',
      },
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        { validator: visibleone }
        ],
        cede: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }],
        managerId: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
      }
    }
  },
  methods: {
    // 获取数据
    async getlist() {
      const res = await departmentApi()
      this.list = res.data
      const resone = await departsimpleApi()
      this.simple = resone.data
    },
    // 关闭
    close() {
      this.$refs.ruleForm.resetFields()
      let show = false
      this.$emit('update:showDialog', show)
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let msg = '新增';
          if (this.ruleForm.id) {
            msg = '更新'
            await updateDepartment(this.ruleForm)
          } else {
            await adddeparApi({ ...this.ruleForm, pid: this.currentNodeId })
          }
          await this.$emit('updatedepart')
          this.$message({
            type: 'success',
            message: `${msg}部门成功`,
            duration: 5000
          })
          this.close()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async updatedepartment() {
      let res = await updatedepartmentApi(this.currentNodeId)
      this.ruleForm = res.data
    }
  },
  created() {
    this.getlist()
  }
}
</script>

<style lang="scss" scoped></style>

