package co.com.sofka.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;
    @Autowired
    private TodoInterfaceMapper mappertodo;
    public Iterable<TodoDTO> list(){
        List <Todo> todolist =  (List<Todo>) repository.findAll();
        return mappertodo.toTodosDto(todolist);
    }

    public TodoDTO save(TodoDTO todoDTO){
        Todo todo = mappertodo.totodo(todoDTO);
        return mappertodo.toTodoDto(repository.save(todo));
    }

    public void delete(Long id){
        Todo todo = mappertodo.totodo(get(id));
        repository.delete(todo);
    }

    public TodoDTO get(Long id){
         return repository.findById(id).map(Todo -> mappertodo.toTodoDto(Todo)).orElseThrow();

    }

}
