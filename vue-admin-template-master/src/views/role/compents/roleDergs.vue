<template>
    <div>
        <el-dialog title="分配权限" :visible="roleDialog" @close="close">
            <el-tree ref="permissionRef" :data="TreeDate" :props="defaultProps" show-checkbox node-key="id"
                  :default-checked-keys="tureData"></el-tree>

            <el-button type="primary" @click="updaterole">确定</el-button>
            <el-button @click="close">取消</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { getpermissionApi, getroleidApi, assignRolesApi } from "@/api/role";
import { transListToTree } from "@/utils/transListToTree";

export default {
    props: {
        roleDialog: {
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
            TreeDate: [],
            defaultProps: { label: 'name', children: 'children' },
            tureData: [],
        };
    },
    methods: {
        async getlist() {
            let res = await getpermissionApi()
            this.TreeDate = transListToTree(res.data, 0)
            let ress = await getroleidApi(this.roleid)
            console.log(ress);
            this.tureData = ress.data.permIds
        },
        async updaterole() {

            let roldess = this.$refs.permissionRef.getCheckedKeys()
            await assignRolesApi({ id: this.roleid, permIds: roldess })
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
            this.$emit('update:roleDialog', show)
        },
    },
    components: {},
    filters: {},
    watch: {},

};
</script>

<style lang="scss" scoped></style>