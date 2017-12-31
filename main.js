$(document).ready(function(){
  $('#add-task-form').on('submit', function(e){
    addTask();
  });

  displayTasks();

//function to display Tasks from local storage
  function displayTasks(){
    var taskList = JSON.parse(localStorage.getItem('tasks'));
    if(taskList != null){
      taskList= taskList.sort(sortByTime);
    }
    //set counter for loop
    var i = 0;
    //check tasks
    if(localStorage.getItem('tasks') != null){
      $.each(taskList, function(key, value){
        $('#task-table').append('<tr id="'+ value.id + '">' + '<td>' + value.task + '</td>' + '<td>' + value.task_priority + '</td>' + '<td>' + value.task_date + '</td>' + '<td>' + value.task_time + '</td>' + '<td><a href="edit.html?id=' + value.id +'">Edit</a> | <a href="#" id="remove-task">Remove</a></td>' + '</tr>')
      });
    }
  }

//function to sort tasks by time
  function sortByTime(a, b){
    var aTime = a.task_time;
    var bTime = b.task_time;
    return((aTime < bTime) ? -1 : (aTime > bTime) ? 1 : 0);
  }
//function to add a new task
  function addTask(e){
//json parse to turn strings into objects, stringify to reverse this

//add a unique id
    var newDate = new Date();
    id = newDate.getTime();

    var task = $('#task').val();
    var task_priority = $('#priority').val();
    var task_date = $('#date').val();
    var task_time = $('#time').val();

    if(task_priority == ""){
      task_priority = "normal";
    } else {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
        if(tasks == null){
          tasks = [];
        }
        //new task object
      var newTask = {
        "id": id,
        "task": task,
        "task_date": task_date,
        "task_time": task_time,
        "task_priority": task_priority
      }
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  };
});
