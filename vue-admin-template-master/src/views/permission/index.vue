<template>
  <div>
    <div class="tophead">
      <el-button type="primary" @click="add">添加权限</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="code" label="标识" sortable width="180">
      </el-table-column>
      <el-table-column prop="description" label="描述">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <template v-if="row.type == 1">
            <el-button @click="handleClick(row.pid, row.type)" type="text" size="small">添加</el-button>
            <el-button type="text" size="small" @click="update(row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
          <template v-else>
            <el-button type="text" size="small" @click="update(row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <addpass ref="adddept" :showDialog.sync="showDialog" :adds="adds" :updateid="updateid" @getout="getList()"></addpass>
  </div>
</template>

<script>
import addpass from './compents/addpass.vue'
import { getpermissionApi, delpermissionApi } from '@/api/permission'
import { transListToTree } from '@/utils/transListToTree'
export default {
  data() {
    return {
      tableData: [],
      showDialog: false,
      adds: {
        pid: 0,
        type: 1,
      },
      updateid: null,
    }
  },
  methods: {
    async getList() {
      let res = await getpermissionApi()
      this.tableData = transListToTree(res.data, 0)
      console.log(this.tableData);
    },
    add() {
      this.showDialog = true
    },
    handleClick(pid, type) {
      this.showDialog = true
      this.adds.pid = pid + 1;
      this.adds.type = type + 1;
    },
    update(id) {
      this.showDialog = true
      this.updateid = id
      console.log(this.$refs.adddept)
      this.$nextTick(() => {
        this.$refs.adddept.updateper()
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delpermissionApi(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },
  components: {
    addpass
  },
  filters: {},
  watch: {},
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped></style>
