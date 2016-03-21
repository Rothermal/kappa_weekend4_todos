var todosArray = [];
var listCount = 0;
$(document).ready(function(){
   init();
});

function init(){
    console.log ('jquery is hot.');
    getTodos();
    enable();
}

function enable(){
    console.log('add some listeners');
    $('.todos-form').on('submit',processForm);
    $('.todos-list').on('click','.completed',updateTodo);
    $('.completed-list').on('click','.completed',updateTodo);
    $('.completed-list').on('click','.delete',removeTodo);
    $('.completed-list').on('click','.show-delete',showDelete);
    $('.completed-list').on('click','.cancel',cancelDelete);
}


function processForm(event){
    event.preventDefault();
    var values = {};
    $.each($('.todos-form').serializeArray(), function(i,field){
        values[field.name] = field.value;
    });
    if(values.todos) {
        postTodos(values);
        $('.todos-form').find('input[type=text]').val("");
    }
}

function postTodos(todos){
    $.ajax({
        type:"POST",
        url:"/todos",
        data: todos,
        success: function (response){
            console.log(response);
            getTodos();
        }
    });

}

function getTodos() {
    $.ajax({
        type: "GET",
        url: "/todos",
        success: function (response) {
            todosArray = response;
            appendDom(todosArray);
            appendCompleted(todosArray);
        }
    });
}

function appendDom(todosArray){
    $('.todos-list').empty();
    listCount = 0;
    for(var i = 0; i < todosArray.length; i++) {
        if (todosArray[i].completed === false) {
            listCount ++;
            $('.todos-list').append('<div class="container todo"></div>');
            $('.todos-list').children().last().data("id", todosArray[i].id);
            $('.todos-list').children().last().data('completed', todosArray[i].completed);
            $('.todos-list').children().last().append('<p>' + listCount + '.  ' + todosArray[i].todos + '</p>');
            $('.todos-list').children().last().append('<button class="btn completed">achieved goal</button>');
            $('.todos-list').children().last().append('<img src="http://icons.iconarchive.com/icons/martin-berube/flat-animal/256/bunny-icon.png">');

        }
    }
}


function updateTodo(){
    var completed = {};
    completed.id = $(this).parent().data('id');
    completed.boolean = $(this).parent().data('completed');
    console.log(completed);
    $.ajax({
        type:"PUT",
        url:"/todos",
        data:completed,
        success: function(response){
            console.log(response);
            getTodos();
        }
    });

}


function removeTodo(){
    var id = {};
    id.number = $(this).parent().data('id');
    console.log(id);
        $.ajax({
            type: "DELETE",
            url: "/todos",
            data: id,
            success: function (response) {
                console.log(response);
                getTodos();
            }
        });

}


function appendCompleted(todosArray){
    $('.completed-list').empty();
    listCount = 0;
    for(var i = 0; i < todosArray.length; i++){

        if(todosArray[i].completed === true){
            listCount ++;
            $('.completed-list').append('<div class="container complete"></div>');
            $('.completed-list').children().last().data("id",todosArray[i].id);
            $('.completed-list').children().last().data('completed',todosArray[i].completed);
            $('.completed-list').children().last().append('<p>'+listCount+'.  '+ todosArray[i].todos +'</p>');
            $('.completed-list').children().last().append('<button class="btn completed">more work to do?</button>');
            $('.completed-list').children().last().append('<button class="btn show-delete">Delete from List</button>');
            $('.completed-list').children().last().append('<button class="btn delete hidden">You ARE aBOUT TO KILL A BUNNY!!</button>');
            $('.completed-list').children().last().append('<button class="btn cancel hidden">SAVE THE BUNNY!!!</button>');
            $('.completed-list').children().last().append('<img src="http://icons.iconarchive.com/icons/martin-berube/flat-animal/256/bunny-icon.png">');

        }
    }

}

function showDelete(){

    var hidden = $(this).parent().children().hasClass('hidden');
    if(hidden){
     $(this).parent().children().removeClass('hidden');
 }
}

function cancelDelete(){
    $('.delete').addClass('hidden');
    $('.cancel').addClass('hidden');

}