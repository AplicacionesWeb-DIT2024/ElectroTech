
let btnEliminar = document.querySelector('#btnEliminar');
let lbl_nombre = document.querySelector('#lbl_nombre');
window.setInfo = (id,modelo,nombre) => {
    btnEliminar.setAttribute('data-id',id);
    lbl_nombre.innerHTML = 'Eliminarás '+modelo+': <b>'+nombre+'</b>'
}
btnEliminar.addEventListener('click', ()=>{
    let id = btnEliminar.getAttribute('data-id');
    let form = document.querySelector('#frm_'+id);
    form.submit();
});
