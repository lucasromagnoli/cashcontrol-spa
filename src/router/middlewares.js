export default function updatePageTitle(to, from, next) {
  const title = to.matched.find((item) => item.meta.title);

  if (title) {
    window.document.title = title.meta.title;
  }

  next();
}
