/* Operator sign-in.
 *
 * Static Web Apps exposes the signed-in principal at /.auth/me. Reading it is
 * the whole point of this page: the previous failure mode was invisible —
 * signed in with the wrong provider, or with no `operator` role, both rendered
 * as a dead link. This states the identity, the provider and the roles, so a
 * failure names itself instead of looking like a 404.
 */

'use strict';

const CONSOLE_PATH = '/internal/d362616165bec7d89ef41fbd/';

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

async function principal() {
  try {
    const r = await fetch('/.auth/me', { credentials: 'include' });
    if (!r.ok) return null;
    const d = await r.json();
    // SWA returns { clientPrincipal: {...} | null }
    return d && d.clientPrincipal ? d.clientPrincipal : null;
  } catch {
    return null;
  }
}

function providerLabel(p) {
  return { aad: 'Microsoft', github: 'GitHub' }[p] || p;
}

async function render() {
  const host = document.getElementById('auth');
  host.textContent = '';
  const p = await principal();

  if (!p) {
    host.append(el('p', 'lede', 'You are not signed in.'));
    const row = el('div', 'row');
    const ms = el('a', 'btn', 'Sign in with Microsoft');
    ms.href = `/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(location.pathname)}`;
    const gh = el('a', 'btn ghost', 'Sign in with GitHub');
    gh.href = `/.auth/login/github?post_login_redirect_uri=${encodeURIComponent(location.pathname)}`;
    row.append(ms, gh);
    host.append(row);
    host.append(el('p', 'muted', 'This is an operator sign-in for internal tools. The GREEN18 iPhone app itself has no accounts and no sign-in.'));
    return;
  }

  const roles = (p.userRoles || []).filter(r => r !== 'anonymous');
  const isOperator = roles.includes('operator');

  const dl = el('dl', 'kv');
  for (const [k, v] of [
    ['Signed in as', p.userDetails || '(no user detail)'],
    ['Provider', providerLabel(p.identityProvider)],
    ['Roles', roles.join(', ') || 'authenticated only'],
  ]) { dl.append(el('dt', null, k), el('dd', null, v)); }
  host.append(dl);

  if (isOperator) {
    host.append(el('p', 'ok', 'You hold the operator role — the model console is open to you.'));
    const row = el('div', 'row');
    const go = el('a', 'btn', 'Open the model console');
    go.href = CONSOLE_PATH;
    row.append(go);
    host.append(row);
  } else {
    host.append(el('p', 'warn',
      `This identity is signed in but does not hold the operator role, so the console will refuse it. `
      + `An invitation must be issued for ${providerLabel(p.identityProvider)} / ${p.userDetails || 'this account'} specifically — a role granted to one provider does not carry to another.`));
  }

  const row2 = el('div', 'row');
  const out = el('a', 'btn ghost', 'Sign out');
  out.href = `/.auth/logout?post_logout_redirect_uri=${encodeURIComponent(location.pathname)}`;
  row2.append(out);

  // Signing in again under the other provider is the usual fix, so offer it
  // rather than making it a URL to remember.
  const other = p.identityProvider === 'aad' ? 'github' : 'aad';
  const alt = el('a', 'btn ghost', `Switch to ${providerLabel(other)}`);
  alt.href = `/.auth/login/${other}?post_login_redirect_uri=${encodeURIComponent(location.pathname)}`;
  row2.append(alt);
  host.append(row2);
}

document.addEventListener('DOMContentLoaded', render);
