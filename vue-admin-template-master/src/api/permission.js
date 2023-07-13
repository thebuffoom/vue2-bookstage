import request from '@/utils/request'

//  获取所有权限点 /sys/permission 
export function getpermissionApi() {
    return request({
      url: '/sys/permission',
      method: 'get'
    })
  }
// 添加权限点
  export function addpermissionApi(data) {
    return request({
      url: '/sys/permission',
      method: 'post',
      data
    })
  }

  //  根据ID获取权限点详情 /sys/permission/{id}

  export function updatepermissionApi(id) {
    return request({
      url: `/sys/permission/${id}`,
      method: 'get'
    })
  }
  export function editpermissionApi(id) {
    return request({
      url: `/sys/permission/${id}`,
      method: 'PUT'
    })
  }
  export function delpermissionApi(id) {
    return request({
      url: `/sys/permission/${id}`,
      method: 'DELETE'
    })
  }
  