<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="工号">
                <el-input v-model="ruleForm.workNumber" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <user-cascader v-model="ruleForm.departmentId"></user-cascader>
            </el-form-item>
            <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择活动区域">
                    <el-option label="正式" value="1"></el-option>
                    <el-option label="非正式" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间" prop="timeOfEntry">
                <!-- <el-date-picker v-model="ruleForm.timeOfEntry"  type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker> -->
                <el-date-picker
      v-model="ruleForm.timeOfEntry"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>
            </el-form-item>
            <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker v-model="ruleForm.correctionTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import { addemployeeApi } from "@/api/employee";
import userCascader from "./compents/usercascader.vue";
export default {
    data() {
        return {
            ruleForm: {
                username: '',
                mobile: '',
                workNumber: '',
                formOfEmployment: '',
                departmentId: null,
                timeOfEntry: '',
                correctionTime: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                formOfEmployment: [
                    { required: true, message: '请选择正式', trigger: 'change' }
                ],
                timeOfEntry: [
                    { type: 'date', required: true, message: '请选择入职时间', trigger: 'change' }
                ],
                correctionTime: [
                    { type: 'date', required: true, message: '请选择转正时间', trigger: 'change' }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await addemployeeApi(this.ruleForm)
                    this.$message({
                        type: 'success',
                        message: '添加成功',
                        duration: 3000,
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    components: {
        userCascader
    },
    filters: {},
    watch: {},
};
</script>

<style lang="scss" scoped></style>