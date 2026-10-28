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
        .itemInputs('#minecraft:coals')
        .itemOutputs('8x minecraft:copper_ingot')
        .duration(200);

    event.recipes.gtceu.primitive_furnace('tin_ore')
        .itemInputs('8x gtceu:raw_tin')
        .itemInputs('#minecraft:coals')
        .itemOutputs('8x gtceu:tin_ingot')
        .duration(200);

    event.recipes.gtceu.primitive_furnace('bronze_ingot_alloy')
        .itemInputs('6x minecraft:copper_ingot')
        .itemInputs('2x gtceu:tin_ingot')
        .itemInputs('#minecraft:coals')
        .itemOutputs('8x gtceu:bronze_ingot')
        .duration(200);

    event.recipes.gtceu.primitive_furnace('firebrick_smelting')
        .itemInputs('8x gtceu:compressed_fireclay')
        .itemInputs('#minecraft:coals')
        .itemOutputs('8x gtceu:firebrick')
        .duration(200);

    event.recipes.gtceu.primitive_furnace('brick_smelting')
        .itemInputs('8x minecraft:clay_ball')
        .itemInputs('#minecraft:coals')
        .itemOutputs('8x minecraft:brick')
        .duration(200);

    event.recipes.gtceu.primitive_furnace('stone_smelting')
        .itemInputs('32x minecraft:cobblestone')
        .itemInputs('#minecraft:coals')
        .itemOutputs('32x minecraft:stone')
        .duration(200);

        event.recipes.gtceu.primitive_furnace('smooth_stone_smelting')
        .itemInputs('32x minecraft:stone')
        .itemInputs('#minecraft:coals')
        .itemOutputs('32x minecraft:smooth_stone')
        .duration(200);

})