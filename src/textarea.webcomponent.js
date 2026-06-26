import GhHtmlElement from '@gudhub/gh-html-element';
import html from './textarea.html';
import './style.scss';

class GhTextArea extends GhHtmlElement {
	constructor() {
		super();
		this.textarea = null;
		this.maxSymbols = null;
		this._keydownHandler = null;
	}

	// onInit() is called after parent gh-element scope is ready
	onInit() {
		this.maxSymbols = this.scope.field_model.data_model.maxSymbols;
		this.renderComponent();
		this.attachListeners();
	}

	// disconnectedCallback() is called after the component is destroyed
	disconnectedCallback() {
		if (this._keydownHandler) {
			document.removeEventListener('keydown', this._keydownHandler);
			this._keydownHandler = null;
		}
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

			// FIX: set existing value into textarea so blur-save doesn't wipe it
			if (this.textarea && this.value) {
				this.textarea.value = this.value;
			}

			this._updateCounter();
		}
	}

	attachListeners = () => {
		if (this.hasAttribute('read-only') || !this.textarea) return;

		// Save on blur
		this.textarea.addEventListener('blur', () => this.handleSave());

		// Update counter and unsaved status on input
		this.textarea.addEventListener('input', () => {
			this._updateCounter();
			this._setStatus('unsaved', '● unsaved');
		});

		// Save on Ctrl+S / Cmd+S
		this._keydownHandler = (e) => {
			const isSaveShortcut = (e.ctrlKey || e.metaKey) && e.key === 's';
			if (isSaveShortcut && this.textarea && document.activeElement === this.textarea) {
				e.preventDefault();
				this.handleSave();
			}
		};
		document.addEventListener('keydown', this._keydownHandler);
	};

	handleSave = () => {
		if (!this.hasAttribute('read-only') && this.textarea) {
			this.value = this.textarea.value;
			this.scope.$apply();
			this._setStatus('saved', '✓ saved');
			setTimeout(() => this._clearStatus(), 2000);
		}
	};

	_updateCounter() {
		if (!this.textarea) return;
		const counterEl = this.querySelector('.gh-textarea-counter');
		if (!counterEl) return;

		const max = parseInt(this.textarea.getAttribute('maxlength'), 10) || 256;
		const current = this.textarea.value.length;
		const remaining = max - current;

		counterEl.textContent = `${current} / ${max}`;
		counterEl.className = 'gh-textarea-counter';

		if (remaining <= 10) {
			counterEl.classList.add('limit');
		} else if (remaining <= Math.ceil(max * 0.15)) {
			counterEl.classList.add('warn');
		}
	}

	_setStatus(type, text) {
		const statusEl = this.querySelector('.gh-textarea-status');
		if (!statusEl) return;
		statusEl.textContent = text;
		statusEl.className = `gh-textarea-status ${type}`;
	}

	_clearStatus() {
		const statusEl = this.querySelector('.gh-textarea-status');
		if (!statusEl) return;
		statusEl.textContent = '';
		statusEl.className = 'gh-textarea-status';
	}

	onUpdate() {
		this.renderComponent();
		if (!this.hasAttribute('read-only')) {
			this.attachListeners();
		}
	}
}

// Register web component only if it is not registered yet
if (!window.customElements.get('gh-text-area')) {
	window.customElements.define('gh-text-area', GhTextArea);
}
