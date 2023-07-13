import Layout from '@/layout'
export default {
  path: '/approval',
  name: 'approval',
  component: Layout,
  children: [
    {
      path: 'approval',
      name: 'approval',
      component: () => import('@/views/approval/index'),
      meta: {
        icon: 'tree-table',
        title: '审批管理'
      }
    }
  ]
}
