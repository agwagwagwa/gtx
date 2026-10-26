

GTCEuStartupEvents.registry('gtceu:machine', event => {
	event.create('primitive_furnace', 'multiblock')
		.rotationState(RotationState.NON_Y_AXIS)
		.recipeType('electric_furnace')
		.pattern(definition => FactoryBlockPattern.start()
			.aisle('AAA', 'BBB', 'BBB')
			.aisle('AAA', 'B#B', 'BBB')
			.aisle('AAA', 'BCB', 'BBB')
			.where('A', Predicates.blocks('minecraft:smooth_stone'))
			.where('B', Predicates.blocks('minecraft:stone_bricks'))
			.where('#', Predicates.any())
			.where('C', Predicates.controller(Predicates.blocks(definition.get())))
			.build())
		.workableCasingModel('minecraft:block/stone_bricks', 'gtceu:block/multiblock/primitive_blast_furnace')
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