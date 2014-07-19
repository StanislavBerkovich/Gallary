// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

var $animation_type = 0;


$(document).ready(function () {
    $('#photos').ready(function () {
        slideShow();
    });

    $('#fadeIn').click(function () {
        $animation_type = 0;
    });


    $('#slide').click(function () {
        $animation_type = 1;
    });

    $('#simple').click(function () {
        $animation_type = 2;
    });
});

function slideShow() {
    var current = $('#photos .show');
    var next = current.next().length ? current.next() : current.siblings().first();

    current.hide();
    current.removeClass('show');
    use_animation(next);
    next.addClass('show');

    setTimeout(slideShow, 5000);
};

function use_animation(element) {
    if ($animation_type === 0)
        element.fadeIn(1000);
    else if ($animation_type === 1)
        element.show('slide');
    else if ($animation_type === 2)
        element.show(null)

};

$(document).on('page:change', function () {
    $('#modal').ready(function () {

        $('#myModal').modal('toggle')

    });

    $("#pictures-list").sortable({
        connectWith: '.connected',
        placeholder: 'ui-state-highlight',
        receive: function (event, ui) {
            adopt(this)
        },
        remove: function (event, ui) {
            orphan(this)
        }
    }).disableSelection();

});




function adopt(which) {
    if ($(which).hasClass('empty')) {
        $(which).removeClass('empty').find('.empty').remove();
    }
}


function orphan(which) {
    if ($(which).children().length == 0) {
        $(which)
            .append($('<li class="empty">empty</li>'))
            .addClass('empty');
    }
}









