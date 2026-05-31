/**
 * AppController.js
 * CONTROLLER layer (MVC)
 * Menghubungkan Model dan View, menangani seluruh event pengguna.
 */

var AppController = (function () {

  // ── Role Select ────────────────────────────────────────────────────
  function _onRoleClick(role) {
    RoomModel.setRole(role);
    RoomView.setRoleSelected(role);
  }

  function _onGoToDashboard() {
    var role = RoomModel.getRole();
    if (!role) return;

    RoomView.renderTopbar(role);
    _renderDashboard();
    RoomView.showScreen('dashboard');
  }

  // ── Dashboard ──────────────────────────────────────────────────────
  function _renderDashboard() {
    var floor = RoomModel.getFloor();
    var stats = RoomModel.getStats();
    var rooms = RoomModel.getRoomsByFloor(floor);

    RoomView.renderStats(stats);
    RoomView.renderFloorTabs(floor);
    RoomView.renderRoomGrid(rooms, _onRoomClick);
  }

  function _onFloorSwitch(floor) {
    RoomModel.setFloor(floor);
    _renderDashboard();
  }

  // ── Detail ─────────────────────────────────────────────────────────
  function _onRoomClick(roomId) {
    _renderDetail(roomId);
    RoomView.showScreen('detail');
  }

  function _renderDetail(roomId) {
    var room = RoomModel.getRoomById(roomId);
    var role = RoomModel.getRole();

    RoomView.renderDetail(
      room,
      role,
      function () { _onKonfirmasi(roomId, RoomModel.STATUS.MASUK); },
      function () { _onKonfirmasi(roomId, RoomModel.STATUS.TIDAK_MASUK); }
    );
  }

  function _onKonfirmasi(roomId, newStatus) {
    RoomModel.updateRoomStatus(roomId, newStatus);

    // Re-render detail in-place (tanpa showScreen agar tidak ada flash)
    _renderDetail(roomId);

    var msg = newStatus === RoomModel.STATUS.MASUK
      ? '✅ Status diperbarui: Dosen Masuk'
      : '❌ Status diperbarui: Dosen Tidak Masuk';
    RoomView.showToast(msg);
  }

  function _onBackToDashboard() {
    // Refresh dashboard supaya statistik ikut berubah
    _renderDashboard();
    RoomView.showScreen('dashboard');
  }

  // ── Init ───────────────────────────────────────────────────────────
  function init() {
    RoomModel.init();

    // Role select
    document.getElementById('cardRelator')
      .addEventListener('click', function () { _onRoleClick('relator'); });
    document.getElementById('cardMahasiswa')
      .addEventListener('click', function () { _onRoleClick('mahasiswa'); });
    document.getElementById('btnMasuk')
      .addEventListener('click', _onGoToDashboard);

    // Floor tabs
    document.getElementById('tabLt6')
      .addEventListener('click', function () { _onFloorSwitch(6); });
    document.getElementById('tabLt7')
      .addEventListener('click', function () { _onFloorSwitch(7); });

    // Back button
    document.getElementById('btnBack')
      .addEventListener('click', _onBackToDashboard);
  }

  return { init };

})();
