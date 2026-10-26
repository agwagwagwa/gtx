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
    event.remove({id:"gtceu:assembler/hopper_iron",})
    event.recipes.gtceu.assembler('hopper_iron_plate')
        .itemInputs(
            '#forge:chests/wooden',
            '5x gtceu:iron_plate',
        )
        .itemOutputs(
            '5x minecraft:hopper'
        )
        .duration(800)
        .EUt(2)
    event.remove({id:"gtceu:assembler/hopper_wrought_iron",})
    event.recipes.gtceu.assembler('hopper_wrought_iron_plate')
        .itemInputs(
            '#forge:chests/wooden',
            '5x gtceu:wrought_iron_plate',
        )
        .itemOutputs(
            '5x minecraft:hopper'
        )
        .duration(800)
        .EUt(2)
    event.remove({id:"gtceu:arc_furnace/arc_hopper",})
    event.remove({id:"gtceu:macerator/macerate_hopper",})
    event.remove({id:"gtceu:arc_furnace/arc_hopper_minecart",})
    event.remove({id:"gtceu:macerator/macerate_hopper_minecart",})

            });