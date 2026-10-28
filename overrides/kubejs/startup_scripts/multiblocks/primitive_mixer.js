GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('primitive_mixer')
        .category('multiblock')
        .setMaxIOSize(3, 3, 3, 3)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW , FillDirection.LEFT_TO_RIGHT);
});
GTCEuStartupEvents.registry('gtceu:machine', event => {
	event.create('primitive_mixer', 'multiblock')
		.rotationState(RotationState.NON_Y_AXIS)
		.recipeType('primitive_mixer')
        // .recipeModifier((machine, recipe) => Java.loadClass('com.gregtechceu.gtceu.common.machine.multiblock.steam.SteamParallelMultiblockMachine').SteamParallelMultiblockMachine.recipeModifier(machine, recipe), true)

		.pattern(definition => FactoryBlockPattern.start()
			.aisle(' FFF ', ' BBB ', '     ','     ')
			.aisle('FBBBF', 'B   B', '     ','     ')
			.aisle('FBBBF', 'FRGRF', 'B G B',' BHB ')
			.aisle('FBBBF', 'B   B', '     ','     ')
			.aisle(' FCF ', ' BBB ', '     ','     ')
            .where('F', Predicates.blocks('gtceu:firebricks')
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(3).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMaxGlobalLimited(3).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(3).setPreviewCount(0))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(3).setPreviewCount(0)))
            .where('B', Predicates.blocks('gtceu:bronze_brick_casing'))
            .where('R', Predicates.blocks('gtceu:bronze_frame'))
            .where('G', Predicates.blocks('gtceu:bronze_gearbox'))
            .where('S', Predicates.blocks('gtceu:steam_machine_casing')
                .or(Predicates.abilities(PartAbility.STEAM).setExactLimit(1)))
            .where('H', Predicates.blocks('gtceu:steam_input_hatch'))
			.where('#', Predicates.any())
			.where('C', Predicates.controller(Predicates.blocks(definition.get())))
			.build())
		.workableCasingModel('gtceu:block/casings/solid/machine_primitive_bricks', 'gtceu:block/machines/mixer')
		.editableUI(
			global.ui_builder({
				group: 'primitive',
				name: 'primitive_furnace',
				size: [166, 100],
				background: GuiTextures.PRIMITIVE_BACKGROUND,
				progress: {
					pos: [77, 38],
					size: [20, 18],
					texture: GuiTextures.PRIMITIVE_BLAST_FURNACE_PROGRESS_BAR
				},
				inputs: [
					{ type: 'item', index: 0, pos: [52, 29], texture: GuiTextures.PRIMITIVE_SLOT },
					{ type: 'item', index: 1, pos: [52, 47], texture: GuiTextures.PRIMITIVE_SLOT },
				],
				outputs: [
					{ type: 'item', index: 0, pos: [104, 38], texture: GuiTextures.PRIMITIVE_SLOT },
				]
			})
		);
});
