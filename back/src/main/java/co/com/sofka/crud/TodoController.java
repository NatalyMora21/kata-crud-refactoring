package co.com.sofka.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value = "api/todos")
    public Iterable<TodoDTO> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public TodoDTO save(@RequestBody TodoDTO tododto){
        return service.save(tododto);
    }

    @PutMapping(value = "api/todo")
    public TodoDTO update(@RequestBody TodoDTO tododto){
        if(tododto.getId() != null){
            return service.save(tododto);
        }
        throw new RuntimeException("No existe el id para actualziar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public TodoDTO get(@PathVariable("id") Long id){
        return service.get(id);
    }

}
