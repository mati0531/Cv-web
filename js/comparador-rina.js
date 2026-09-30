const comparadores = document.querySelectorAll('[data-comparador]');

comparadores.forEach((comparador) => {
    const rango = comparador.querySelector('.rina-comparador__rango');

    const actualizarComparador = () => {
        const posicion = `${rango.value}%`;

        comparador.style.setProperty(
            '--posicion-comparador',
            posicion
        );

        const porcentajeLogo = 100 - Number(rango.value);

        rango.setAttribute(
            'aria-valuetext',
            `${porcentajeLogo}% del logotipo terminado visible`
        );
    };

    rango.addEventListener('input', actualizarComparador);

    actualizarComparador();
});