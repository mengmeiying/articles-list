async function getArticle(id) {
  const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const data = response.json();
  return data;
}

async function getArticleComments(id) {
  const response = await fetch(`https://gorest.co.in/public-api/posts/${id}/comments`);
  const data = response.json();
  return data;
}

async function renderArticle() {
  const root = document.querySelector('#root');
  const id = new URLSearchParams(window.location.search).get('id');
  const article = await getArticle(id);
  const articleData = article.data;

  const articleElement = document.createElement('div');
  articleElement.classList.add('article');

  const heading = document.createElement('h2');
  heading.textContent = articleData.title;
  articleElement.append(heading);

  const text = document.createElement('p');
  text.textContent = articleData.body;
  articleElement.append(text);

  root.append(articleElement);

  const commentsData = await getArticleComments(id);
  console.log(commentsData);

  for (const comment of commentsData.data) {
    console.log(comment);
    const commentElement = document.createElement('div');
    const commentHeading = document.createElement('h3');
    commentHeading.textContent = comment.name;

    const commentText = document.createElement('p');
    commentText.textContent = comment.body;

    commentElement.append(commentHeading);
    commentElement.append(commentText);

    root.append(commentElement);
  }
}

renderArticle();
