import './textarea.webcomponent.js';
export default class GhStudyJournalData {
	/*------------------------------- FIELD TEMPLATE --------------------------------------*/

	getTemplate() {
		return {
			constructor: 'field',
			name: 'Text Area',
			icon: 'text_icon',
            type: 'text_area',
			model: {
				field_id: 0,
				field_name: 'Text Area',
				field_value: '',
				data_type: 'text_area',
				data_model: {
					maxSymbols: 256,
					readOnlyMaxSymbols: 256,
					interpretation: [
						{
							src: 'form',
							id: 'default',
							settings: {
								editable: 1,
								show_field_name: 1,
								show_field: 1
							},
							style: { position: 'beetwen' }
						},
						{
							src: 'table',
							id: 'read_only',
							settings: {
								editable: 0,
								show_field_name: 0,
								show_field: 1,
								maxSymbols: 256
							}
						}
					]
				}
			}
		};
	}

	/*------------------------------- INTERPRETATION --------------------------------------*/

	getInterpretation(gudhub, value, appId, itemId, field_model) {
		return [
			{
				id: 'default',
				name: 'Default',
				content: () =>
					'<gh-text-area app-id="{{appId}}" item-id="{{itemId}}" field-id="{{fieldId}}"></gh-text-area>'
			},
			{
				id: 'value',
				name: 'Value',
				content: () => value
			},
			{
				id: 'read_only',
				name: 'Read-only',
				content: () =>
					'<gh-text-area read-only app-id="{{appId}}" item-id="{{itemId}}" field-id="{{fieldId}}"></gh-text-area>'
			}
		];
	}

	/*--------------------------  SETTINGS --------------------------------*/

	getSettings(scope) {
		return [
			{
				title: 'Options',
				type: 'general_setting',
				icon: 'menu',
				columns_list: [
					[
						{
							type: 'ghElement',
							property: 'data_model.maxSymbols',
							data_model: function () {
								return {
									data_type: 'number',
									field_name: 'Max Symbols',
									name_space: 'max_symbols',
								};
							}
						}
					]
				]
			},
			{
				title: 'Style',
				icon: 'eye',
				type: 'interpretation_setting',
				columns_list: [
					[
						{
							type: 'ghElement',
							property: 'interpreter.settings.maxSymbols',
							data_model: function () {
								return {
									data_type: 'number',
									field_name: 'Max Symbols',
									name_space: 'read_only_max_symbols',
								};
							}
						}
					]
				]
			}
		];
	}
}
