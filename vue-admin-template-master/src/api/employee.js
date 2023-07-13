import request from '@/utils/request'

export function getemployeeApi(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}
export function addemployeeApi(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

export function getEnabledRoles() {
  return request({
    url: `/sys/role/list/enabled`,
  });
}

// /sys/user/{id}

export function roleApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get',
  })
}

// /sys/user/assignRoles
export function assignRolesApi(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}


export function getroleApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get',
  })
}