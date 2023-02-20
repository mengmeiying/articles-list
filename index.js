async function getArticles(page) {
  const response = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}`);
  const data = response.json();
  return data;
}

const root = document.querySelector('#root');

function renderPagination() {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  for (let i = 1; i <= 10; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = `index.html?page=${i}`;
    pageLink.textContent = `page ${i}`;
    pageLink.classList.add('page-link');
    pagination.append(pageLink);
  }
  root.append(pagination);
}

async function renderArticles() {
  const page = new URLSearchParams(window.location.search).get('page') || 1;
  const articlesData = await getArticles(page);
  for (const article of articlesData) {
    const articleLink = document.createElement('a');
    articleLink.href = `post.html?id=${article.id}`;
    const heading = document.createElement('h2');
    const text = document.createElement('p');
    articleLink.classList.add('article', 'article-link');
    heading.textContent = article.title;
    text.textContent = article.body;
    articleLink.append(heading);
    articleLink.append(text);
    root.append(articleLink);
  }

  renderPagination();
}

renderArticles();
