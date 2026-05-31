/**
 * RoomView.js
 * VIEW layer (MVC)
 * Bertanggung jawab atas seluruh manipulasi DOM dan tampilan UI.
 */

var RoomView = (function () {

  // ── Helper label ───────────────────────────────────────────────────
  var STATUS_LABEL = {
    'masuk'       : '✅ Dosen Masuk',
    'menunggu'    : '⏳ Menunggu',
    'tidak-masuk' : '❌ Dosen Tidak Masuk',
    'kosong'      : '🔘 Kosong',
  };

  var STATUS_BADGE_TEXT = {
    'masuk'       : 'Dosen Masuk',
    'menunggu'    : 'Menunggu',
    'tidak-masuk' : 'Tdk Masuk',
    'kosong'      : 'Kosong',
  };

  var STATUS_BADGE_CLASS = {
    'masuk'       : 'badge-masuk',
    'menunggu'    : 'badge-menunggu',
    'tidak-masuk' : 'badge-tidak',
    'kosong'      : 'badge-kosong',
  };

  var STATUS_ICON = {
    'masuk'       : '✔',
    'menunggu'    : '⏳',
    'tidak-masuk' : '✗',
    'kosong'      : '—',
  };

  // ── Screen management ──────────────────────────────────────────────
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }

  // ── Toast ──────────────────────────────────────────────────────────
  var _toastTimer = null;
  function showToast(msg, duration) {
    duration = duration || 2500;
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { t.classList.remove('show'); }, duration);
  }

  // ── Role Select ────────────────────────────────────────────────────
  function setRoleSelected(role) {
    document.getElementById('cardRelator').classList.toggle('selected',   role === 'relator');
    document.getElementById('cardMahasiswa').classList.toggle('selected', role === 'mahasiswa');
    document.getElementById('btnMasuk').disabled = false;
  }

  // ── Dashboard ──────────────────────────────────────────────────────
  function renderTopbar(role) {
    var d = new Date();
    document.getElementById('topbarRole').textContent = role === 'relator' ? 'Relator Kelas' : 'Mahasiswa';
    document.getElementById('topbarDate').textContent = d.toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long',
    });
  }

  function renderStats(stats) {
    document.getElementById('statMasuk').textContent   = stats.masuk;
    document.getElementById('statMenunggu').textContent = stats.menunggu;
    document.getElementById('statKosong').textContent  = stats.kosong;
  }

  function renderFloorTabs(floor) {
    document.getElementById('tabLt6').classList.toggle('active', floor === 6);
    document.getElementById('tabLt7').classList.toggle('active', floor === 7);
    document.getElementById('floorLabel').textContent = 'Lantai ' + floor;
  }

  function renderRoomGrid(rooms, onRoomClick) {
    var grid = document.getElementById('roomGrid');
    grid.innerHTML = '';

    rooms.forEach(function (r) {
      var card = document.createElement('div');
      card.className = 'room-card ' + r.status;
      card.innerHTML =
        '<div class="room-num">' + r.id + '</div>' +
        '<div class="room-dosen">' + (r.dosen ? r.dosen.nama : '—') + '</div>' +
        '<div class="room-mapel">' + (r.mapel || 'Tidak ada jadwal') + '</div>' +
        '<span class="room-badge ' + STATUS_BADGE_CLASS[r.status] + '">' +
          STATUS_BADGE_TEXT[r.status] +
        '</span>';
      card.addEventListener('click', function () { onRoomClick(r.id); });
      grid.appendChild(card);
    });
  }

  // ── Detail ─────────────────────────────────────────────────────────
  function renderDetail(room, role, onMasuk, onTidakMasuk) {
    // Header status
    var hdr = document.getElementById('detailStatusHeader');
    hdr.className = 'detail-status-header ' + room.status;

    var icon = document.getElementById('detailStatusIcon');
    icon.className   = 'status-icon si-' + room.status;
    icon.textContent = STATUS_ICON[room.status];

    document.getElementById('detailTitle').textContent = 'Ruangan ' + room.id;
    document.getElementById('detailRoomNum').textContent = 'Ruangan ' + room.id;

    var lbl = document.getElementById('detailStatusLabel');
    lbl.className   = 'status-label ' + room.status;
    lbl.textContent = STATUS_LABEL[room.status];

    // Info rows
    document.getElementById('dLantai').textContent = 'Lantai ' + room.lantai;
    document.getElementById('dKode').textContent   = room.dosen ? room.dosen.kode : '-';
    document.getElementById('dDosen').textContent  = room.dosen ? room.dosen.nama : 'Tidak ada jadwal';
    document.getElementById('dMapel').textContent  = room.mapel  || '-';
    document.getElementById('dWaktu').textContent  = room.waktu  || '-';
    document.getElementById('dStatus').textContent = STATUS_LABEL[room.status];
    document.getElementById('dUpdate').textContent = room.updatedAt;
    document.getElementById('dBy').textContent     = room.updatedBy;

    // Action buttons
    var area = document.getElementById('actionArea');
    area.innerHTML = '';

    if (role === 'relator' && room.dosen) {
      var btnMasuk = document.createElement('button');
      btnMasuk.className   = 'btn-masuk';
      btnMasuk.textContent = '✅ Dosen Masuk';
      btnMasuk.addEventListener('click', onMasuk);

      var btnTidak = document.createElement('button');
      btnTidak.className   = 'btn-tidak';
      btnTidak.textContent = '❌ Dosen Tidak Masuk';
      btnTidak.addEventListener('click', onTidakMasuk);

      area.appendChild(btnMasuk);
      area.appendChild(btnTidak);
    } else {
      var note = document.createElement('p');
      note.className   = 'readonly-note';
      note.textContent = role === 'mahasiswa'
        ? 'Anda hanya dapat melihat status (read-only)'
        : 'Ruangan ini tidak memiliki jadwal';
      area.appendChild(note);
    }
  }

  // ── Public API ─────────────────────────────────────────────────────
  return {
    showScreen,
    showToast,
    setRoleSelected,
    renderTopbar,
    renderStats,
    renderFloorTabs,
    renderRoomGrid,
    renderDetail,
  };

})();
