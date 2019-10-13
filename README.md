# Inspect

Este es un proyecto personal con el que queria generar un Bookmarlet sensillo para ejecutar cuando lo necesite en Google Chrome de Android, utilizo: https://www.jsdelivr.com para que el script funcione correctamente con el siguiente Bookmarklet:

javascript:(function (d) {let s=d.body.appendChild(d.createElement('script'));s.onerror=(e)=>{alert("Error!,\nEjecutar el Script Completo, no el Bookmarlet");e.target.remove()};s.src='https://cdn.jsdelivr.net/gh/YBaronL/Inspect/script.js';})(document);

Hay Paginas que tienen "Content Security Policy directive", lo que previene que se ejecute el script, por eso esta la alerta para que indique cuando debo utilizar el Script Completo

Como en el Celular (Android) solo utilizo Google Chrome, no se tiene pensada ninguna funcionalidad "cross browser".
