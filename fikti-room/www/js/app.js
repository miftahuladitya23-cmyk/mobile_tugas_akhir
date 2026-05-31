/**
 * app.js
 * Entry point aplikasi FIKTI Room.
 * Menginisialisasi controller setelah splash screen selesai.
 */

document.addEventListener('DOMContentLoaded', function () {

  // Tampilkan splash selama 2.2 detik, lalu pindah ke role select
  setTimeout(function () {
    AppController.init();
    RoomView.showScreen('roleSelect');
  }, 2200);

});
