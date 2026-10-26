// priority: 1000

/*
MIT License

Copyright (c) 2023 trulyno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/StarT-Dev-Team/Star-Technology

*/

const EditableMachineUI = Java.loadClass('com.gregtechceu.gtceu.api.gui.editor.EditableMachineUI')
const GTSlotWidget = Java.loadClass('com.gregtechceu.gtceu.api.gui.widget.SlotWidget')
const GTTankWidget = Java.loadClass('com.gregtechceu.gtceu.api.gui.widget.TankWidget')

global.ui_builder = (settings) => {
	const { group, name, size, background, progress, inputs, outputs } = settings;

	return new EditableMachineUI(
		group,
		'gtceu:' + name,
		() => new WidgetGroup(),
		(template, machine) => {
			template.setSize(size[0], size[1]);
			template.setBackground(background);

			template.addWidget(new ProgressWidget(
				() => machine.getRecipeLogic().getProgressPercent(),
				progress.pos[0], progress.pos[1],
				progress.size[0], progress.size[1],
				progress.texture
			));

			inputs.forEach(input => {
				const { type, index, pos, texture } = input;

				if (type == 'item') template.addWidget(new GTSlotWidget(machine.importItems.storage, index, pos[0], pos[1], true, true).setBackground(texture));
				if (type == 'fluid') template.addWidget(new GTTankWidget(machine.importFluids.storages[index], pos[0], pos[1], true, true).setBackground(texture));
			})

			outputs.forEach(output => {
				const { type, index, pos, texture } = output;

				if (type == 'item') template.addWidget(new GTSlotWidget(machine.exportItems.storage, index, pos[0], pos[1], true, false).setBackground(texture));
				if (type == 'fluid') template.addWidget(new GTTankWidget(machine.exportFluids.storages[index], pos[0], pos[1], true, false).setBackground(texture));
			})
		}
	)
}
