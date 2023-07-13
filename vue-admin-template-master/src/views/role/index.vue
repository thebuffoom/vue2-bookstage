<template>
  <div>
    <el-button type="primary" @click="add">添加角色</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="角色">
        <template v-slot="{ row }">
          <el-input v-model="row.editRow.name" type="text" size="mini" v-if="row.isEdit"></el-input>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template v-slot="{ row }">
          <el-input type="text" size="mini" v-model="row.editRow.description" v-if="row.isEdit" />
          <span v-else>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <template v-if="row.isEdit">
            <el-button size="mini" type="primary" @click="btnEditOk(row)">确定</el-button>
            <el-button size="mini" @click="row.isEdit = false">取消</el-button>
          </template>
          <template v-else>
            <el-button type="text" size="small" @click="addrole(row.id)">分配权限</el-button>
            <el-button @click="handleClick(row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="del(row)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum.page"
      :page-sizes="[5, 10, 20, 30, 40]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <add-derg :showDialog.sync="showDialog" @updatedepart="getlist"></add-derg>
    <role-dergs ref="addstop" :roleDialog.sync="roleDialog" :roleid="roleid"></role-dergs>
  </div>
</template>

<script>
import { getroleApi, updateroleApi,delroleApi } from "@/api/role";
import addDerg from "./compents/addDerg.vue";
import roleDergs from "./compents/roleDergs.vue";
export default {
  data() {
    return {
      tableData: [],
      pagenum: {
        page: 1, //页码
        pagesize: 5 //每页条数
      },
      total: 0,
      showDialog: false,
      roleDialog: false,
      roleid:null
    };
  },
  methods: {
    // 渲染数据
    async getlist() {
      let res = await getroleApi(this.pagenum)
      this.tableData = res.data.rows
      this.total = res.data.total
      this.tableData.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
      console.log(this.tableData);
    },
    handleSizeChange(val) {
      this.pagenum.pagesize = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.pagenum.page = val
      this.getlist()
    },
    // 打开
    add() {
      this.showDialog = true
    },
    addrole(id) {
      this.roleDialog = true
      this.roleid = id
      this.$nextTick(()=>{
        this.$refs.addstop.getlist()
      })
    },
    //编辑
    handleClick(row) {
      row.isEdit = true
      row.row.editRow.description = row.description
      row.row.editRow.name = row.name
      row.row.editRow.state = row.state
    },
    // 确认编辑
    async btnEditOk(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateroleApi({ ...row.editRow, id: rwo.id })
        this.$message({
          type: 'success', 
          message: '修改成功',
          duration: 3000,
        })
        Object.assign(row,{
          ...row.editRow,
          isEdit:false
        })
      }
    },
    async del(row){
    await delroleApi(row.id)
    this.$message({
          type: 'success', 
          message: '删除成功',
          duration: 3000,
        })
        this.getlist()
    }
  },
  components: {
    addDerg,
    roleDergs
  },
  filters: {},
  watch: {},
  created() {
    this.getlist()
  }
};
</script>

<style lang="scss" scoped></style>
