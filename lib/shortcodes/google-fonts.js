const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36';

const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async (url) => {
  const content = await Cache(url, {
    duration: '1d',
    type: 'text',
    fetchOptions: {
      headers: {
        "user-agent": UA
      }
    }
  });

  return (
    `<link rel="preconnect" href="https://fonts.gstatic.com">` +
    `<link data-href="${url}" rel="stylesheet">` +
    `<style data-href='${url}'>${content}</style>`
  );
};
