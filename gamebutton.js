const Confirm = {
    open(options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: '',
            cancelText: '',
            onok: function() {},
            oncancel: function() {}
        }, options);
        const html = `
        <div class="confirm">
            <div class="confirm--window">
                <div class="confirm--titlebar">
                    <span class="confirm--title">${options.title}</span>
                    <button class="confirm--close">&times;</button>
                </div>
            <div class="confirm--content">
                <center>${options.message}</center>
            </div>
            <div class="confirm--buttons ">
                <button class="confirm--button confirm--button--ok confirm--button--fill">${options.okText}</button>
                <button class="confirm--button confirm--button--cancel">${options.cancelText}</button>
            </div>
            </div>
        </div>`;
        const template = document.createElement('template');
        template.innerHTML = html;

        //Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm--close');
        const btnOk = template.content.querySelector('.confirm--button--ok');
        const btnCancel = template.content.querySelector('.confirm--button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', e => {
            options.onok();
            this._close(confirmEl);
            window.location.href = 'index.html';
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);

    },
    _close(confirmEl) {
        confirmEl.classList.add('confirm--close');
        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};