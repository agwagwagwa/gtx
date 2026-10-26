ServerEvents.recipes(event => {
    event.shaped(
           Item.of("4x minecraft:chest"),
            [ 'AAA',
              'A A',
              'AAA'],
            {A: '#minecraft:logs',})

    event.shaped(
           Item.of("16x minecraft:stick"),
            [ 'A',
              'A'],
            {A: '#minecraft:logs',})
    event.forEachRecipe({id:"gtceu:shaped/hopper"}, recipe => {
        const result = recipe.json.getAsJsonObject("result")
        result.remove("count")
        result["addProperty(java.lang.String,java.lang.Number)"]("count", 5)
    })
            });