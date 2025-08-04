class Banner {
    constructor() {
        // Se usan imagenes diferentes de banner para hacer responsive
        this.imagenes = ['img/banners/bannerall.jpg', 'img/banners/bannerrus.jpg', 'img/banners/bannering.jpg',];
        this.imagenesSmall = ['img/banners/bannerallsmall.jpg', 'img/banners/bannerrussmall.jpg', 'img/banners/banneringsmall.jpg'];

        // Los tipos de banner se usan en aleatorización
        this.buttonsTypes = ['Allende', 'Rusa', 'Verde'];

        this.timeout = null;

    }

    // Un metodo para armar una ventana modal de banner flotante

    draw() {
        const modal = document.createElement("div");
        modal.setAttribute("class", "modal modal-banner fade");

        const dialog = document.createElement("div");
        dialog.setAttribute("class", "modal-dialog modal-lg modal-dialog-centered");

        const content = document.createElement("div");
        content.setAttribute("class", "modal-content bg-ivory");

        const header = document.createElement("div");
        header.setAttribute("class", "modal-header");

        // Botón cerrar

        const close = document.createElement("button");
        close.setAttribute("type", "button");
        close.setAttribute("class", "btn-close");
        close.addEventListener("click", () => {
            this.close();
        });

        const body = document.createElement("div");
        body.setAttribute("class", "modal-body p-0 overflow-hidden position-relative");

        const picture = document.createElement("picture");
        picture.setAttribute("id", "pictureadapt");

        const btnBanner = document.createElement("button");
        btnBanner.setAttribute("class", "btn btn-marron position-absolute bottom-0 start-50 translate-middle-x boton-banner");

        const backdrop = document.createElement("div");
        backdrop.setAttribute("class", "modal-backdrop modal-banner-backdrop fade");
        backdrop.setAttribute("style", "display: none;");

        header.append(close);

        body.append(picture, btnBanner);

        content.append(header, body);
        dialog.append(content);
        modal.append(dialog);
        document.querySelector("body").append(backdrop);
        document.querySelector("body").prepend(modal);

        // Botón con tres tipos de Call to Action de banner depende de aleatorización
        document.querySelector(".boton-banner").addEventListener("click", (e) => {
            this.close();
            const buttonType = e.target.innerText;
            if (buttonType === 'Ver más') {
                let product = productByIsbn("9789500771870");
                if (product) {
                    product.drawVentModal();
                }
            } else if (buttonType === 'Comprar') {
                comprarLibro("9788417553906");
            } else {
                let product = productByIsbn("9781408711705");
                if (product) {
                    product.drawVentModal();
                }
            }
        });
    }


    // Un metodo para mostrar banner

    open() {

        // Aleatorización
        const index = Math.floor(this.imagenes.length * Math.random());

        // Se usa source de imagen de banner diferente depende del index
        document.querySelector("#pictureadapt").replaceChildren();

        const sourceSmall = document.createElement("source");
        sourceSmall.setAttribute("srcset", this.imagenesSmall[index]);
        sourceSmall.setAttribute("media", "(max-width: 992px)");

        const sourceBig = document.createElement("source");
        sourceBig.setAttribute("srcset", this.imagenes[index]);

        const imageDos = document.createElement("img");
        imageDos.setAttribute("src", this.imagenes[index]);
        imageDos.setAttribute("alt", "Una imagen de banner con oferta");
        document.querySelector("#pictureadapt").append(sourceSmall, sourceBig, imageDos);

        // Botones diferentes para corresponder con banner
        let buttonType = this.buttonsTypes[index];

        let textBtn = '';
        let classBtn = 'btn position-absolute bottom-0 start-50 translate-middle-x boton-banner';

        if (buttonType === 'Allende') {
            textBtn = 'Ver más';
            classBtn += ' btn-allende';
        } else if (buttonType === 'Rusa') {
            textBtn = 'Comprar';
            classBtn += ' btn-rusa w-25';
        } else {
            textBtn = 'Leer más';
            classBtn += ' btn-ingles';
        }

        document.querySelector(".boton-banner").innerText = textBtn;
        document.querySelector(".boton-banner").setAttribute("class", classBtn);

        const modal = document.querySelector(".modal-banner");
        modal.classList.add("show");
        modal.setAttribute("style", "display: block;");
        const backdrop = document.querySelector(".modal-banner-backdrop");
        backdrop.classList.add("show");
        backdrop.setAttribute("style", "display: block;");

        // Timeout para cerrar banner en 10 segundos
        this.timeout = setTimeout(() => {
            this.close();
        }, 10000);
    }


    // Un metodo para cerrar banner

    close() {
        // Reseteo del timeout para los casos de cambiar categorias varias veces en 10 segundos
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        const modal = document.querySelector(".modal-banner");
        modal.classList.remove("show");
        modal.setAttribute("style", "display: none;");
        const backdrop = document.querySelector(".modal-banner-backdrop");
        backdrop.classList.remove("show");
        backdrop.setAttribute("style", "display: none;");
    }
}