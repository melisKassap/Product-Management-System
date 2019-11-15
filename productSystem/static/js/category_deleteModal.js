let category_deleteModal = {
  categoryDelete : (id)=>{

    //kategori yönetiminde veri silme işlemleri için açılan modal
    let categoryId = id;
    let html = ``;


    html += `<i class="close icon"></i>`;
    html += `<div class="header"> Warning </div>`;
    html += `<div class="image content">`;
    html += `    <div class="description">
                    <p>Are you want to delete category? </p>`;
    html += `    </div>`;
    html += `<div class="actions">`;
    html += `     <div class="ui black deny button noDeleteCategory">
                     No
                  </div>`;
    html += `     <div class="ui positive right labeled icon button yesDeleteCategory">
                     Yes
                  </div>`;
    html += `</div>`;


    $(html).appendTo("#deleteCategory");

    //veriyi silme işlemi yapıyor
    $(".yesDeleteCategory").on("click", ()=>{
     
     if(categoryId != null){
      window.location = "/api/categoryManagement/delete/" + categoryId;
     }
      
    })

  }
  
}