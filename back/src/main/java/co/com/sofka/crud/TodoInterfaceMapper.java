package co.com.sofka.crud;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TodoInterfaceMapper {

    TodoDTO toTodoDto(Todo todo);



    List<TodoDTO> toTodosDto (List <Todo> todo);
    //Conexion entre mi dto y me entidad

    @InheritInverseConfiguration
    Todo totodo(TodoDTO todoDTO);






}
