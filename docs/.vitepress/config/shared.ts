import { defineConfig } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'
import { search as zhSearch } from './zh'

export const shared = defineConfig({
  rewrites: {
    'zh/:rest*': ':rest*',
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    config(md) {
      // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'en':
              return 'Copy code'
            default:
              return '复制代码'
          }
        })()
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        )
      }
      md.use(groupIconMdPlugin)
    }
  },

  sitemap: {
    hostname: 'https://yaoqing.ai/docs',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/yaoqing-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/docs/yaoqing-logo-mini.png' }],
    ['meta', { name: 'algolia-site-verification', content: '4D087D24AA6EF828' }],
    // ['meta', { name: 'theme-color', content: '#5f67ee' }],
    // ['meta', { property: 'og:type', content: 'website' }],
    // ['meta', { property: 'og:locale', content: 'zh' }],
    // ['meta', { property: 'og:title', content: 'VitePress | Vite & Vue Powered Static Site Generator' }],
    // ['meta', { property: 'og:site_name', content: 'VitePress' }],
    // ['meta', { property: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
    // ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
    // ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
  ],

  themeConfig: {
    // logo: { src: '/yaoqing-logo-mini.svg', width: 24, height: 24 },
    logo: { src: '/yaoqing-logo-mini.svg', width: 42 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yaoqing-open/yaoqing-docs' }
    ],

    // socialLinks: [
    //   { icon: '联系我们2', link: 'https://yaoqing.ai' }
    // ],

    search: {
      provider: 'algolia',
      options: {
        appId: 'G9QCU5H8Q2',
        apiKey: '428aeaceb09352646390506da21e4f89',
        indexName: '爻擎 AI 大数据',
        locales: {
          ...zhSearch,
        }
      }
    },

  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          vitepress: localIconLoader(
            import.meta.url,
            '../../public/yaoqing-logo-mini.svg'
          ),
          firebase: 'logos:firebase'
        }
      })
    ]
  }
})
