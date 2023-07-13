<template>
    <div>
        <el-dialog title="新增" :visible="showDialog" @close="close">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch v-model="ruleForm.state" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
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
import { addroleApi } from "@/api/role";
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ruleForm: {
                description: '',
                name: '',
                state: ''
            },
            rules: {
                name: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
                description: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
                { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await addroleApi(this.ruleForm)
                    this.$message('角色添加成功')
                    await this.$emit('updatedepart')
          this.close()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 关闭
        close() {
            this.$refs.ruleForm.resetFields()
            let show = false
            this.$emit('update:showDialog', show)
        },
    },
    components: {},
    filters: {},
    watch: {},
};
</script>

<style lang="scss" scoped></style>