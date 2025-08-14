import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: '爻擎 AI 大数据',
  description: '爻擎使用文档-中文文档',

  themeConfig: {
    logoLink: { link: "/专业模式/1引导/首页" },

    nav: nav(),

    sidebar: {
      '/': { base: '/专业模式/', items: sidebarProfessional() },
      '/专业模式/': { base: '/专业模式/', items: sidebarProfessional() },
      '/GBI 模式/': { base: '/GBI 模式/', items: sidebarGbi() }
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '爻擎 AI 大数据',
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 爻擎`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '爻擎官网',
      link: 'https://yaoqing.ai',
    },
    {
      text: '专业模式',
      link: '专业模式/1引导/首页',
      // link: '首页',
      activeMatch: '/专业模式/'
    },
    {
      text: 'GBI 模式',
      link: '/GBI 模式/1AI 问答/智能问答',
      activeMatch: '/GBI 模式/'
    },
    // {
    //   text: pkg.version,
    //   items: [
    //     {
    //       text: '更新日志',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
    //     },
    //     {
    //       text: '参与贡献',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
    //     }
    //   ]
    // }
  ]
}

function sidebarProfessional(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '引导',
      collapsed: false,
      items: [
        // { text: '首页', link: '../../首页' },
        { text: '首页', link: '1引导/首页' },
        { text: '快速开始', link: '1引导/快速开始' }
      ]
    },
    {
      text: '数据源',
      collapsed: false,
      items: [
        { text: '数据源', link: '2数据源/数据源' },
      ]
    },
    {
      text: '数据管理',
      collapsed: false,
      items: [
        { text: '数据管理', link: '3数据管理/数据管理' },
      ]
    },
    {
      text: '数据接入',
      collapsed: false,
      items: [
        { text: '数据接入', link: '4数据接入/数据接入' },
        { text: '数据类型映射', link: '4数据接入/数据类型映射' },
      ]
    },
    {
      text: '数据清洗',
      collapsed: false,
      items: [
        { text: '数据清洗', link: '5数据清洗/数据清洗' },
        { text: '快捷键', link: '5数据清洗/快捷键' },
        { text: '清洗规范', link: '5数据清洗/清洗规范' },
        { text: '爻擎 SQL', link: '5数据清洗/爻擎 SQL' },
      ]
    },
    {
      text: '数据输出',
      collapsed: false,
      items: [
        { text: '数据输出', link: '6数据输出/数据输出' },
      ]
    },
    {
      text: '数仓 API',
      collapsed: false,
      items: [
        { text: '数仓 API', link: '7数仓 API/数仓 API' },
      ]
    },
    {
      text: 'AI 清洗',
      collapsed: false,
      items: [
        { text: 'AI 清洗', link: '8AI 清洗/AI 清洗' },
      ]
    },
    {
      text: 'AI 问答',
      collapsed: false,
      items: [
        { text: 'AI 问答', link: '9AI 问答/AI 问答' },
      ]
    },
    {
      text: '集群管理',
      collapsed: false,
      items: [
        { text: '爻擎引擎', link: '10集群管理/爻擎引擎' },
        { text: '爻擎数仓', link: '10集群管理/爻擎数仓' }
      ]
    },
    {
      text: '系统管理',
      collapsed: false,
      items: [
        { text: '用户管理', link: '11系统管理/用户管理' },
        { text: '项目管理', link: '11系统管理/项目管理' }
      ]
    }
  ]
}

function sidebarGbi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'AI 问答',
      items: [
        { text: '智能问答', link: '1AI 问答/智能问答' },
        { text: '表格专家', link: '1AI 问答/表格专家' },
        { text: '大屏专家', link: '1AI 问答/大屏专家' },
        { text: '分析洞察专家', link: '1AI 问答/分析洞察专家' },
      ]
    },
    {
      text: 'AI 数据大屏',
      items: [
        { text: 'AI 数据大屏', link: '2AI 数据大屏/AI 数据大屏' },
      ]
    },
    {
      text: 'AI 数值预警',
      items: [
        { text: 'AI 数值预警', link: '3AI 数值预警/AI 数值预警' },
      ]
    },
    {
      text: 'AI 应用商店',
      items: [
        { text: 'AI 应用商店', link: '4AI 应用商店/AI 应用商店' },
        { text: 'PPT 智能体', link: '4AI 应用商店/PPT 智能体' },
        { text: '法务智能体', link: '4AI 应用商店/法务智能体' },
      ]
    },
    {
      text: 'AI 数据权限',
      items: [
        { text: 'AI 数据权限', link: '5AI 数据权限/AI 数据权限' },
      ]
    },
  ]
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  root: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}
