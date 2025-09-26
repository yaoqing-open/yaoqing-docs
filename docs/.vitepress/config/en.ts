import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export const en = defineConfig({
  title: 'Yaoqing AI Big Data',
  lang: 'en-US',
  description: 'Yaoqing User Manual - English Version',

  themeConfig: {
    logoLink: { link: "/docs/en/专业模式/1引导/快速开始" },

    nav: nav(),

    sidebar: {
      '/en/': { base: '/en/专业模式/', items: sidebarProfessional() },
      '/en/专业模式/': { base: '/en/专业模式/', items: sidebarProfessional() },
      '/en/GBI 模式/': { base: '/en/GBI 模式/', items: sidebarGbi() }
    },

    editLink: {
      pattern: 'https://github.com/yaoqing-open/yaoqing-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Yaoqing AI Big Data',
      copyright: 'Copyright © 2019-present Yaoqing'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'yaoqing.ai',
      link: 'https://yaoqing.ai',
    },
    {
      text: 'demo',
      link: 'https://demo.yaoqing.ai',
    },
    {
      text: 'Guide',
      link: '/en/专业模式/1引导/快速开始',
      activeMatch: '/en/专业模式/'
    },
    {
      text: 'Reference',
      link: '/en/GBI 模式/1AI 问答/智能问答',
      activeMatch: '/en/GBI 模式/'
    }
  ]
}

function sidebarProfessional(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      collapsed: false,
      items: [
        { text: 'Quick Start', link: '1引导/快速开始' }
      ]
    },
    {
      text: 'Data Source',
      collapsed: false,
      items: [
        { text: 'Data Source', link: '2数据源/数据源' },
      ]
    },
    {
      text: 'Data Management',
      collapsed: false,
      items: [
        { text: 'Data Management', link: '3数据管理/数据管理' },
      ]
    },
    {
      text: 'Data Input',
      collapsed: false,
      items: [
        { text: 'Data Input', link: '4数据接入/数据接入' },
        { text: 'Data Type Mapping', link: '4数据接入/数据类型映射' },
		{ text: 'MySQL Connection Guide', link: '4数据接入/MySQL 接入' },
		{ text: 'TiDB Cloud Connection Guide', link: '4数据接入/TiDB Cloud 接入' },
		{ text: 'FAQ', link: '4数据接入/常见问题' },
      ]
    },
    {
      text: 'Data ETL',
      collapsed: false,
      items: [
        { text: 'ETL', link: '5数据清洗/数据清洗' },
        { text: 'Shortcut Key', link: '5数据清洗/快捷键' },
        { text: 'ETL Specification', link: '5数据清洗/清洗规范' },
        { text: 'Yaoqing SQL', link: '5数据清洗/爻擎 SQL' },
      ]
    },
    {
      text: 'Data Output',
      collapsed: false,
      items: [
        { text: 'Data Output', link: '6数据输出/数据输出' },
      ]
    },
    {
      text: 'DW API',
      collapsed: false,
      items: [
        { text: 'DW API', link: '7数仓 API/数仓 API' },
      ]
    },
    {
      text: 'AI ETL',
      collapsed: false,
      items: [
        { text: 'AI ETL', link: '8AI 清洗/AI 清洗' },
      ]
    },
    {
      text: 'AI QA',
      collapsed: false,
      items: [
        { text: 'AI QA', link: '9AI 问答/AI 问答' },
      ]
    },
    {
      text: 'Cluster Management',
      collapsed: false,
      items: [
        { text: 'Yaoqing Engine', link: '10集群管理/爻擎引擎' },
        { text: 'Yaoqing DW', link: '10集群管理/爻擎数仓' }
      ]
    },
    {
      text: 'System Management',
      collapsed: false,
      items: [
        { text: 'User Management', link: '11系统管理/用户管理' },
        { text: 'PM', link: '11系统管理/项目管理' }
      ]
    }
  ]
}

function sidebarGbi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'AI QA',
      items: [
        { text: 'Intelligent QA', link: '1AI 问答/智能问答' },
        { text: 'Table Expert', link: '1AI 问答/表格专家' },
        { text: 'Dashboard Expert', link: '1AI 问答/大屏专家' },
        { text: 'Analysis Insight Expert', link: '1AI 问答/分析洞察专家' },
      ]
    },
    {
      text: 'AI Data Dashboard',
      items: [
        { text: 'AI Data Dashboard', link: '2AI 数据大屏/AI 数据大屏' },
      ]
    },
    {
      text: 'AI Numerical Warning',
      items: [
        { text: 'AI Numerical Warning', link: '3AI 数值预警/AI 数值预警' },
      ]
    },
    {
      text: 'AI App Store',
      items: [
        { text: 'AI App Store', link: '4AI 应用商店/AI 应用商店' },
        { text: 'PPT Agent', link: '4AI 应用商店/PPT 智能体' },
        { text: 'Legal Agent', link: '4AI 应用商店/法务智能体' },
      ]
    },
    {
      text: 'AI Data Permission',
      items: [
        { text: 'AI Data Permission', link: '5AI 数据权限/AI 数据权限' },
      ]
    },
  ]
}
