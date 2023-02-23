async function getArticles(page) {
  const response = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}`);
  const pages = await response.headers.get('X-Pagination-Pages');
  const data = await response.json();
  return { data, pages };
}

const root = document.querySelector('#root');

function renderPagination(pages, currPage) {
  const pagesTotal = Number(pages);
  const page = Number(currPage);
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');

  function createPageLink(text, href) {
    const pageLink = document.createElement('a');
    pageLink.href = `index.html?page=${href}`;
    pageLink.textContent = text;
    pageLink.classList.add('page-link');
    if (Number(text) === page) {
      pageLink.classList.add('page-link--active');
    }
    return pageLink;
  }

  if (page > 1) {
    pagination.append(createPageLink('<', page - 1));
    pagination.append(createPageLink('1', 1));
  }

  if (page < pagesTotal - 3) {
    for (let i = page; i <= page + 3; i++) {
      pagination.append(createPageLink(i, i));
    }
  }

  pagination.append(createPageLink('...', '#'));

  if (page >= pagesTotal - 3) {
    for (let i = pagesTotal - 3; i < pagesTotal; i++) {
      pagination.append(createPageLink(i, i));
    }
  }
  pagination.append(createPageLink(`${pagesTotal}`, pagesTotal));
  if (page < pagesTotal) {
    pagination.append(createPageLink('>', page + 1));
  }
  root.append(pagination);
}

async function renderArticles() {
  const page = new URLSearchParams(window.location.search).get('page') || 1;
  const responseData = await getArticles(page);
  const articlesData = responseData.data;
  const totalPages = responseData.pages;
  const articlesList = document.createElement('ul');
  articlesList.classList.add('articles-list');
  for (const article of articlesData) {
    const articleLi = document.createElement('li');
    articleLi.classList.add('article-item');
    const articleLink = document.createElement('a');
    articleLink.href = `post.html?id=${article.id}`;
    const heading = document.createElement('h2');
    heading.classList.add('article-heading');
    const text = document.createElement('p');
    text.classList.add('article-text');
    articleLink.classList.add('article', 'article-link');
    heading.textContent = article.title;
    text.textContent = article.body;
    articleLink.append(heading);
    articleLink.append(text);
    articleLi.append(articleLink);
    articlesList.append(articleLi);
  }
  root.append(articlesList);

  renderPagination(totalPages, page);
}

renderArticles();
