export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    css: 'css',
    js: 'js',
    assets: 'assets',
    admin: 'admin'
  });

  eleventyConfig.addCollection('publishedArticles', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('./src/karya/*.md')
      .filter((item) => item.data.published === true)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  eleventyConfig.addFilter('limit', (items, count = 3) => {
    return Array.isArray(items) ? items.slice(0, Number(count)) : [];
  });

  eleventyConfig.addFilter('formatDate', (value) => {
    if (!value) return 'Tanggal belum diatur';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Tanggal belum diatur';
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    }).format(date);
  });

  eleventyConfig.addFilter('dateISO', (value) => {
    if (!value) return undefined;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  });

  eleventyConfig.addFilter('json', (value) => {
    return JSON.stringify(value).replace(/</g, '\\u003c');
  });

  eleventyConfig.addFilter('excerpt', (value, maxLength = 160) => {
    const text = String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const max = Number(maxLength);
    if (text.length <= max) return text;
    return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`;
  });

  eleventyConfig.addFilter('slug', (value) => {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  eleventyConfig.addFilter('xmlEscape', (value) => {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk'
  };
}
