<template>
  <div>
    <el-tree :data="datas" :props="defaultProps" :default-expand-all="true">
      <template v-slot:default="{ node, data }">
        <el-row style="width: 100%; height: 40px;" type="flex" justify="justify-between" align="middle">
          <el-col :span="20">
            {{ data.name }}
          </el-col>
          <el-col :span="4">
            <span>{{ data.name }}</span> |
            <el-dropdown @command="addDerg($event, data.id)">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
                <el-dropdown-item command="update">修改</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>

          </el-col>
        </el-row>
      </template>
    </el-tree>

    <add-derg ref="adddept" :showDialog.sync="showDialog" :currentNodeId="currentNodeId" @updatedepart="getlist" />
  </div>
</template>

<script>
import { departmentApi } from '@/api/department'
import addDerg from "./compents/addDerg.vue"
export default {
  data() {
    return {
      datas: [],
      defaultProps: { label: 'name', children: 'children' },
      showDialog: false,
      currentNodeId: null
    }
  },
  created() {
    this.getlist()
  },
  methods: {
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
    async getlist() {
      const res = await departmentApi()
      this.datas = this.transListToTree(res.data, 0)
    },
    addDerg(type, id) {
      if (type === 'add') {
        this.showDialog = true
        this.currentNodeId = id

      } else if (type === 'update') {
        this.showDialog = true
        this.currentNodeId = id
        console.log(this.$refs.adddept)
        this.$nextTick(()=>{
          this.$refs.adddept.updatedepartment()
        })
      }
    }
  },
  components: {
    addDerg
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
