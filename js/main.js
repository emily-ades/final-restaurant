  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBN8zsvBq2ks9kHriFOrijL_k678jJkYjY",
    authDomain: "reservation-site-final.firebaseapp.com",
    databaseURL: "https://reservation-site-final.firebaseio.com",
    projectId: "reservation-site-final",
    storageBucket: "",
    messagingSenderId: "969274086413"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var reservationData = {}

  $('.reservation-day li').on('click', function() {
    reservationData.day = $(this).text();
  });
  
  $('.reservation-form').on('submit', function(e) {
    e.preventDefault();
    reservationData.name = $('.reservation-name').val();
    var reservationsReference = database.ref('reservations');
    reservationsReference.push(reservationData);
  });

function getReservations() {
    database.ref('reservations').on('value', function(results) {
        var allReservations = results.val();
        for (var reservation in allReservations) {
            var context = {
            name: allReservations[reservation].name,
            day: allReservations[reservation].day,
            reservationId: reservation
            };
            var source = $("#entry-template").html();
            var template = Handlebars.compile(source);
            var reservationRow = template(context);
            $('.reservation-list').append(reservationRow);
        }
    });
}
  
getReservations();

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.8054491, lng: -73.9654415},
        zoom: 10,
        scrollwheel: false
    });
    var marker = new google.maps.Marker({
        position: {lat: 40.8054491, lng: -73.9654415},
        map: map,
        title: 'Monks Café'
    });
}