<template>
  <div>
    <el-dialog title="新增权限点" :visible="showDialog" @close="close">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="name">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="ruleForm.enVisible" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addpermissionApi, updatepermissionApi,editpermissionApi } from '@/api/permission'
export default {
  props: ['showDialog', 'adds', 'updateid'],
  data() {
    return {
      ruleForm: {
        enVisible: '',
        description: '',
        name: '',
        code: '',
        pid: 0,
        type: 1,
      },
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        cede: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        description: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
      }
    };
  },
  methods: {
    close() {
      this.$refs.ruleForm.resetFields();
      let show = false
      this.$emit('update:showDialog', show)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.ruleForm.id) {
           await editpermissionApi(this.ruleForm)
          } else {
            this.ruleForm.pid = this.adds.pid
            this.ruleForm.type = this.adds.type
            await addpermissionApi(this.ruleForm)
          }
          this.$message({
            type: 'success',
            message: '添加成功',
            duration: 3000,
          })
          this.$emit('getout')
          this.close()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async updateper() {
      let res = await updatepermissionApi(this.updateid)
      this.ruleForm = res.data
    }
  },
  components: {},
  filters: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>