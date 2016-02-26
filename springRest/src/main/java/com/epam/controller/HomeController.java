package com.epam.controller;

import com.epam.controller.lcp.Calc;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

@RestController
public class HomeController {

    @CrossOrigin
    @RequestMapping(value = "/calc", method = RequestMethod.POST, produces="application/json", consumes="application/json")
    public @ResponseBody
    Calc calc(@RequestBody String expression){
        Object result = new Object();
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode actualObj = mapper.readTree(expression);
            String parsedExpressionString = actualObj.get("expression").asText();

            //TODO not sure if this is best solution for evaluating expression
            ScriptEngineManager manager = new ScriptEngineManager();
            ScriptEngine engine = manager.getEngineByName("js");
            result = engine.eval(parsedExpressionString.replace("\"", ""));

        } catch (Exception e) {

        }
        return new Calc(result.toString());
    }

}
