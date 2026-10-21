export default {
  layout: 'layouts/article.njk',
  ogType: 'article',
  eleventyComputed: {
    permalink: (data) => `/karya/${data.page.fileSlug}/index.html`,
    robots: (data) => data.published === true ? 'index, follow' : 'noindex, nofollow'
  }
};
