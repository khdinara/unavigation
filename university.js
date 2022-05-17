const Content = {};

Content["legal"] = `
    <h2>Nazarbayev University</h2>
    <p>Nazarbayev University (NU) is an autonomous research university in Nur-Sultan, the capital of Kazakhstan. Founded as a result of the initiative of the first President of Kazakhstan, Nursultan Nazarbayev in 2010 (June), it is an English-medium institution, with an international faculty and staff. The university management bodies are the Executive Board, Board of Trustees and the Supreme Board of Trustees. The Chairman of the Supreme Board of Trustees is the former President of the Republic of Kazakhstan, Nursultan Nazarbayev.
    Nazarbayev University (NU) is an autonomous research university in Nur-Sultan, the capital of Kazakhstan. Founded as a result of the initiative of the first President of Kazakhstan, Nursultan Nazarbayev in 2010 (June), it is an English-medium institution, with an international faculty and staff. The university management bodies are the Executive Board, Board of Trustees and the Supreme Board of Trustees. The Chairman of the Supreme Board of Trustees is the former President of the Republic of Kazakhstan, Nursultan Nazarbayev.
    Nazarbayev University (NU) is an autonomous research university in Nur-Sultan, the capital of Kazakhstan. Founded as a result of the initiative of the first President of Kazakhstan, Nursultan Nazarbayev in 2010 (June), it is an English-medium institution, with an international faculty and staff. The university management bodies are the Executive Board, Board of Trustees and the Supreme Board of Trustees. The Chairman of the Supreme Board of Trustees is the former President of the Republic of Kazakhstan, Nursultan Nazarbayev.
    Nazarbayev University (NU) is an autonomous research university in Nur-Sultan, the capital of Kazakhstan. Founded as a result of the initiative of the first President of Kazakhstan, Nursultan Nazarbayev in 2010 (June), it is an English-medium institution, with an international faculty and staff. The university management bodies are the Executive Board, Board of Trustees and the Supreme Board of Trustees. The Chairman of the Supreme Board of Trustees is the former President of the Republic of Kazakhstan, Nursultan Nazarbayev.
      </p>
`

window.State = {
    content: null,
    isOpen: false,
    openDialog: function(key){
        State.content = Content[key]
        State.isOpen = true;
        view()
    },
    closeDialog: function(){
        State.isOpen = false;
        view()
    }
}

function view () {
    var modalCls =  State.isOpen
        ? "modal modal-shown"
        : "modal modal-hidden"
    modal.innerHTML =  `
    <div class="${modalCls}">
      <div class="modal-content">
        <div style="text-align:right" onclick="State.closeDialog()">
          <span class="modal-close">Close</span>
        </div>
        <p>${State.content}</p>
      </div>
    </div>
  `
}

triggerModal.addEventListener("click", function (e) {
    var modal  = e.target.getAttribute("modal")
    modal && State.openDialog(modal)
});
var style = document.createElement('style');
style.innerHTML = `
  #modal{
}

.modal-shown {
  display: block;
}

.modal-hidden {
  display: none;
}

.modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(222,0,0);
    background-color: rgba(2,0,0,0.5);
}

  /* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 960px;
    position:relative;
    animation:animetop 0.4s
}

@keyframes animetop{
  from{top:-300px;opacity:0}
  to{top:0;opacity:1
  }
}

.modal-close {

  cursor: pointer;
  right:0;
}

.modal-close:hover {
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
}
  `;
document.head.appendChild(style);

