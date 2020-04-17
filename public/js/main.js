var username;
$(function () {
    $('.ui.basic.modal')
        .modal({
            closable: false,
            onApprove: function () {
                username = $('.username').val()
                if (username === '') {
                    console.log("enter username");
                    alert("Enter Username");
                    return false
                }
                $('.label').text(username);
                console.log(username);                
                var socket = io();
                $('form').submit(function (e) {
                    e.preventDefault();
                    socket.emit('chat', $('#inputMessage').val(), username);
                    $('#inputMessage').val('');
                    return false;
                });
                socket.on('chat', function (msg, username) {
                    $('#messages').append($('<li>').text(username + " : " + msg));
                });
            }
        }).modal('show');
});

