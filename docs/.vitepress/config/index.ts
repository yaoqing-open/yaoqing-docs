import { defineConfig } from 'vitepress'
// import { algoliasearch } from 'algoliasearch'
import { shared } from './shared'
import { zh } from './zh'
import { en } from './en'

export default defineConfig({
  base: '/docs',
  ...shared,
  locales: {
    root: { label: '简体中文', ...zh },
    en: { label: 'English', ...en },
  }
})



// const client = algoliasearch('G9QCU5H8Q2', '51a09e47a34ca029cf351ebb02ac4279');

// // Fetch and index objects in Algolia
// const processRecords = async () => {
//   const datasetRequest = await fetch('https://dashboard.algolia.com/api/1/sample_datasets?type=movie');
//   const movies = await datasetRequest.json();
//   return await client.saveObjects({ indexName: 'yaoqing', objects: movies });
// };

// processRecords()
//   .then(() => console.log('Successfully indexed objects!'))
//   .catch((err) => console.error(err));
