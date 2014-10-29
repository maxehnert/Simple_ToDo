var ToDo = function (options) {
  options = options || {};
  this.task = options.task || '';
  this.elem = options.elem;
  this.done = false;
};

// Collection of ToDo's
var todo_list = [];

// Setup my Template
var task_template = $('#task_items').html();
var rendered = _.template(task_template);

var task, contents;
$('#sendMessage').on('submit', function (event) {
  event.preventDefault();

  console.log($(this));
  console.log($(this)[0]);

  // Grag the task value
  contents = $('#text').val();

  // Create a new ToDo instance
  task = new ToDo({
    task: contents,
    elem: $(rendered({ task: contents }))[0]
  });

  // Add to my todo_list
  todo_list.push(task);

  // Show our task on the page
  $('#todoList').append(task.elem);

  // Reset my form
  $(this)[0].reset();

});


// Manage ToDo items 
var todo_modifier;
$('#todoList').on('click', 'li', function (event) {
  event.preventDefault();

  // Find the instance of my task
  todo_modifier = _.findWhere(todo_list, { elem: $(this)[0] });

  // If it's done, mark it undone, else mark it done
  if (todo_modifier.done) {
    todo_modifier.done = false;
    $(this).removeClass('done');
  } else {
    todo_modifier.done = true;
    $(this).addClass('done');
  }

});