let activeCat = 'All';
let uploadedImgBase64 = '';

const VALID_USERNAME = '000';
const VALID_PASSWORD = '000';

function toggleSidebar() {
    const sidebar = document.getElementById('sidebarPanel');
    if (!sidebar) return;
    sidebar.classList.toggle('open');
}

function setCategory(cat, el) {
    activeCat = cat;
    document.querySelectorAll('.sidebar-link').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');

    const sidebar = document.getElementById('sidebarPanel');
    if (sidebar) sidebar.classList.remove('open');

    filterLands();
}

function filterLands() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.olx-card');

    cards.forEach(card => {
        const matchesCat = activeCat === 'All' || card.getAttribute('data-category') === activeCat;
        const matchesSearch = card.innerText.toLowerCase().includes(q);

        if (matchesCat && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImgBase64 = e.target.result;
            document.getElementById('previewImg').src = uploadedImgBase64;
            document.getElementById('previewImg').style.display = 'block';
            document.getElementById('previewText').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'flex';
}

function openChat(title) {
    document.getElementById('chatTargetTitle').innerText = 'Inquire: ' + title;
    document.getElementById('chatModal').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function sendMsg() {
    const name = document.getElementById('buyerName').value.trim();
    const msg = document.getElementById('buyerMsg').value.trim();

    if (!name || !msg) {
        alert('Please enter your name and message.');
        return;
    }

    alert('Message delivered to the owner! Calls are restricted until the owner approves your inquiry.');
    closeModal('chatModal');
    document.getElementById('buyerName').value = '';
    document.getElementById('buyerPurpose').value = '';
    document.getElementById('buyerMsg').value = '';
}

function publishLand() {
    const title = document.getElementById('postTitle').value.trim();
    const cat = document.getElementById('postCat').value;
    const area = document.getElementById('postArea').value.trim() || '1 Acre';
    let price = document.getElementById('postPrice').value.trim() || '30,000';
    const loc = document.getElementById('postLoc').value.trim();

    if (!title || !loc) {
        alert('Please fill out the Title and Location fields.');
        return;
    }

    if (!price.includes('₹')) price = '₹ ' + price;
    const imgSrc = uploadedImgBase64 || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80';

    const newCard = document.createElement('div');
    newCard.className = 'olx-card';
    newCard.setAttribute('data-category', cat);
    newCard.innerHTML = `
    <div class="card-img-box">
      <span class="featured-tag" style="background:#00a49f; color:#fff;">New</span>
      <img src="${imgSrc}" alt="${title}" />
    </div>
    <div class="card-content">
      <div class="price">${price} / yr</div>
      <div class="details">${area} &bull; ${cat}</div>
      <div class="title">${title}</div>
      <div class="card-bottom">
        <span>${loc}</span>
        <button class="btn-msg" onclick="openChat('${title}')">Chat / Msg</button>
      </div>
    </div>
  `;

    document.getElementById('landGrid').prepend(newCard);
    closeModal('uploadModal');
    alert('Your plot has been posted on Lrental successfully!');

    document.getElementById('postTitle').value = '';
    document.getElementById('postArea').value = '';
    document.getElementById('postPrice').value = '';
    document.getElementById('postLoc').value = '';
    document.getElementById('postPhoto').value = '';
    document.getElementById('previewImg').style.display = 'none';
    document.getElementById('previewText').style.display = 'block';
    uploadedImgBase64 = '';
}

document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebarPanel');
    const hamburger = document.querySelector('.hamburger-btn');

    if (!sidebar || !hamburger) return;

    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedHamburger = hamburger.contains(event.target);

    if (!clickedInsideSidebar && !clickedHamburger && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            window.location.href = 'admin.html';
        } else {
            alert('Invalid username or password. Use 000 for both.');
        }
    });
}
