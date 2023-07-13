import request from '@/utils/request'

//  获取角色列表  /sys/role
export function getroleApi(data) {
    return request({
      url: '/sys/role',
      method: 'get',
      params:data
    })
  }
//添加  /sys/role
export function addroleApi(data) {
    return request({
      url: '/sys/role',
      method: 'post',
      data
    })
  }
// 编辑 /sys/role/{id}
export function updateroleApi(data) {
    return request({
      url: `/sys/role/${data.id}`,
      method: 'PUT',
      data
    })
  }

// 删除 /sys/role/{id}

export function delroleApi(id) {
    return request({
      url: `/sys/role/${id}`,
      method: 'DELETE'
    })
  }
 
  // 权限列表 /sys/permission
  export function getpermissionApi() {
    return request({
      url: '/sys/permission',
      method: 'get'
    })
  } 

export function getroleidApi(id) {
    return request({
      url: `/sys/role/${id}`,
      method: 'get'
    })
  }

  // /sys/role/assignPrem

  export function assignRolesApi(data) {
    return request({
      url: '/sys/user/assignPrem',
      method: 'PUT',
      data
    })
  }

  

