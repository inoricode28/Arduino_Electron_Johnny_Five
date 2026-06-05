$('a.btn-neon').on('click', function(e) {
    e.preventDefault();
    var $btn = $(this);
    var pin = parseInt($btn.data('pin'));
    window.electronAPI.toggleLed(pin);
    $btn.toggleClass('activo');
});
