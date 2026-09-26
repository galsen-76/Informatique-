// Comportements de la maquette (dans le vrai projet : composables Vue)
function basculerTheme() {
  const r = document.documentElement;
  r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark';
}

// Filtres par techno + recherche (FiltreTechnos.vue, RechercheProjets.vue → un computed dans le vrai projet)
let techno = '';
const recherche = document.querySelector('#recherche');
function appliquerFiltres() {
  const q = (recherche?.value || '').trim().toLowerCase();
  let visibles = 0;
  document.querySelectorAll('[data-technos]').forEach(carte => {
    const ok = (!techno || carte.dataset.technos.split(',').includes(techno)) && (!q || carte.textContent.toLowerCase().includes(q));
    carte.hidden = !ok;
    if (ok) visibles++;
  });
  const compteur = document.querySelector('#compteur');
  if (compteur) compteur.textContent = visibles + (visibles > 1 ? ' projets' : ' projet');
  const vide = document.querySelector('#vide');
  if (vide) vide.hidden = visibles > 0;
}
document.querySelectorAll('.filtres').forEach(groupe => {
  const boutons = groupe.querySelectorAll('.filtre');
  boutons.forEach(b => b.addEventListener('click', () => {
    boutons.forEach(x => x.classList.remove('actif'));
    b.classList.add('actif');
    techno = b.dataset.techno;
    appliquerFiltres();
  }));
});
recherche?.addEventListener('input', appliquerFiltres);

// Formulaire de contact : validation simulée (VeeValidate + Zod dans le vrai projet)
const form = document.querySelector('#form-contact');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[data-champ]').forEach(champ => {
      const input = champ.querySelector('input, textarea, select');
      const erreur = champ.querySelector('.erreur');
      let msg = '';
      if (!input.value.trim()) msg = 'Ce champ est obligatoire.';
      else if (input.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) msg = 'Adresse e-mail invalide.';
      else if (input.tagName === 'TEXTAREA' && input.value.trim().length < 20) msg = 'Au moins 20 caractères.';
      erreur.textContent = msg;
      champ.classList.toggle('invalide', !!msg);
      if (msg) ok = false;
    });
    document.querySelector('#succes').hidden = !ok;
  });
}

// Menu mobile
document.querySelector('.burger')?.addEventListener('click', e => {
  const h = document.querySelector('header');
  h.classList.toggle('ouvert');
  e.currentTarget.setAttribute('aria-expanded', h.classList.contains('ouvert'));
});
