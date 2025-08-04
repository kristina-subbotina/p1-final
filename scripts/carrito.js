class Carrito {

    constructor() {
        this.items = [];
        this.totalCount = 0;
        this.totalPrice = 0;

    }

    // Local Storage para los productos en carrito

    load() {
        if (localStorage.getItem("carritoItems")) {
            let carritoItems = JSON.parse(localStorage.getItem("carritoItems"));
            carritoItems.forEach(item => {
                for (let i = 0; i < item.count; i++) {

                    comprarLibro(item.producto.isbn)
                }
            });
        }
    }

    save() {
        localStorage.setItem("carritoItems", JSON.stringify(this.items));
    }

    // El metodo para limpiar el carrito

    borrarCarrito() {
        let isbns = [];
        this.items.forEach(item => {
            for (let i = 0; i < item.count; i++) {
                isbns.push(item.producto.isbn);
            }
        });
        isbns.forEach(isbn => removeLibro(isbn));
    }

    // Creamos un objeto de class CarritoItem o cambiamos su count si ya existe

    addProduct(product) {
        let items = this.items.filter(item => item.producto === product);
        if (items.length > 0) {
            items[0].count++;
        } else {
            let item = new CarritoItem(product);
            item.count = 1;
            this.items.push(item);
        }

        this.totalCount++;
        this.totalPrice += product.precio;
    }

    // Borramos el objeto de class CarritoItem o cambiamos su count

    removeProduct(product) {

        let items = this.items.filter(item => item.producto === product);
        if (items.length > 0) {
            items[0].count--;

            if (items[0].count === 0) {
                let index = this.items.indexOf(items[0]);

                if (index > -1) {
                    this.items.splice(index, 1);
                }
            }
        }

        this.totalCount--;
        this.totalPrice -= product.precio;
    }

    // Creamos la ventana modal de checkout

    drawCheckout() {
        const modal = document.createElement("div");
        modal.setAttribute("class", "modal modal-checkout fade");

        const dialog = document.createElement("div");
        dialog.setAttribute("class", "modal-dialog modal-lg modal-dialog-centered");

        const content = document.createElement("div");
        content.setAttribute("class", "modal-content bg-ivory");

        const header = document.createElement("div");
        header.setAttribute("class", "modal-header");

        const title = document.createElement("h1");
        title.setAttribute("class", "modal-title fs-4 text-uppercase fw-light");
        title.innerText = "Realizar el pedido";

        const close = document.createElement("button");
        close.setAttribute("type", "button");
        close.setAttribute("class", "btn-close");
        close.addEventListener("click", () => {
            this.closeCheckoutModal();
        });

        const body = document.createElement("div");
        body.setAttribute("class", "modal-body");

        // Formulario
        const formContainer = document.createElement("div");
        formContainer.setAttribute("class", "container");

        const formRow = document.createElement("div");
        formRow.setAttribute("class", "row justify-content-center");

        const formCol = document.createElement("div");
        formCol.setAttribute("class", "col-12");

        formRow.append(formCol);
        formContainer.append(formRow);

        const form = document.createElement("form");
        form.setAttribute("class", "row");
        form.setAttribute("action", "#");
        form.setAttribute("method", "post");
        form.setAttribute("enctype", "multipart/form-data");

        // Datos personales
        const formNombre = document.createElement("div");
        formNombre.setAttribute("class", "col-12 col-lg-6 mb-4");

        const nombreLabel = document.createElement("label");
        nombreLabel.setAttribute("class", "form-label");
        nombreLabel.setAttribute("for", "nombre");
        nombreLabel.innerText = "* Nombre:";

        const nombreInput = document.createElement("input");
        nombreInput.setAttribute("class", "form-control");
        nombreInput.setAttribute("type", "text");
        nombreInput.setAttribute("name", "nombre");
        nombreInput.setAttribute("id", "nombre");

        formNombre.append(nombreLabel, nombreInput);

        const formApellido = document.createElement("div");
        formApellido.setAttribute("class", "col-12 col-lg-6 mb-4");

        const apellidoLabel = document.createElement("label");
        apellidoLabel.setAttribute("class", "form-label");
        apellidoLabel.setAttribute("for", "apellido");
        apellidoLabel.innerText = "Apellido:";

        const apellidoInput = document.createElement("input");
        apellidoInput.setAttribute("class", "form-control");
        apellidoInput.setAttribute("type", "text");
        apellidoInput.setAttribute("name", "apellido");
        apellidoInput.setAttribute("id", "apellido");

        formApellido.append(apellidoLabel, apellidoInput);


        const formEmail = document.createElement("div");
        formEmail.setAttribute("class", "col-12 col-lg-6 mb-4");

        const emailLabel = document.createElement("label");
        emailLabel.setAttribute("class", "form-label");
        emailLabel.setAttribute("for", "email");
        emailLabel.innerText = "* e-mail:";

        const emailInput = document.createElement("input");
        emailInput.setAttribute("class", "form-control");
        emailInput.setAttribute("type", "email");
        emailInput.setAttribute("name", "email");
        emailInput.setAttribute("id", "email");
        emailInput.setAttribute("placeholder", "queroleer@mymail.com");

        formEmail.append(emailLabel, emailInput);


        const formTele = document.createElement("div");
        formTele.setAttribute("class", "col-12 col-lg-6 mb-4");

        const teleLabel = document.createElement("label");
        teleLabel.setAttribute("class", "form-label");
        teleLabel.setAttribute("for", "telefono");
        teleLabel.innerText = "Teléfono:";

        const teleInput = document.createElement("input");
        teleInput.setAttribute("class", "form-control");
        teleInput.setAttribute("type", "tel");
        teleInput.setAttribute("name", "telefono");
        teleInput.setAttribute("id", "telefono");
        teleInput.setAttribute("placeholder", "+54 9 XXX XXX XXXX");

        formTele.append(teleLabel, teleInput);

        // Datos de entrega

        const formDireccion = document.createElement("div");
        formDireccion.setAttribute("class", "col-12 col-lg-8  mb-4");

        const direccionLabel = document.createElement("label");
        direccionLabel.setAttribute("class", "form-label");
        direccionLabel.setAttribute("for", "direccion");
        direccionLabel.innerText = "Dirección de entrega:";

        const direccionInput = document.createElement("textarea");
        direccionInput.setAttribute("class", "form-control");
        direccionInput.setAttribute("name", "direccion");
        direccionInput.setAttribute("id", "direccion");

        formDireccion.append(direccionLabel, direccionInput);

        const formFecha = document.createElement("div");
        formFecha.setAttribute("class", "col-4 mb-4");

        const fechaLabel = document.createElement("label");
        fechaLabel.setAttribute("class", "form-label");
        fechaLabel.setAttribute("for", "fecha");
        fechaLabel.innerText = "Fecha de entrega:";

        const fechaInput = document.createElement("input");
        fechaInput.setAttribute("class", "form-control");
        fechaInput.setAttribute("name", "fecha");
        fechaInput.setAttribute("type", "date");
        fechaInput.setAttribute("id", "fecha");

        formFecha.append(fechaLabel, fechaInput);

        // Muevo la fecha de entrega: +1 dia de fecha actual como minimo

        const now = new Date(Date.now());
        now.setDate(now.getDate() + 1);
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = (now.getDate()).toString().padStart(2, "0");
        fechaInput.setAttribute("min", `${now.getFullYear()}-${month}-${day}`);
        fechaInput.setAttribute("value", `${now.getFullYear()}-${month}-${day}`);


        // Fieldset de Metodos de pago

        const pagoFieldset = document.createElement("fieldset");
        pagoFieldset.setAttribute("class", "col-12");

        const pagoLegend = document.createElement("legend");
        pagoLegend.setAttribute("class", "mb-3");
        pagoLegend.innerText = 'Información de pago'
        pagoFieldset.append(pagoLegend);

        const pagoFieldsetRow = document.createElement("div");
        pagoFieldsetRow.setAttribute("class", "row");

        const pagoFieldsetCol = document.createElement("div");
        pagoFieldsetCol.setAttribute("class", "col-12 col-lg-6");

        const radioCuotas = document.createElement("div");
        radioCuotas.setAttribute("class", "form-check mb-2");

        const radioCuotasInput = document.createElement("input");
        radioCuotasInput.setAttribute("class", "form-check-input");
        radioCuotasInput.setAttribute("type", "radio");
        radioCuotasInput.setAttribute("name", "pago");
        radioCuotasInput.setAttribute("value", "cuotas");
        radioCuotasInput.setAttribute("id", "cuotas");

        const radioCuotasLabel = document.createElement("label");
        radioCuotasLabel.setAttribute("class", "form-check-label");
        radioCuotasLabel.setAttribute("for", "cuotas");
        radioCuotasLabel.innerText = 'Cuotas sin tarjeta: Mercado pago';

        radioCuotas.append(radioCuotasInput, radioCuotasLabel);

        const radioCredito = document.createElement("div");
        radioCredito.setAttribute("class", "form-check mb-2");

        const radioCreditoInput = document.createElement("input");
        radioCreditoInput.setAttribute("class", "form-check-input");
        radioCreditoInput.setAttribute("type", "radio");
        radioCreditoInput.setAttribute("name", "pago");
        radioCreditoInput.setAttribute("value", "credito");
        radioCreditoInput.setAttribute("id", "credito");

        const radioCreditoLabel = document.createElement("label");
        radioCreditoLabel.setAttribute("class", "form-check-label");
        radioCreditoLabel.setAttribute("for", "credito");
        radioCreditoLabel.innerText = 'Tarjeta de crédito: Visa, MasterCard, NaranjaX';

        radioCredito.append(radioCreditoInput, radioCreditoLabel);

        const radioDebito = document.createElement("div");
        radioDebito.setAttribute("class", "form-check mb-2");

        const radioDebitoInput = document.createElement("input");
        radioDebitoInput.setAttribute("class", "form-check-input");
        radioDebitoInput.setAttribute("type", "radio");
        radioDebitoInput.setAttribute("name", "pago");
        radioDebitoInput.setAttribute("value", "debito");
        radioDebitoInput.setAttribute("id", "debito");

        const radioDebitoLabel = document.createElement("label");
        radioDebitoLabel.setAttribute("class", "form-check-label");
        radioDebitoLabel.setAttribute("for", "debito");
        radioDebitoLabel.innerText = 'Tarjeta de débito: Visa, Cabal';

        radioDebito.append(radioDebitoInput, radioDebitoLabel);

        const radioEfectivo = document.createElement("div");
        radioEfectivo.setAttribute("class", "form-check mb-2");

        const radioEfectivoInput = document.createElement("input");
        radioEfectivoInput.setAttribute("class", "form-check-input");
        radioEfectivoInput.setAttribute("type", "radio");
        radioEfectivoInput.setAttribute("name", "pago");
        radioEfectivoInput.setAttribute("value", "efectivo");
        radioEfectivoInput.setAttribute("id", "efectivo");

        const radioEfectivoLabel = document.createElement("label");
        radioEfectivoLabel.setAttribute("class", "form-check-label");
        radioEfectivoLabel.setAttribute("for", "efectivo");
        radioEfectivoLabel.innerText = 'Efectivo: Rapipago, PagoFacil';

        // Se cree un div para las cuotas

        const cuotasFieldsetCol = document.createElement("div");
        cuotasFieldsetCol.setAttribute("class", "col-12 col-lg-6 cuotas-div");

        radioEfectivo.append(radioEfectivoInput, radioEfectivoLabel);
        pagoFieldset.append(pagoFieldsetRow);
        pagoFieldsetRow.append(pagoFieldsetCol, cuotasFieldsetCol);
        pagoFieldsetCol.append(radioCuotas, radioCredito, radioDebito, radioEfectivo);


        //Boton de confirmación

        const btnFinalizar = document.createElement("div");
        btnFinalizar.setAttribute("class", "col-12");

        const btnFinalizarInput = document.createElement("button");
        btnFinalizarInput.setAttribute("class", "btn btn-marron w-25 d-block mt-5");
        btnFinalizarInput.setAttribute("type", "submit");
        btnFinalizarInput.innerText = "Confirmar";


        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputNombre = document.querySelector("#nombre");
            const inputEmail = document.querySelector("#email");
            inputNombre.setAttribute("class", "form-control");
            inputEmail.setAttribute("class", "form-control");

            if (inputNombre.value.trim() === "") {
                inputNombre.setCustomValidity("El nombre es obligatorio");
                inputNombre.setAttribute("class", "form-control border border-danger");
                inputNombre.reportValidity();
                return;
            } else if (inputEmail.value.trim() === "") {
                inputEmail.setCustomValidity("E-mail es obligatorio");
                inputEmail.setAttribute("class", "form-control border border-danger");
                inputEmail.reportValidity();
                return;
            } else {
                // Limpiar carrito
                this.borrarCarrito()
                // Limpiar formulario
                document.querySelectorAll('input:not([type="radio"])').forEach(input => {
                    input.value = '';
                });

                const cuotasContainer = document.querySelector('.cuotas-div');
                cuotasContainer.replaceChildren();

                // Cerrar la ventana modal de checkout
                this.closeCheckoutModal();

                // Mostrar la ventana de confirmacion 
                this.openFinalizarModal();

            }
        })

        btnFinalizar.append(btnFinalizarInput);

        form.append(formNombre, formApellido, formEmail, formTele, formDireccion, formFecha, pagoFieldset, btnFinalizar);
        formCol.append(form);

        const footer = document.createElement("div");
        footer.setAttribute("class", "modal-footer");


        // Boton cerrar
        const btnVolver = document.createElement("button");
        btnVolver.setAttribute("type", "button");
        btnVolver.setAttribute("class", "btn btn-secondary");
        btnVolver.innerText = "Volver a carrito";
        btnVolver.addEventListener("click", () => {
            this.closeCheckoutModal();
            this.openCarritoModal();
        });

        const backdrop = document.createElement("div");
        backdrop.setAttribute("class", "modal-backdrop modal-checkout-backdrop fade");
        backdrop.setAttribute("style", "display: none;");


        footer.append(btnVolver);

        header.append(title, close);
        body.append(formContainer);

        content.append(header, body, footer);
        dialog.append(content);
        modal.append(dialog);
        document.querySelector("body").append(backdrop);
        document.querySelector("body").prepend(modal);

        document.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", (e) => {
                e.target.setCustomValidity("");
            });
        });

        const radioBotones = document.querySelectorAll('input[type="radio"][name="pago"]');
        const totalPrice = this.totalPrice;

        // Depende de metodo de pago hay cuotas diferentes

        radioBotones.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.value === "credito" || this.value === "cuotas") {
                    // 1, 2 o 3 cuotas
                    Carrito.drawCuotas([1, 2, 3]);
                } else {
                    // 1 cuota
                    Carrito.drawCuotas([1]);
                }
            });
        });
    }

    // Armamos cuotas

    static drawCuotas(cuotas) {
        const totalprice = catalogo.carrito.totalPrice;
        const cuotasContainer = document.querySelector('.cuotas-div');
        cuotasContainer.replaceChildren();
        cuotas.forEach(cuota => {
            const cuotaPrice = Math.ceil(totalprice / cuota);
            const radioUnaCuota = document.createElement("div");
            radioUnaCuota.setAttribute("class", "form-check mb-2");

            const radioUnaCuotaInput = document.createElement("input");
            radioUnaCuotaInput.setAttribute("class", "form-check-input");
            radioUnaCuotaInput.setAttribute("type", "radio");
            radioUnaCuotaInput.setAttribute("name", "cuotas");
            radioUnaCuotaInput.setAttribute("checked", "");
            radioUnaCuotaInput.setAttribute("value", `cuota${cuota}`);
            radioUnaCuotaInput.setAttribute("id", `cuota${cuota}`);


            const radioUnaCuotaLabel = document.createElement("label");
            radioUnaCuotaLabel.setAttribute("class", "form-check-label");
            radioUnaCuotaLabel.setAttribute("for", `cuota${cuota}`);
            radioUnaCuotaLabel.innerText = `${cuota} cuota(s) de ${currencyFormat(cuotaPrice)} sin interés`;

            radioUnaCuota.append(radioUnaCuotaInput, radioUnaCuotaLabel);
            cuotasContainer.append(radioUnaCuota);
        })
    }


    // Creamos la ventana modal de carrito

    drawCarritoModal() {

        const modal = document.createElement("div");
        modal.setAttribute("class", "modal modal-carrito fade");

        const dialog = document.createElement("div");
        dialog.setAttribute("class", "modal-dialog modal-lg modal-dialog-centered");

        const content = document.createElement("div");
        content.setAttribute("class", "modal-content bg-ivory");

        const header = document.createElement("div");
        header.setAttribute("class", "modal-header");

        const title = document.createElement("h1");
        title.setAttribute("class", "modal-title fs-4 text-uppercase fw-light");
        title.innerText = "Tu carrito";

        const close = document.createElement("button");
        close.setAttribute("type", "button");
        close.setAttribute("class", "btn-close");
        close.addEventListener("click", () => {
            this.closeCarritoModal();
        });

        const body = document.createElement("div");
        body.setAttribute("class", "modal-body modal-carrito-body");

        const footer = document.createElement("div");
        footer.setAttribute("class", "modal-footer");

        // Boton borrar

        const btnBorrarCarrito = document.createElement("button");
        btnBorrarCarrito.setAttribute("type", "button");
        btnBorrarCarrito.setAttribute("class", "btn btn-danger btn-borrar-todo");
        btnBorrarCarrito.innerText = "Borrar todo";
        btnBorrarCarrito.addEventListener("click", () => {
            this.borrarCarrito();
        });

        // Boton cerrar
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-secondary");
        btn.innerText = "Seguir comprando";
        btn.addEventListener("click", () => {
            this.closeCarritoModal();
        });

        const backdrop = document.createElement("div");
        backdrop.setAttribute("class", "modal-backdrop modal-carrito-backdrop fade");
        backdrop.setAttribute("style", "display: none;");


        footer.append(btnBorrarCarrito, btn);

        header.append(title, close);

        content.append(header, body, footer);
        dialog.append(content);
        modal.append(dialog);
        document.querySelector("body").append(backdrop);
        document.querySelector("body").prepend(modal);
    }


    // Armamos la ventana de la confirmacion de compra

    drawFinalizarModal() {

        const modal = document.createElement("div");
        modal.setAttribute("class", "modal modal-finalizar fade");

        const dialog = document.createElement("div");
        dialog.setAttribute("class", "modal-dialog modal-lg modal-dialog-centered");

        const content = document.createElement("div");
        content.setAttribute("class", "modal-content bg-ivory");

        const header = document.createElement("div");
        header.setAttribute("class", "modal-header");

        const title = document.createElement("h1");
        title.setAttribute("class", "modal-title fs-4 text-uppercase fw-light");
        title.innerText = "Tu pedido";

        const close = document.createElement("button");
        close.setAttribute("type", "button");
        close.setAttribute("class", "btn-close");
        close.addEventListener("click", () => {
            this.closeFinalizarModal();
        });

        const body = document.createElement("div");
        body.setAttribute("class", "modal-body modal-finalizar-body");

        const mensaje = document.createElement("p");
        mensaje.setAttribute("class", "fs-5 text-marron");
        mensaje.innerText = 'Felicitaciones! Tu pedido está finalizado!'

        const footer = document.createElement("div");
        footer.setAttribute("class", "modal-footer");

        // Boton cerrar
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-secondary");
        btn.innerText = "Cerrar";
        btn.addEventListener("click", () => {
            this.closeFinalizarModal();
        });

        const backdrop = document.createElement("div");
        backdrop.setAttribute("class", "modal-backdrop modal-finalizar-backdrop fade");
        backdrop.setAttribute("style", "display: none;");


        footer.append(btn);

        header.append(title, close);

        body.append(mensaje);

        content.append(header, body, footer);
        dialog.append(content);
        modal.append(dialog);
        document.querySelector("body").append(backdrop);
        document.querySelector("body").prepend(modal);

    }


    // Los metodos para abrir y cerrar la ventana modal de finalizacion de compra

    openFinalizarModal() {
        const modal = document.querySelector(".modal-finalizar");
        modal.classList.add("show");
        modal.setAttribute("style", "display: block;");
        const backdrop = document.querySelector(".modal-finalizar-backdrop");
        backdrop.classList.add("show");
        backdrop.setAttribute("style", "display: block;");
    }


    closeFinalizarModal() {
        const modal = document.querySelector(".modal-finalizar");
        modal.classList.remove("show");
        modal.setAttribute("style", "display: none;");
        const backdrop = document.querySelector(".modal-finalizar-backdrop");
        backdrop.classList.remove("show");
        backdrop.setAttribute("style", "display: none;");
    }


    // Los metodos para abrir y cerrar la ventana modal de checkout

    openCheckoutModal() {
        const modal = document.querySelector(".modal-checkout");
        modal.classList.add("show");
        modal.setAttribute("style", "display: block;");
        const backdrop = document.querySelector(".modal-checkout-backdrop");
        backdrop.classList.add("show");
        backdrop.setAttribute("style", "display: block;");
    }


    closeCheckoutModal() {
        const modal = document.querySelector(".modal-checkout");
        modal.classList.remove("show");
        modal.setAttribute("style", "display: none;");
        const backdrop = document.querySelector(".modal-checkout-backdrop");
        backdrop.classList.remove("show");
        backdrop.setAttribute("style", "display: none;");
        const cuotasContainer = document.querySelector('.cuotas-div');
        cuotasContainer.replaceChildren();
        const radioBotones = document.querySelectorAll('input[type="radio"][name="pago"]');
        radioBotones.forEach(element => {
            element.checked = false;
        });
    }

    // Los metodos para abrir y cerrar la ventana modal del carrito

    openCarritoModal() {
        const modal = document.querySelector(".modal-carrito");
        modal.classList.add("show");
        modal.setAttribute("style", "display: block;");
        const backdrop = document.querySelector(".modal-carrito-backdrop");
        backdrop.classList.add("show");
        backdrop.setAttribute("style", "display: block;");
    }

    closeCarritoModal() {
        const modal = document.querySelector(".modal-carrito");
        modal.classList.remove("show");
        modal.setAttribute("style", "display: none;");
        const backdrop = document.querySelector(".modal-carrito-backdrop");
        backdrop.classList.remove("show");
        backdrop.setAttribute("style", "display: none;");
    }

    // Creamos el contenido de modal-body para recfrescarlo dinamicamente 

    fillCarritoModal() {

        document.querySelector(".modal-carrito-body").replaceChildren();

        const list = document.createElement("ul");
        list.setAttribute("class", "list-group-flush");

        this.items.forEach(element => {
            const item = document.createElement("li");
            item.setAttribute("class", "list-group-item container mb-2 border-bottom border-1");

            const itemRow = document.createElement("div");
            itemRow.setAttribute("class", "row");

            const imagen = document.createElement("img");
            imagen.setAttribute("class", "img-fluid col-4 col-md-3 col-lg-2 px-2 py-1")
            imagen.setAttribute("src", element.producto.portada[0]);
            imagen.setAttribute("alt", `Tapa del libro ${element.producto.nombre}`);


            const name = document.createElement("p");
            name.setAttribute("class", "img-fluid col-3 col-md-4 col-lg-5 mt-4")
            name.innerText = element.producto.nombre;


            const count = document.createElement("p");
            count.setAttribute("class", "img-fluid col-1 mt-4")
            count.innerText = `${element.count}`;

            const price = document.createElement("p");
            price.setAttribute("class", "img-fluid col-2 mt-4 fw-bold")
            price.innerText = currencyFormat(element.count * element.producto.precio);

            // Botones para agregar más o borrar el producto

            const btnGroup = document.createElement("div");
            btnGroup.setAttribute("class", "ms-auto col-2");

            const botonAdd = document.createElement('button');
            if (element.producto.isAvailable()) {
                botonAdd.setAttribute("class", "btn btn-marron fw-bold me-1");
                botonAdd.addEventListener("click", (e) => {
                    comprarLibro(element.producto.isbn);
                });
            } else {
                botonAdd.setAttribute("class", "btn btn-marron fw-bold me-1 disabled");
            }
            botonAdd.innerText = '+';


            const botonDelete = document.createElement('button');
            botonDelete.setAttribute("class", "btn btn-marron fw-bold");
            botonDelete.innerText = '-';
            botonDelete.addEventListener("click", (e) => {
                removeLibro(element.producto.isbn);
            });

            btnGroup.append(botonAdd, botonDelete);
            itemRow.append(imagen, name, count, price, btnGroup);
            item.append(itemRow);
            list.append(item);

        });

        // El grupo de count y precio total

        const totalContainer = document.createElement('div');
        totalContainer.setAttribute("class", "container");

        const totalRow = document.createElement('div');
        totalRow.setAttribute("class", "row");

        const totalCol = document.createElement('div');
        totalCol.setAttribute("class", "col-8");

        const totalItemsModal = document.createElement('p')
        totalItemsModal.setAttribute("class", "fs-5 mt-4 mb-1");
        totalItemsModal.innerText = `Ítems en total: ${this.totalCount}`;

        const totalPriceModal = document.createElement('p')
        totalPriceModal.setAttribute("class", "fs-5 fw-bold mt-0");
        totalPriceModal.innerText = `Precio total: ${currencyFormat(this.totalPrice)}`;


        //Boton comprar para ir a checkout
        const btnCol = document.createElement('div');
        btnCol.setAttribute("class", "col-4");

        const btnComprar = document.createElement("button");
        btnComprar.setAttribute("type", "button");
        btnComprar.innerText = "Comprar";


        if (this.items.length === 0) {
            btnComprar.setAttribute("class", "btn btn-marron mt-4 w-75 ms-auto d-block disabled");
        } else {
            btnComprar.setAttribute("class", "btn btn-marron mt-4 w-75 ms-auto d-block");
            btnComprar.addEventListener("click", () => {
                this.closeCarritoModal();
                this.openCheckoutModal();

            });
        }


        totalCol.append(totalItemsModal, totalPriceModal);
        btnCol.append(btnComprar);
        totalRow.append(totalCol, btnCol);
        totalContainer.append(totalRow);

        // Boton borrar todo

        const btnBorrar = document.querySelector(".btn-borrar-todo");

        if (this.totalCount <= 0) {
            btnBorrar.setAttribute("class", "btn btn-danger btn-borrar-todo disabled");
        } else {
            btnBorrar.setAttribute("class", "btn btn-danger btn-borrar-todo");
        }

        document.querySelector(".modal-carrito-body").append(list, totalContainer);

    }

    // Creamos el mini-carrito que sigue en el body

    drawMiniCarrito() {

        document.querySelector("#carrito").replaceChildren();

        const carritoMiniContainer = document.createElement('div');
        carritoMiniContainer.setAttribute("class", "d-flex flex-row-reverse bg-image container px-0 m4-3");

        const carritoMini = document.createElement('div');
        carritoMini.setAttribute("class", "mb-1 bg-ivory p-5 rounded-end rounded-pill");

        const items = document.createElement('p');
        items.setAttribute("class", "fs-5 mb-1 ms-5");
        items.innerText = (`${this.totalCount} ítems agregados`);

        const total = document.createElement('p');
        total.setAttribute("class", "fs-5 mb-1");
        total.innerText = (`${currencyFormat(this.totalPrice)} es el total`);

        // Boton para llamar la ventana modal del carrito

        const boton = document.createElement('button');
        boton.setAttribute("id", "open");
        boton.setAttribute("class", "btn btn-marron");
        boton.innerText = 'Ver carrito';
        boton.addEventListener("click", (e) => {
            this.openCarritoModal();

        });

        carritoMini.append(items, total, boton);
        carritoMiniContainer.append(carritoMini);
        document.querySelector("#carrito").append(carritoMiniContainer);

    }

};






