import GhHtmlElement from '@gudhub/gh-html-element';
import html from './textarea.html';
import './style.scss';

class GhTextArea extends GhHtmlElement {
	// Constructor with super() is required for native web component initialization

	constructor() {
		super();
	}

	// onInit() is called after parent gh-element scope is ready

	onInit() {
		super.render(html);
	}

	// disconnectedCallback() is called after the component is destroyed 
	disconnectedCallback() {
	}
}

// Register web component only if it is not registered yet

if (!customElements.get('gh-text-area')) {
	customElements.define('gh-text-area', GhTextArea);
}
