
const ORE_TIERS = global.ore_tiers

ItemEvents.tooltip(event => {
    function define(ores, tl_key){
        event.add(ores, Component.translatable(tl_key))
    }

    define(ORE_TIERS.ulv, "item.gtx.ore_ulv")
    define(ORE_TIERS.lv, "item.gtx.ore_lv")
    define(ORE_TIERS.mv, "item.gtx.ore_mv")
    define(ORE_TIERS.hv, "item.gtx.ore_hv")
})
