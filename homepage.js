'use strict';
const content = window.siteContent || {};
for (const key of ['name', 'tagline', 'bio']) {
  document.getElementById(key).textContent = content[key] || '';
}
if (content.name) document.title = content.name;
function safeUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
if (Array.isArray(content.games) && content.games.length) {
  const list = document.getElementById('game-list');
  list.replaceChildren();
  for (const game of content.games) {
    const card = document.createElement('article');
    card.className = 'empty game';
    const title = document.createElement('h3');
    title.textContent = game.title || '';
    const description = document.createElement('p');
    description.textContent = game.description || '';
    card.append(title, description);
    const url = safeUrl(game.url);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = 'Play ↗';
      card.append(link);
    }
    list.append(card);
  }
}
for (const item of Array.isArray(content.links) ? content.links : []) {
  const url = safeUrl(item.url);
  if (!url || !item.label) continue;
  const link = document.createElement('a');
  link.href = url;
  link.textContent = item.label + ' ↗';
  document.getElementById('link-list').append(link);
}
