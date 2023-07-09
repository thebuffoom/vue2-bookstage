// 全局注册svg-icon组件

// 引入Vue
import Vue from 'vue'
// 引入SvgIcon组件
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// 全局注册组件 Vue.component('组件名',组件)
Vue.component('svg-icon', SvgIcon)

// 引入目录svg下的所有svg文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
