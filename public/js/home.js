$(document).ready(function () {
    $('#search').click(function () {
        $('#result').text("Loading...");
        var city = $('#city').val();

        if (city == '') {
            alert("please enter  the city name...");
            return;
        }

        $.ajax({
            url: `/api/weather?city=${city} `,           
            type: "GET",
            success: function (data) {                
                $('#result').text(data);
                $('#city').val('');
            },
            error: function (err) {                
                $('#result').text("Unable to find");
            }
        });
    });
});
