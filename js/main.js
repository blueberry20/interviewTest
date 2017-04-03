   
$(document).ready(function(){
    loadData();

    $('#clearBtn').click(function(){
         $('input').val('').css('background-color', '#fff');
    });
});

function loadData(){
    var dataToAppend = '';
    $.ajax({
        type:'GET',
        url: 'https://private-f3b4b-interview2.apiary-mock.com/data',
        dataType: 'json',                
        success: function(data){
            //append rows of data
            data.forEach(function(item){
                var d = new Date(parseInt(item.timestamp, 10));
                var month = d.getMonth() + 1;
                var date = d.getDate();
                var year = d.getFullYear();
                var dataRow = '<div class="dataRow" data-secret="' + item.secret + '">' +
                    '<img class="img-circle" src=' + item.image + ' alt=""/>' +
                    '<p class="name">' + item.name + '</p>' +
                    '<p>' + month + '/' + date + '/' + year + '</p></div>';
                dataToAppend += dataRow;
            });
            $('#dataContainer').append(dataToAppend);

            //on row click, change the text and color of input
            $('.dataRow').click(function(){
                var secret = $(this).attr('data-secret');
                $('input').val(secret).css('background-color', secret);
            });
        },

        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus, errorThrown);
        }
    });
}