window.onload = () =>{
    setTimeout(() => {
        if(document.getElementById('alerta') != null){
            document.getElementById('alerta').remove()
        }
    }, 3000);
}