
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('primitive_furnace')
        .category('multiblock')
        .setMaxIOSize(3, 1, 0, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW , FillDirection.LEFT_TO_RIGHT);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {

	event.create('primitive_furnace', 'multiblock')
		.rotationState(RotationState.NON_Y_AXIS)
		.recipeType('primitive_furnace')
		.pattern(definition => FactoryBlockPattern.start()
			.aisle('BBB', 'BBB', 'BBB')
			.aisle('BBB', 'B#B', 'BBB')
			.aisle('BBB', 'BCB', 'BBB')
			// .where('A', Predicates.blocks('minecraft:smooth_stone')
		    //     .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(3).setPreviewCount(0))
            //     .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMaxGlobalLimited(2).setPreviewCount(0))
            //     .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(0))
            //     .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(0)))
            .where('B', Predicates.blocks('minecraft:stone_bricks')
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(3).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setMaxGlobalLimited(2).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(0))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(0)))
			.where('#', Predicates.any())
			.where('C', Predicates.controller(Predicates.blocks(definition.get())))
			.build())
		.workableCasingModel('minecraft:block/stone_bricks', 'gtceu:block/machines/electric_furnace')
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



