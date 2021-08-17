// if (window.location.protocol === "http:"){
//     alert(" This functionality require a secure URL(https)");
// }

const ulResults = document.getElementById("results");
const btReq = document.getElementById("btReq");

btReq.addEventListener("click", getContacts);

const supported = ('contacts' in navigator && 'ContactsManager' in window);

if(supported){
    const divNotSupported = document.getElementById("notSupported");
    divNotSupported.classList.toggle('hidden' , true);
    btReq.removeAttribute('disabled');
}

async function getContacts() {

  const props = ['name', 'tel'];
  const opts = {multiple: false};

  try {
      const contacts = await navigator.contacts.select(props, opts);
      renderResults(contacts);
  } catch (ex) {
      alert(ex.toString());
  }
}

function renderResults(contacts){
   contacts.forEach(contact => {
       const lines = [];
       if( contact.name) lines.push(`<b>Name:</b> ${contact.name.join(', ')}`);
       if( contact.email) lines.push(`<b>Email:</b> ${contact.email.join(', ')}`); 
       if( contact.tel) lines.push(`<b>Telephone:</b> ${contact.tel.join(', ')}`);
       if( contact.address) {
        contact.address.forEach((address)=>{
            lines.push(`<b>Address:</b> ${JSON.stringify(address)}`); 
        });   
       }
       if( contact.icon) {
        contact.icon.forEach((icon)=>{
             const imgURL = URL.createObjectURL(icon);
             lines.push(`<b>Icon:</b> <img src="${imgURL}">`); 
         });   
      }
      lines.push(`<b>Raw:</b> <code> ${JSON.stringify(contact)}</code> `); 
      const li = document.createElement('li');
      li.innerHTML = lines.join('<br>');
      ulResults.appendChild(li);       
   });
   
   const strContacts = JSON.stringify(contacts, null, 2);
   console.log( strContacts);

}



