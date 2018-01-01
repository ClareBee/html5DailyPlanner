$(document).ready(function(){
  //add task event
  $('#add-task-form').on('submit', function(e){
    addTask(e);
  });
  // edit event
  $('#edit-task-form').on('submit', function(e){
    updateTask(e)
  });
  displayTasks();

//remove task event
  $('#task-table').on('click', '#remove-task', function(){
    id = $(this).data('id');
    removeTask(id);
  });

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
        $('#task-table').append('<tr id="'+ value.id + '">' + '<td>' + value.task + '</td>' + '<td>' + value.task_priority + '</td>' + '<td>' + value.task_date + '</td>' + '<td>' + value.task_time + '</td>' + '<td><a href="edit.html?id=' + value.id +'">Edit</a> | <a href="#" id="remove-task" data-id="' + value.id + '">Remove</a></td>' + '</tr>')
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

  function updateTask(){
    var id = $('#task_id').val();
    var task = $('#task').val();
    var task_priority = $('#priority').val();
    var task_date = $('#date').val();
    var task_time = $('#time').val();

    if(task_priority == ""){
      task_priority = "normal";
    } else {
      var taskList = JSON.parse(localStorage.getItem('tasks'));
        if(tasks == null){
          tasks = [];
        }
      for(var i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
          taskList.splice(i, 1);
          }
        localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    }
  };
  function removeTask(id){
    if(confirm("are you sure you want to delete this task?")){
      var taskList = JSON.parse(localStorage.getItem('tasks'));
      for(var i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
          taskList.splice(i, 1);
          }
        localStorage.setItem('tasks', JSON.stringify(taskList));
        }
      location.reload();
    }

  }
});

//function for getting a single task (separate from whether or not doc is ready)
function getTask(){
  var $_GET = getQueryParams(document.location.search);
  id = $_GET['id'];
  var taskList = JSON.parse(localStorage.getItem('tasks'));
  for(var i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      $('#edit-task-form #task_id').val(taskList[i].id);
      $('#edit-task-form #task').val(taskList[i].task);
      $('#edit-task-form #priority').val(taskList[i].task_priority);
      $('#edit-task-form #date').val(taskList[i].task_date);
      $('#edit-task-form #time').val(taskList[i].task_time);
    }
  }
}

//function to get HTTP GET Request info
function getQueryParams(qs){
  qs = qs.split("+").join(" ");
  var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

      while(tokens = re.exec(qs)){
        params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);
      }
      return params;
}
