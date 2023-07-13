import Layout from '@/layout'
export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social/index'),
      meta: {
        icon: 'table',
        title: '社保管理'
      }
    }
  ]
}
