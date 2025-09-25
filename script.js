// Toggle project details accordion
function toggleProjectDetails(event, id) {
  event.stopPropagation();
  const details = document.getElementById(id);
  const btn = event.currentTarget;
  if (details.classList.contains('open')) {
    details.classList.remove('open');
    btn.textContent = 'View More';
  } else {
    // Close any other open details
    document.querySelectorAll('.project-details.open').forEach(el => {
      el.classList.remove('open');
      const b = el.parentElement.querySelector('.view-more-btn');
      if (b) b.textContent = 'View More';
    });
    details.classList.add('open');
    btn.textContent = 'View Less';
  }
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  // Animate skill bars every time skills section enters view
  function animateSkills() {
    document.querySelectorAll('.skill .bar div').forEach(bar => {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      // force reflow for restart animation
      void bar.offsetWidth;
      bar.style.transition = 'width 1.2s cubic-bezier(.4,2,.6,1)';
      const target = bar.parentElement.getAttribute('data-width') || bar.style.width || '0%';
      bar.style.width = target;
    });
  }
  // Set data-width for skill bars
  document.querySelectorAll('.skill .bar div').forEach(bar => {
    const width = bar.style.width;
    bar.parentElement.setAttribute('data-width', width);
    bar.style.width = '0%';
  });
  // Intersection Observer for skills
  const skillsSection = document.getElementById('skills');
  if(skillsSection) {
    const observer = new window.IntersectionObserver(entries => {
      if(entries[0].isIntersecting) animateSkills();
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
  }
  // Animate cards and footer on scroll
  const revealEls = document.querySelectorAll('.card, footer');
  const revealObs = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => revealObs.observe(el));
  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
  // Smooth scroll for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Projects section: ripple effect on card click ---
  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('mousedown', function(e) {
      let ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.offsetX - 20) + 'px';
      ripple.style.top = (e.offsetY - 20) + 'px';
      this.appendChild(ripple);
      setTimeout(()=>ripple.remove(), 600);
    });
  });

  // --- Contact section: animate form on submit ---
  const contactForm = document.querySelector('#contact form');
  if(contactForm) {
    contactForm.addEventListener('submit', function() {
      this.classList.add('submitted');
      setTimeout(()=>this.classList.remove('submitted'), 1200);
    });
  }

  // --- Modal animation ---
  const modal = document.getElementById('projectModal');
  if(modal) {
    modal.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  }
});

function openModal(project) {
  const modal = document.getElementById('projectModal');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDesc');
  if(project==='Apki Seva'){
    title.textContent = 'Apki Seva';
    desc.textContent = 'A web platform for certificate issuance, monitoring, and resource allocation.';
  } else {
    title.textContent = 'Sarvangin Shiksha';
    desc.textContent = 'Platform to reduce student dropout rates with analytics and real-time alerts.';
  }
  modal.style.display = 'flex';
  modal.style.animation = 'fadeIn 0.4s';
}

function closeModal(){
  const modal = document.getElementById('projectModal');
  modal.style.display = 'none';
}

function sendMessage(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\nContact Email: ${email}`);
  window.location.href = `mailto:dongaremayur56@gmail.com?subject=${subject}&body=${body}`;
  document.getElementById('submittedMsg').classList.remove('hidden');
  // Animate the submit message
  const msg = document.getElementById('submittedMsg');
  msg.style.transition = 'opacity 0.5s';
  msg.style.opacity = 1;
  setTimeout(()=>{ msg.style.opacity = 0; }, 1800);
  return false;
}
