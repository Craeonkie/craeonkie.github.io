'use strict';
const content = window.siteContent || {};
for (const key of ['name', 'tagline', 'bio']) {
  document.getElementById(key).textContent = content[key] || '';
}
if (content.name) document.title = content.name;
const nameElement = document.getElementById('name');
const nameParts = (content.name || '').trim().split(/\s+/);
if (nameParts.length > 1) {
  const accent = document.createElement('span');
  accent.className = 'name-accent';
  accent.textContent = nameParts.pop();
  nameElement.replaceChildren(document.createTextNode(nameParts.join(' ') + ' '), accent);
}
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
    const images = Array.isArray(game.images) ? game.images.filter(image => image && typeof image.src === 'string' && image.src.trim()) : [];
    if (images.length) {
      const galleryButton = document.createElement('button');
      galleryButton.type = 'button';
      galleryButton.className = 'game-gallery-button';
      galleryButton.setAttribute('aria-label', 'My contribution to ' + (game.title || 'this game'));
      const cover = document.createElement('img');
      cover.src = images[0].src;
      cover.alt = images[0].alt || (game.title || 'Game') + ' screenshot';
      cover.loading = 'lazy';
      const label = document.createElement('span');
      label.textContent = 'What did I contribute? ↗';
      galleryButton.append(cover, label);
      galleryButton.addEventListener('click', () => openGameContribution(game));
      card.prepend(galleryButton);
    }
    const url = safeUrl(game.url);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = 'Play on itch.io ↗';
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
    const schoolUrl = safeUrl(milestone.url);
    if (schoolUrl) {
      const schoolLink = document.createElement('a');
      schoolLink.href = schoolUrl;
      schoolLink.textContent = milestone.title + ' ↗';
      title.append(schoolLink);
    } else {
      title.textContent = milestone.title;
    }
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



// Native dialog supports Escape, focus containment, and returning to the opener.
const contributionDialog = document.createElement('dialog');
contributionDialog.className = 'game-gallery contribution-dialog';
contributionDialog.setAttribute('aria-labelledby','contribution-title');
contributionDialog.innerHTML = '<div class="gallery-heading"><h2 id="contribution-title"></h2><button type="button" class="gallery-close" aria-label="Close contribution details">Close ×</button></div><h3>My contribution</h3><div class="contribution-body"></div>';
document.body.append(contributionDialog);
let contributionOpener;
function openGameContribution(game) {
  contributionOpener=document.activeElement;
  contributionDialog.querySelector('h2').textContent=game.title || 'Game';
  const body=contributionDialog.querySelector('.contribution-body');
  body.replaceChildren();
  const entries=Array.isArray(game.contributions) ? game.contributions.filter(value=>typeof value==='string' && value.trim()) : [];
  if(entries.length){
    const summary=document.createElement('p');
    summary.textContent=entries.join(' ');
    body.append(summary);
  }else{
    const empty=document.createElement('p');
    empty.textContent='Contribution details coming soon.';
    body.append(empty);
  }
  contributionDialog.showModal();
  document.body.classList.add('gallery-open');
  contributionDialog.querySelector('button').focus();
}
contributionDialog.querySelector('button').addEventListener('click',()=>contributionDialog.close());
contributionDialog.addEventListener('click',event=>{
  const bounds=contributionDialog.getBoundingClientRect();
  if(event.target===contributionDialog && (event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom))contributionDialog.close();
});
contributionDialog.addEventListener('close',()=>{
  document.body.classList.remove('gallery-open');
  contributionOpener?.focus();
});
