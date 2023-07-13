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

// 新增部门 /company/department

export function adddeparApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 修改部门 /company/department/{id}

export function updatedepartmentApi(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 确认编辑接口 
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method:'PUT',
    data
  })
}