$(document).ready(function () {

    //     Descrizione:
    // Creazione di una todo list con le seguenti funzionalità, attraverso l’uso delle API, AJAX, jQuery e Handlebars
    // Lettura di tutti i todo
    // Creazione nuovo todo
    // Cancellazione todo

    // Refs
    var inputTodo = $('.new-todo'); // input
    var todoBtn = $('.todo-btn'); // send todo button
    var todoContent = $('.todo-content'); // content todo


    // init Handlebars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);

    // API 
    var apiUrl = 'http://157.230.17.132:3012/todos';

    /*********
    * Actions 
    **********/

    // print todo
    printTodo(apiUrl, template, todoContent);

    // new todo input
    todoBtn.click(function(){
        createTodo(apiUrl, inputTodo, template, todoContent)
    });

    // remove todo 
    $(document).on('click', '.icon-remove', function() {
        removeTodo ($(this), apiUrl, template, todoContent)
    });



}); // <-- End Doc Ready



/**********************************************
* Function
**********************************************/
// remove todo 
function removeTodo (self, apiUrl, template, todoContent) {
    var todoId = self.data('id')

    // chiamata api
    $.ajax({
        url: apiUrl + '/' + todoId,
        method: 'DELETE',
        success: function() {
            printTodo(apiUrl, template, todoContent);
        },
        error: function() {
            console.log('si è verificato un errore nella cancellazione del todo');
        }
    })
}

// create new todo
function createTodo (apiUrl, input, template, todoContent) {
    // new todo
    var newTodo = input.val().trim();

    // chiamata ajax
    $.ajax({
        url: apiUrl,
        method: 'POST',
        data: {
            text: newTodo
        },
        success: function() {
            printTodo(apiUrl, template, todoContent);
        },
        error: function() {
            console.log('si è verificato un errore nella creazione del todo');
        }
    })
}

// get all to do from api
function printTodo (apiUrl, template, todoContent) {
    // clean up
    todoContent.html('');

    // ajax
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(data) {
            var todos = data;
            
            for (var i = 0; i < data.length; i++) {
                var todo = todos[i];
                
                var context = {
                    todo: todo.text,
                    id: todo.id
                }

                // print on html
                var html = template(context);
                todoContent.append(html);
            }
            
        },

        error: function() {
            console.log('si è verificato un errore');
            
        }
    });
}