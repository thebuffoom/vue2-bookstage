import Layout from '@/layout'
export default {
  path: '/approval',
  component: Layout,
  children: [
    {
      path: 'approval',
      name: 'approval',
      component: () => import('@/views/approval/index'),
      meta: {
        icon: '',
        title: '审批管理'
      }
    }
  ]
}
