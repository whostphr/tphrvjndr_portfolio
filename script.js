/* =====================================================
   Topher Vijandre - Portfolio
   script.js
   Features:
   1. Dark / Light mode toggle (remembers your choice)
   2. Smooth scroll for all anchor links
   3. Auto-updating year in the footer
   ===================================================== */

'use strict';

/* ---------- 1. Dark / Light mode ---------- */

// Key name used to save the theme in the browser
const THEME_KEY = 'portfolio-theme';

// The <html> element, where we put the data-theme attribute
const root = document.documentElement;

/**
 * Gets the saved theme from localStorage.
 * Returns 'light' if nothing is saved or storage is blocked.
 */
function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch (error) {
    return 'light';
  }
}

/**
 * Saves the chosen theme so it stays after a page refresh.
 * @param {string} theme - 'light' or 'dark'
 */
function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // Storage is blocked, so the theme just won't be remembered.
  }
}

/**
 * Applies a theme to the page and updates the toggle button text.
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
  // CSS reads this attribute to switch colors
  root.setAttribute('data-theme', theme);

  // The button may not exist yet when this first runs, so check first
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const isDark = theme === 'dark';
  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  button.querySelector('.theme-toggle__icon').textContent = isDark ? '\u2600' : '\u263E';
  button.querySelector('.theme-toggle__label').textContent = isDark ? 'Light' : 'Dark';
}

// Apply the saved theme right away so the page doesn't flash the wrong colors
applyTheme(getSavedTheme());

/**
 * Switches between light and dark when the button is clicked.
 */
function toggleTheme() {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
}

/* ---------- 2. Smooth scroll ---------- */

/**
 * Makes every link that starts with "#" scroll smoothly to its section.
 */
function initSmoothScroll() {
  // Skip the animation for people who prefer reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const id = link.getAttribute('href');
      const target = id.length > 1 ? document.querySelector(id) : null;
      if (!target) return;

      // Stop the instant jump and scroll smoothly instead
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

      // Update the address bar link without jumping
      history.pushState(null, '', id);
    });
  });
}

/* ---------- 3. Footer year ---------- */

/**
 * Writes the current year in the footer.
 */
function setFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------- Start everything once the page is ready ---------- */
document.addEventListener('DOMContentLoaded', function () {
  // Re-apply the theme now that the toggle button exists
  applyTheme(getSavedTheme());

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  initSmoothScroll();
  setFooterYear();
});
