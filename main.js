$(document).ready(function(){
  $('#add-task-form').on('submit', function(){
    addTask();
  });

//function to add a new task
  function addTask(){
//json parse to turn strings into objects, stringify to reverse this

//add a unique id
    var newDate = new Date();
    id = newDate.getTime();

    var task = $('#task').val();
    alert(task);
  };
});
