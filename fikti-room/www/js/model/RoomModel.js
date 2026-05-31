/**
 * RoomModel.js
 * MODEL layer (MVC)
 * Bertanggung jawab atas data dan logika bisnis aplikasi.
 */

var RoomModel = (function () {

  // ── Konstanta data master ──────────────────────────────────────────
  var DOSEN = [
    { kode: 'DSN-A', nama: 'Dosen A' },
    { kode: 'DSN-B', nama: 'Dosen B' },
    { kode: 'DSN-C', nama: 'Dosen C' },
    { kode: 'DSN-D', nama: 'Dosen D' },
  ];

  var MAPEL = [
    'Pemrograman Mobile', 'Basis Data', 'Jaringan Komputer',
    'Algoritma & Pemrograman', 'Sistem Operasi', 'Kecerdasan Buatan',
    'Rekayasa Perangkat Lunak', 'Pemrograman Web',
  ];

  var WAKTU = [
    '07:30 – 09:10', '09:20 – 11:00', '11:10 – 12:50',
    '13:00 – 14:40', '14:50 – 16:30',
  ];

  // Status yang valid
  var STATUS = {
    MASUK       : 'masuk',
    MENUNGGU    : 'menunggu',
    TIDAK_MASUK : 'tidak-masuk',
    KOSONG      : 'kosong',
  };

  // ── State aplikasi ─────────────────────────────────────────────────
  var _rooms = [];
  var _role  = null;
  var _floor = 6;

  // ── Inisialisasi data ruangan ──────────────────────────────────────
  function _init() {
    var nums = [601, 602, 603, 604, 701, 702, 703, 704, 705, 706, 707, 708];
    _rooms = nums.map(function (num, i) {
      var lantai   = num >= 700 ? 7 : 6;
      var hasSched = Math.random() > 0.2;
      var dIdx     = i % DOSEN.length;
      var statusKeys = Object.values(STATUS);
      var statusIdx  = hasSched ? Math.floor(Math.random() * 3) : 3;

      return {
        id        : num,
        lantai    : lantai,
        dosen     : hasSched ? DOSEN[dIdx] : null,
        mapel     : hasSched ? MAPEL[i % MAPEL.length] : null,
        waktu     : hasSched ? WAKTU[i % WAKTU.length] : null,
        status    : statusKeys[statusIdx],
        updatedAt : hasSched ? 'Baru saja' : '-',
        updatedBy : (hasSched && statusKeys[statusIdx] !== STATUS.MENUNGGU) ? 'Relator Kelas' : '-',
      };
    });
  }

  // ── Public API ─────────────────────────────────────────────────────

  function init()              { _init(); }
  function getRooms()          { return _rooms; }
  function getFloor()          { return _floor; }
  function getRole()           { return _role; }

  function setRole(role)       { _role = role; }
  function setFloor(floor)     { _floor = floor; }

  function getRoomsByFloor(floor) {
    return _rooms.filter(function (r) { return r.lantai === floor; });
  }

  function getRoomById(id) {
    return _rooms.find(function (r) { return r.id === id; });
  }

  function updateRoomStatus(id, newStatus) {
    var room = getRoomById(id);
    if (!room) return false;
    room.status    = newStatus;
    room.updatedAt = 'Baru saja';
    room.updatedBy = 'Relator Kelas';
    return true;
  }

  function getStats() {
    return {
      masuk    : _rooms.filter(function (r) { return r.status === STATUS.MASUK; }).length,
      menunggu : _rooms.filter(function (r) { return r.status === STATUS.MENUNGGU; }).length,
      kosong   : _rooms.filter(function (r) {
        return r.status === STATUS.KOSONG || r.status === STATUS.TIDAK_MASUK;
      }).length,
    };
  }

  return {
    STATUS,
    init,
    getRooms,
    getFloor,
    getRole,
    setRole,
    setFloor,
    getRoomsByFloor,
    getRoomById,
    updateRoomStatus,
    getStats,
  };

})();
