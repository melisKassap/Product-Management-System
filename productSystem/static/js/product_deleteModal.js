let product_deleteModal= {
 

  // ürün yönetimi sayfasında ürün silme işlemleri için açılan modal
  deleteProduct: (id) => {
    let dataId = id;

    let html = ``;


    html += `<i class="close icon"></i>`;
    html += `<div class="header"> Warning </div>`;
    html += `<div class="image content">`;
    html += `    <div class="description">
                    <p>Are you want to delete? </p>`;
    html += `    </div>`;
    html += `<div class="actions">`;
    html += `     <div class="ui black deny button noDeleteData">
                     No
                  </div>`;
    html += `     <div class="ui positive right labeled icon button yesDeleteData">
                     Yes
                  </div>`;
    html += `</div>`;


    $(html).appendTo("#deleteProduct");


     //veriyi silme işlemi yapıyor
    $(".yesDeleteData").on("click", ()=>{
    
     if(dataId != null){
      window.location = "/api/productManagement/delete/" + dataId;
     }
      
    })

    
  }

}