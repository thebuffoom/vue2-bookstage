import Layout from '@/layout'
export default {
  path: '/employee',
  name: 'employee',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employee',
      component: () => import('@/views/employee/index'),
      meta: {
        icon: 'people',
        title: '员工管理'
      }
    },
    {
      path: '/employee/useradd/:id?',
      hidden: true,
      component: () => import('@/views/employee/userAdd'),
      meta: {
        title: '员工详情'
      }
    },
    {
      path: '/employee/useradd',
      hidden: true,
      component: () => import('@/views/employee/userAdd'),
      meta: {
        title: '员工详情'
      }
    },
  ]
}
