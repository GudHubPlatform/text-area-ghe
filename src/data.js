import './textarea.webcomponent.js';
export default class GhStudyJournalData {
	/*------------------------------- FIELD TEMPLATE --------------------------------------*/

	getTemplate() {
		return {
			constructor: 'field',
			name: 'Text Area',
			icon: 'text_icon',
			model: {
				field_id: 0,
				field_name: 'Text Area',
				field_value: '',
				data_type: 'text_area',
				data_model: {
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
							property: 'data_model.app_id',
							data_model: function () {
								return {
									data_type: 'app',
									field_name: 'App',
									name_space: 'app',
									data_model: {
										current_app: false,
										interpretation: [
											{
												src: 'form',
												id: 'with_text',
												settings: {
													editable: 1,
													show_field_name: 1,
													show_field: 1
												}
											}
										]
									}
								};
							}
						},
						{
							type: 'ghElement',
							property: 'data_model.data_field_id',
							data_model: function (fieldModel) {
								return {
									data_type: 'field',
									field_name: 'Data Field',
									name_space: 'data_field',
									data_model: {
										app_id: fieldModel.data_model
											.app_id
									}
								};
							},
							onInit: function (settingScope, fieldModel) {
								settingScope.$watch(
									function () {
										return fieldModel.data_model
											.app_id;
									},
									function (newValue) {
										settingScope.field_model.data_model.app_id =
											newValue;
									}
								);
							}
						}
					]
				]
			}
		];
	}
}
