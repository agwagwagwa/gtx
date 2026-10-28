ServerEvents.recipes(event => {
    event.remove({id:"gtceu:shaped/steam_extractor_bronze",})
    event.shaped(
        Item.of('gtceu:lp_steam_extractor'),
            [ 'PPP',
              'ICG',
              'PPP'],
            {P:'gtceu:bronze_small_fluid_pipe',
             G:'minecraft:glass',
             C:'gtceu:bronze_brick_casing',
             I:'#forge:pistons',
            })
    event.remove({id:"gtceu:shaped/steam_macerator_bronze",})
    event.shaped(
        Item.of('gtceu:lp_steam_macerator'),
            [ 'EPE',
              'PCP',
              'IPI'],
            {P:'gtceu:bronze_small_fluid_pipe',
             C:'gtceu:bronze_brick_casing',
             I:'#forge:pistons',
             E:'gtceu:small_bronze_gear',
            })
    event.remove({id:"gtceu:shaped/steam_compressor_bronze",})
    event.shaped(
        Item.of('gtceu:lp_steam_compressor'),
            [ 'PPP',
              'ICI',
              'PPP'],
            {P:'gtceu:bronze_small_fluid_pipe',
             C:'gtceu:bronze_brick_casing',
             I:'#forge:pistons',
            })
    event.remove({id:"gtceu:shaped/steam_hammer_bronze",})
    event.shaped(
        Item.of('gtceu:lp_steam_forge_hammer'),
            [ 'PIP',
              'PCP',
              'PAP'],
            {P:'gtceu:bronze_small_fluid_pipe',
             C:'gtceu:bronze_brick_casing',
             I:'#forge:pistons',
             A:'minecraft:anvil',
            })
    event.remove({id:"gtceu:shaped/steam_rock_breaker_bronze",})
    event.shaped(
        Item.of('gtceu:lp_steam_rock_crusher'),
            [ 'IPI',
              'PCP',
              'EPE'],
            {P:'gtceu:bronze_small_fluid_pipe',
             C:'gtceu:bronze_brick_casing',
             I:'#forge:pistons',
             E:'gtceu:small_bronze_gear',
            })
    event.remove({id:"gtceu:shaped/steam_miner_bronze",})
    event.shaped(
        Item.of('gtceu:lp_steam_miner'),
            [ 'EPE',
              'PCP',
              'EPE'],
            {P:'gtceu:bronze_small_fluid_pipe',
             C:'gtceu:bronze_brick_casing',
             E:'gtceu:small_bronze_gear',
            })
/*
            {P:'gtceu:bronze_small_fluid_pipe',
             C:'gtceu:bronze_brick_casing',
             G:'minecraft:glass',
             I:'#forge:pistons',
             E:'gtceu:small_bronze_gear',
             F:'minecraft:furnace',
*/
    event.remove({id:'gtceu:shaped/bronze_bricks_hull'})
    event.shaped(
        Item.of('3x gtceu:bronze_brick_casing'),
            [ 'PPP',
              'P P',
              'BBB'],
            {P:'gtceu:bronze_plate',
             B:'gtceu:firebricks',
             })

    event.remove({id:'gtceu:shaped/casing_bronze_bricks'})
    event.remove({id:'gtceu:assembler/casing_bronze_bricks'})

    event.shaped(
        Item.of('2x gtceu:steam_machine_casing'),
            [ 'PBP',
              'PHP',
              'PBP'],
            {P:'gtceu:bronze_plate',
             B:'gtceu:firebricks',
             H:'#forge:tools/hammers'
             })

//removing hight pressure steam machines VVV
    event.remove({id:/gtceu:shaped\/steam_.*_steel/})
    event.remove({id:"gtceu:shaped/steam_oven_from_hp",})
    event.remove({id:"gtceu:shaped/steam_grinder_from_hp",})
    event.remove({id:"gtceu:shaped/steel_bricks_hull",})

//making fireclay craftable before you get into steam age since you need it for the blocks
   event.shaped(
        Item.of('minecraft:clay'),
            [ 'CC',
              'CC',],
            {C:'minecraft:clay_ball',})


    event.remove({id:'gtceu:shapeless/clay_ball_to_dust'})
    event.remove({id:'gtceu:shapeless/clay_block_to_dust'})

    event.remove({id:'gtceu:shapeless/brick_to_dust'})
    event.remove({id:'gtceu:shapeless/brick_block_to_dust'})
    event.shapeless(
        Item.of('gtceu:clay_dust',2),
            ['#forge:tools/mortars',
             'minecraft:clay'])

    event.shapeless(
        Item.of('gtceu:brick_dust',2),
            ['#forge:tools/mortars',
             'minecraft:bricks'])
    event.shapeless(
        Item.of('gtceu:compressed_fireclay',1),
            ['gtceu:brick_wooden_form',
             'gtceu:fireclay_dust'])

    event.recipes.gtceu.alloy_smelter('brick_dust_and_clay_dust_to_fire_clay_brick')
        .itemInputs('2x gtceu:brick_dust','2x gtceu:clay_dust')
        .itemOutputs('4x gtceu:firebrick')
        .duration(205)
        .EUt(4)

//primitive water pump recipe changes to using lead
    event.remove({id:'gtceu:shaped/pump_deck'})
    event.shaped(
        Item.of('2x gtceu:pump_deck'),
            [ 'LTL',
              'HCS',],
            {H:'#forge:tools/hammers',
             L:'gtceu:lead_screw',
             S:'#forge:tools/screwdrivers',
             T:'gtceu:treated_wood_planks',
             C:'minecraft:cobblestone_slab'
             })

    event.remove({id:'gtceu:shaped/pump_hatch'})
    event.shaped(
        Item.of('gtceu:pump_hatch'),
            [ 'LSL',
              'RTR',
              'CTC'],
            {L:'gtceu:lead_screw',
             S:'#forge:tools/screwdrivers',
             R:'gtceu:lead_ring',
             T:'gtceu:treated_wood_planks',
             C:'minecraft:cobblestone_slab'
             })

    event.remove({id:'gtceu:shaped/primitive_pump'})
    event.shaped(
        Item.of('gtceu:primitive_pump'),
            [ 'HLS',
              'TET',
              'CRC'],
            {L:'gtceu:lead_screw',
             H:'#forge:tools/hammers',
             S:'#forge:tools/screwdrivers',
             R:'gtceu:lead_ring',
             T:'gtceu:treated_wood_planks',
             C:'minecraft:cobblestone_slab',
             E:'gtceu:lead_rotor',
             })
})
