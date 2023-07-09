import request from '@/utils/request'

// /company/department
export function departmentApi() {
    return request({
      url: '/company/department',
      method: 'get'
    })
  }

//   /sys/user/simple
export function departsimpleApi() {
    return request({
      url: '/sys/user/simple',
      method: 'get'
    })
  }