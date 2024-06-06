import GhHtmlElement from '@gudhub/gh-html-element';
import html from './textarea.html';
import './style.scss';

class GhTextArea extends GhHtmlElement {
	// Constructor with super() is required for native web component initialization

	constructor() {
		super();
		this.textarea;
		this.maxSymbols;
	}

	// onInit() is called after parent gh-element scope is ready

	onInit() {
		this.maxSymbols = this.scope.field_model.data_model.maxSymbols;
		super.render(html);
		this.textarea = this.getElementsByTagName('textarea')[0];
		this.attachListeners();
	}

	// disconnectedCallback() is called after the component is destroyed 
	disconnectedCallback() {
	}

	attachListeners = () => {
		this.textarea.addEventListener('blur', () => this.handleSave());
	};

	handleSave = () => {
		this.value = this.textarea.value;
		this.scope.$apply();
	};

	onUpdate() {
		super.render(html);
	}
}

// Register web component only if it is not registered yet

if (!customElements.get('gh-text-area')) {
	customElements.define('gh-text-area', GhTextArea);
}
