<template>
    <div>
        <el-dialog title="角色分配" :visible="showDialog" @close="close">
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in roleData" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>

            <el-button type="primary" @click="updaterole">确定</el-button>
                    <el-button @click="close">取消</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { getEnabledRoles,roleApi,assignRolesApi } from "@/api/employee";
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        roleid: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            roleData: [],
            checkList: []
        };
    },
    methods: {
        async roleemp() {
            let res = await getEnabledRoles()
            this.roleData = res.data
            let ress = await roleApi(this.roleid)
            console.log(ress);
            this.checkList =  ress.data.roleIds
        },
        async updaterole(){
          await  assignRolesApi({id:this.roleid,roleIds:this.checkList})
          this.$message({
            type: 'success', // success error warning
            message: '角色成功',
            duration: 2000,
          })
          this.close()
        },
        // 关闭
        close() {
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