// package com.example.todolist;

// import com.example.todolist.model.Task;
// import com.example.todolist.persistence.TasksPersistence;
// import com.example.todolist.service.ToDoService;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.*;
// import java.sql.Date;
// import java.util.*;

// import static org.mockito.Mockito.*;
// import static org.junit.jupiter.api.Assertions.*;

// class ToDoServiceTest {

//     @Mock
//     private TasksPersistence tasksPersistence;
//     @InjectMocks
//     private ToDoService toDoService;
//     private Task task;
//     private Date currentDate;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//         currentDate = new Date(System.currentTimeMillis());
//         task = new Task(1L, "Test Task", "Description of task", currentDate, currentDate, false);
//     }
//     @Test
//     void testFindAll() {
//         List<Task> taskList = Arrays.asList(task);
//         when(tasksPersistence.findAll()).thenReturn(taskList);
//         List<Task> result = toDoService.findAll();
//         assertNotNull(result);
//         assertEquals(1, result.size());
//         assertEquals("Test Task", result.get(0).getName());
//     }
//     @Test
//     void testGetTaskByIdFound() {
//         when(tasksPersistence.findById(1L)).thenReturn(Optional.of(task));
//         Task result = toDoService.getTaskById(1L);
//         assertNotNull(result);
//         assertEquals("Test Task", result.getName());
//     }
//     @Test
//     void testGetTaskByIdNotFound() {
//         when(tasksPersistence.findById(1L)).thenReturn(Optional.empty());
//         Task result = toDoService.getTaskById(1L);
//         assertNull(result);
//     }
//     @Test
//     void testCreateTask() {
//         when(tasksPersistence.save(any(Task.class))).thenReturn(task);
//         toDoService.createTask(task);
//         verify(tasksPersistence, times(1)).save(task);
//     }
//     @Test
//     void testUpdateTask() {
//         Task updatedTask = new Task(1L, "Updated Task", "Updated Description", currentDate, currentDate, true);
//         when(tasksPersistence.findById(1L)).thenReturn(Optional.of(task));
//         when(tasksPersistence.save(any(Task.class))).thenReturn(updatedTask);
//         toDoService.updateTask(1L, updatedTask);
//         assertEquals("Updated Task", task.getName());
//         assertTrue(task.getIsCompleted());
//         verify(tasksPersistence, times(1)).save(task);
//     }
//     @Test
//     void testUpdateTaskNotFound() {
//         Task updatedTask = new Task(1L, "Updated Task", "Updated Description", currentDate, currentDate, true);
//         when(tasksPersistence.findById(1L)).thenReturn(Optional.empty());
//         assertThrows(NoSuchElementException.class, () -> {
//             toDoService.updateTask(1L, updatedTask);
//         });
//     }
//     @Test
//     void testDeleteTask() {
//         doNothing().when(tasksPersistence).deleteById(1L);
//         toDoService.deleteTask(1L);
//         verify(tasksPersistence, times(1)).deleteById(1L);
//     }
//     @Test
//     void testSearchTaskWithoutSearchTerm() {
//         List<Task> taskList = Arrays.asList(task);
//         when(tasksPersistence.findAll()).thenReturn(taskList);
//         List<Task> result = toDoService.searchTask(null, null);
//         assertNotNull(result);
//         assertEquals(1, result.size());
//     }
//     @Test
//     void testSearchTaskWithSearchTerm() {
//         List<Task> taskList = Arrays.asList(task);
//         when(tasksPersistence.findAll()).thenReturn(taskList);
//         List<Task> result = toDoService.searchTask("Test", null);
//         assertNotNull(result);
//         assertEquals(1, result.size());
//         assertTrue(result.get(0).getName().contains("Test"));
//     }
//     @Test
//     void testSearchTaskWithCompletionStatus() {
//         List<Task> taskList = Arrays.asList(task);
//         when(tasksPersistence.findAll()).thenReturn(taskList);
//         List<Task> result = toDoService.searchTask(null, false);
//         assertNotNull(result);
//         assertEquals(1, result.size());
//         assertFalse(result.get(0).getIsCompleted());
//     }
//     @Test
//     void testSearchTaskWithNoResults() {
//         List<Task> taskList = Arrays.asList(task);
//         when(tasksPersistence.findAll()).thenReturn(taskList);
//         List<Task> result = toDoService.searchTask("Nonexistent", null);
//         assertNotNull(result);
//         assertTrue(result.isEmpty());
//     }
// }
