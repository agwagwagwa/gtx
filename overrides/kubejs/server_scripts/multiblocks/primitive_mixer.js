ServerEvents.recipes(event => {


    event.shaped(
        Item.of('gtceu:primitive_mixer'),
            [ 'GRG',
              'GCG',
              'FBF'],
            {G:'minecraft:glass',
             F:'gtceu:bronze_frame',
             B:'gtceu:firebricks',
             C:'gtceu:bronze_brick_casing',
             R:'gtceu:bronze_rotor'
            })
    event.recipes.gtceu.primitive_mixer('copper_ore')
        .itemInputs('gtceu:galena_dust')
        .inputFluids(Fluid.of('minecraft:water', 1000))
        .itemOutputs('gtceu:lead_dust')
        .outputFluids(Fluid.of('gtceu:sulfuric_acid', 1000))//FIXME NEEDS TO NOT BE SULFURIC ACID NEEDS TO BE SULFURIC WASTE WATER
        .EUt(4)
        .duration(100)

})