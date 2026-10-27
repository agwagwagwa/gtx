ServerEvents.recipes(event => {


    event.shaped(
        Item.of('gtceu:primitive_furnace'),
            [ 'SSS',
              'SFS',
              'SSS'],
            {S:'minecraft:stone_bricks',
             F:'minecraft:furnace',
            })
    event.recipes.gtceu.primitive_furnace('copper_ore')
        .itemInputs('8x minecraft:raw_copper')
        .itemInputs('minecraft:coal')
        .itemOutputs('8x minecraft:copper_ingot')
        .duration(100);

})