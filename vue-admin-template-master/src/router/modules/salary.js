import Layout from '@/layout'
export default {
  path: '/salary',
  component: Layout,
  children: [
    {
      path: '',
      name: 'salary',
      component: () => import('@/views/salary/index'),
      meta: {
        icon: '',
        title: '工资管理'
      }
    }
  ]
}
