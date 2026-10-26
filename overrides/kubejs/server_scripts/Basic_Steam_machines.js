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







})