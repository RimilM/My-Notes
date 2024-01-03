console.log("welcome to the notes app");
 showNotes();
let addbtn = document.getElementById('addbtn');

addbtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addtxt");
  let notes = localStorage.getItem("notes");

  /*text Notes we recive form the web server is always a string.  by using JSON.parse()  data become a javascript object.
      In this case we are using object array. */

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  //we push text in object array
  notesObj.push(addTxt.value);

  //update local storage
  localStorage.setItem("notes", JSON.stringify(notesObj));

  //make textarea  blank after you have push the text in obj
  addTxt.value = "";
  console.log(notesObj);
   showNotes();
})






//fetching from local storage and showing the notes
function showNotes() {
  let notes = localStorage.getItem("notes");

  /*text Notes we recive form the web server is always a string.  by using JSON.parse()  data become a javascript object.
    In this case we are using object array. */

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
   

  //displaying in the notes section
  notesObj.forEach(function(element, index) {
    html += ` <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
                 <div class="card-body">
                  <h5 class="card-title">Notes ${index+1}</h5>
                  <p class="card-text"> ${element} </p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Text</button>
                 </div>
             </div>`;
  });

   // if their no notes then we have provide a default notes
  let notesEle= document.getElementById('notes');
     if(notesObj.length!= 0)
     {
       notesEle.innerHTML= html;
     }
     else
     {
        notesEle.innerHTML=`Nothing to show "USE ADD NOTES"`;
     }

}





//Function to delete the notes
function  deleteNote(index){
     console.log('i am deleting note',index);

     let notes = localStorage.getItem("notes");

  /*text Notes we recive form the web server is always a string.  by using JSON.parse()  data become a javascript object.
    In this case we are using object array. */

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  } 
    
    notesObj.splice(index,1);
    //we have to again update a local storage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    
    showNotes();


}



//Serach Input area
let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){

     let inputVal=search.value.toLowerCase() ;
  //  console.log('Input event fired',inputVal);

    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
             let cardTxt= element.getElementsByTagName("p")[0].innerText;

             if(cardTxt.includes(inputVal))
             {
                element.style.display="block";
             }
             else
             {
                element.style.display="none";
             }

    })
      


})