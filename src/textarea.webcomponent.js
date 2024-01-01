import GhHtmlElement from '@gudhub/gh-html-element';
import html from './textarea.html';
import './style.scss';

class GhTextArea extends GhHtmlElement {
	// Constructor with super() is required for native web component initialization

	constructor() {
		super();
		this.textarea;
		this.destroyDataSubscribe;
	}

	// onInit() is called after parent gh-element scope is ready

	onInit() {
		super.render(html);
		this.textarea = this.getElementsByTagName('textarea')[0];
		this.attachListeners();
	}

	// disconnectedCallback() is called after the component is destroyed 
	disconnectedCallback() {
	}

	attachListeners = () => {
		this.textarea.addEventListener('change', () => this.handleUserChange());
	};

	updateData = (data) => {
		this.textarea.textContent = data;
		this.handleDataUpdate();
	};

	handleDataUpdate = () => {
		console.log('handled data update');
	};

	handleUserChange = () => {
		console.log('handled user change');
	};

	subscribeOnDataUpdate = () => {
		// this.destroyDataSubscribe = gudhub.on('gh_value_update', );
	};
}

// Register web component only if it is not registered yet

if (!customElements.get('gh-text-area')) {
	customElements.define('gh-text-area', GhTextArea);
}
