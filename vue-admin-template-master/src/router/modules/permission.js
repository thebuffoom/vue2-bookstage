import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/index'),
      meta: {
        icon: 'lock',
        title: '权限管理'
      }
    }
  ]
}
