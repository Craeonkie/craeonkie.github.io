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
    const contributions = Array.isArray(game.contributions)
      ? game.contributions.filter(value => typeof value === 'string' && value.trim())
      : [];
    if (contributions.length) {
      const section = document.createElement('section');
      section.className = 'game-contribution';
      const heading = document.createElement('h4');
      heading.textContent = 'My contribution';
      const items = document.createElement('ul');
      for (const contribution of contributions) {
        const item = document.createElement('li');
        item.textContent = contribution;
        items.append(item);
      }
      section.append(heading, items);
      card.append(section);
    }
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

// Move only decorative layers; text and controls remain stationary.
const hero = document.querySelector('.hero');
const pointerMotion = window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
let motionFrame = 0;
let pointerX = 0;
let pointerY = 0;
function resetBackground() {
  cancelAnimationFrame(motionFrame);
  motionFrame = 0;
  hero.style.removeProperty('--pointer-x');
  hero.style.removeProperty('--pointer-y');
}
hero.addEventListener('pointermove', (event) => {
  if (!pointerMotion.matches || event.pointerType === 'touch') return;
  const bounds = hero.getBoundingClientRect();
  pointerX = ((event.clientX - bounds.left) / bounds.width - .5) * 36;
  pointerY = ((event.clientY - bounds.top) / bounds.height - .5) * 28;
  if (motionFrame) return;
  motionFrame = requestAnimationFrame(() => {
    hero.style.setProperty('--pointer-x', `${pointerX}px`);
    hero.style.setProperty('--pointer-y', `${pointerY}px`);
    motionFrame = 0;
  });
});
hero.addEventListener('pointerleave', resetBackground);
window.addEventListener('blur', resetBackground);
pointerMotion.addEventListener('change', resetBackground);

// Keep milestones in the supplied order, allowing dates or academic terms.
const milestones = Array.isArray(content.timeline)
  ? content.timeline.filter(item => item && typeof item.title === 'string' && item.title.trim())
  : [];
if (milestones.length) {
  const list = document.getElementById('timeline-list');
  for (const milestone of milestones) {
    const item = document.createElement('li');
    const date = document.createElement('p');
    date.className = 'milestone-date';
    date.textContent = milestone.date || '';
    const title = document.createElement('h3');
    title.textContent = milestone.title;
    const description = document.createElement('p');
    description.className = 'milestone-description';
    description.textContent = milestone.description || '';
    item.append(date, title, description);
    list.append(item);
  }
  list.hidden = false;
  document.getElementById('timeline-empty').hidden = true;
}

// Hash links and keyboard navigation share the same tab selection.
const portfolioTabs = Array.from(document.querySelectorAll('.portfolio-tabs [role="tab"]'));
const panelIds = portfolioTabs.map(tab => tab.getAttribute('aria-controls'));
function selectPortfolioTab(id, moveFocus = false) {
  if (!panelIds.includes(id)) id = 'about';
  for (const tab of portfolioTabs) {
    const panelId = tab.getAttribute('aria-controls');
    const selected = panelId === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(panelId);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    panel.hidden = !selected;
    if (selected && moveFocus) tab.focus();
  }
}
portfolioTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    const id = tab.getAttribute('aria-controls');
    selectPortfolioTab(id);
    history.replaceState(null, '', '#' + id);
  });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % portfolioTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + portfolioTabs.length) % portfolioTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = portfolioTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const id = portfolioTabs[next].getAttribute('aria-controls');
    selectPortfolioTab(id, true);
    history.replaceState(null, '', '#' + id);
  });
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const id = link.getAttribute('href').slice(1);
  if (!panelIds.includes(id)) return;
  link.addEventListener('click', event => {
    event.preventDefault();
    selectPortfolioTab(id);
    history.pushState(null, '', '#' + id);
    document.querySelector('.portfolio-tabs').scrollIntoView({block:'start'});
    document.getElementById('tab-' + id).focus({preventScroll:true});
  });
});
window.addEventListener('hashchange', () => selectPortfolioTab(location.hash.slice(1)));
selectPortfolioTab(location.hash.slice(1));
