import GhHtmlElement from '@gudhub/gh-html-element';
import html from './textarea.html';
import './style.scss';

class GhTextArea extends GhHtmlElement {
	constructor() {
		super();
		this.textarea;
		this.maxSymbols;
	}

	// onInit() is called after parent gh-element scope is ready
	onInit() {
		this.maxSymbols = this.scope.field_model.data_model.maxSymbols;
		this.renderComponent();
		this.attachListeners();
	}

	// disconnectedCallback() is called after the component is destroyed 
	disconnectedCallback() {
		// Add any cleanup logic if necessary
	}

	renderComponent() {
		if (this.hasAttribute('read-only')) {
			let maxSymbolsToDisplay = this.scope.field_model.settings.maxSymbols;
			maxSymbolsToDisplay = !isNaN(maxSymbolsToDisplay) ? parseInt(maxSymbolsToDisplay, 10) : null;
			let displayValue = this.value;
			if (maxSymbolsToDisplay >= 0 && maxSymbolsToDisplay < this.value.length) {
				displayValue = this.value.slice(0, maxSymbolsToDisplay) + '...';
			}

			super.render(`<div>${displayValue}</div>`);
		} else {
			super.render(html);
			this.textarea = this.getElementsByTagName('textarea')[0];
		}
	}

	attachListeners = () => {
		if (!this.hasAttribute('read-only') && this.textarea) {
			this.textarea.addEventListener('blur', () => this.handleSave());
		}
	};

	handleSave = () => {
		if (!this.hasAttribute('read-only')) {
			this.value = this.textarea.value;
			this.scope.$apply();
		}
	};

	onUpdate() {
		this.renderComponent();
	}
}

// Register web component only if it is not registered yet
if (!window.customElements.get('gh-text-area')) {
	window.customElements.define('gh-text-area', GhTextArea);
}
