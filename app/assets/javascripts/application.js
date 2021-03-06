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
var $slide_time = 5000;

function slideShow() {
    if($('#photos').length == 0) {
        $slide_time = 5000;
        $animation_type = 0;
        return
    }
    var current = $('#photos .show');
    var next = current.next().length ? current.next() : current.siblings().first();

    current.hide();
    current.removeClass('show');
    use_animation(next);
    next.addClass('show');

    setTimeout(slideShow, $slide_time);
};

function use_animation(element) {
    if ($animation_type === 0)
        element.fadeIn(1000);
    else if ($animation_type === 1)
        element.show('slide');
    else if ($animation_type === 2)
        element.show(null)

};

var on_load = function () {

    $("#photos").sortable({
        connectWith: '.connected',
        placeholder: 'ui-state-highlight',
        receive: function (event, ui) {
            adopt(this)
        },
        remove: function (event, ui) {
            orphan(this)
        }
    }).disableSelection();

    $('#go').click(function(){
        $('.delete').remove()
        $(this).remove()
        elements = $('.show')
        elements.removeClass('show')
        elements.addClass('slide')
        elements.last().removeClass('slide')
        elements.last().addClass('show')
        slideShow();
    });



    $('#fadeIn').click(function () {
        $animation_type = 0;
    });

    $('#time').on('input', function(){
        $slide_time = this.value * 1000
    });


    $('#slide').click(function () {
        $animation_type = 1;
    });

    $('#simple').click(function () {
        $animation_type = 2;
    });
    $('.delete').click(function(){
        $(this).parent().remove()
    });


}

$(document).on('page:load', on_load );

$(document).ready(on_load);




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











