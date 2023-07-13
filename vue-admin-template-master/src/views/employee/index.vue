<template>
  <div class="employee">
    <div class="left">
      <el-input type="text" size="mini" v-model="queryparams.keyword" placeholder=""></el-input>
      <el-tree ref="deptTree" :data="datas" node-key="id" :props="defaultProps" default-expand-all
        :expand-on-click-node="false" :highlight-current="true" @current-change="selNode"></el-tree>
    </div>
    <div class="main">
      <div class="tohead">
        <el-button type="primary" @click="$router.push('/employee/useradd')">添加员工</el-button>
        <el-button>excel导入</el-button>
        <el-button>excel导出</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="头像">
          <template v-slot="{ row }">
            <div class="avatar-wrapper">
              <img v-if="row.staffPhoto" :src="row.staffPhoto" class="user-avatar">
              <span v-else>{{ row.username.charAt(0) }}</span>
              <i class="el-icon-caret-bottom" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="workNumber" label="工号"></el-table-column>
        <el-table-column prop="formOfEmployment" label="聘用形式">
          <template v-slot="{ row }">
            <span>{{ row.formOfEmployment==1?'正式':'不正式' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门"></el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button @click="iEiet(row)" type="text" size="small">查看</el-button>
            <el-button @click="roledergs(row.id)" type="text" size="small">角色</el-button>
            <el-button @click="deleteRow(row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryparams.page" :page-sizes="[10, 20, 30, 40]" :page-size="10"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
<role-derg ref="adddept" :showDialog.sync="showDialog" :roleid="roleid"></role-derg>
  </div>
</template>

<script>
import { departmentApi } from '@/api/department'
import { getemployeeApi } from '@/api/employee'
import roleDerg from "./compents/roleDerg.vue";
export default {
  data() {
    return {
      defaultProps: { label: 'name', children: 'children' },
      datas: [],
      tableData: [],
      queryparams: {
        departmentId: null,
        page: 1,
        pagesize: 10,
        keyword: ''
      },
      total: 0,
      showDialog:false,
      roleid:null
    }
  },

  methods: {
    // 递归
    transListToTree(list, rootPid) {
      const arr = []
      list.forEach(item => {
        if (item.pid === rootPid) {
          const children = this.transListToTree(list, item.id)
          item.children = children
          arr.push(item)
        }
      })
      return arr
    },
    // 加载数据 并默认张开 并 默认选择第一个
    async getList() {
      let res = await departmentApi()
      this.datas = this.transListToTree(res.data, 0)
      this.queryparams.departmentId = this.datas[0].id
      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.queryparams.departmentId)
      })
      this.getUser()
    },
    // 渲染员工数据
    async getUser() {
      let res = await getemployeeApi(this.queryparams)
      console.log(res);
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    // 选择第几个
    selNode(node) {
      this.queryparams.departmentId = node.id
      this.getUser()
    },
    // 删除
    deleteRow(row) { },
    // 分页
    handleSizeChange(val) {
      this.queryparams.pagesize = val
      this.getUser()
    },
    handleCurrentChange(val) {
      this.queryparams.page = val
      this.getUser()
    },
    iEiet(){},
    roledergs(id){
      this.showDialog = true
      this.roleid = id
      this.$nextTick(() => {
        this.$refs.adddept.roleemp()
      })
    }
  },
  created() {
    this.getList()
  },
  components:{
    roleDerg
  }
}
</script>

<style lang="scss" scoped>
.employee {
  display: flex;

  .left {
    width: 200px;
  }

  .main {
    flex: 1;
  }

  .tohead {
    display: flex;
  }
}

.avatar-wrapper {
  margin-top: 5px;
  position: relative;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}
</style>
