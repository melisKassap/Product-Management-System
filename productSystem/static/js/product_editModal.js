let product_editModal = {

  //ürün yönetimi sayfasında veri düzenleme işlemleri için çağrılan modal

  editModal: (data, id, categoryData) => {
    
    let html = ``;

    for (let i = 0; i < data.length; i++) {
      if (data[i].productId == id) {


        html += `<div class="ui middle aligned center aligned grid">`;
        html += `   <div class="column">`;
        html += `     <h2 class="ui blue image header">`;
        html += `         <div class="content">New Product Edit</div>`;
        html += `     </h2>`;
        html += `     <form class="ui large form">`;
        html += `         <div class="ui  segment">`;
        html += `             <div class="field">`;
        html += `                 <label>Product Name</label>`;
        html += `                 <div class="ui left icon input">`;
        html += `                   <input id="editproductName" type="string" name="productName" value="${data[i].productName}">`;
        html += `                 </div>`;
        html += `             </div>`;
        html += `            <div class="field">`;
        html += `                 <label>Product Image Link</label>`;
        html += `                 <div class="ui left icon input">`;
        html += `                   <input id="editproductImage" type="string" name="productImage" value="${data[i].productImage}">`;
        html += `                 </div>`;
        html += `            </div>`;
        html += `            <div class="field">`;
        html += `                 <label>Product Price</label>`;
        html += `                 <div class="ui left icon input">`;
        html += `                   <input id="editproductPrice" type="number" name="productPrice" min="1" value="${data[i].productPrice}">`;
        html += `                 </div>`;
        html += `            </div>`;
        html += `            <div class="field">`;
        html += `                 <label>Product Piece</label>`;
        html += `                 <div class="ui left icon input">`;
        html += `                   <input id="editproductPiece" type="number" name="productPiece"  min="0" value="${data[i].productPiece}">`;
        html += `                 </div>`;
        html += `            </div>`;
        html += `            <div class="field">`;
        html += `                 <label>Category</label>`;
        
        html += `               <select id="categorySelect">`;

        categoryData.forEach(category => {
          html += `              <option value="${category.categorieName}">${category.categorieName}</option>`;
        })
        html += `            </select>`;
        html += `            </div>`;
        html += `            <div class="ui fluid large primary submit button" id="editProductSave">Update</div>`;
        html += `         </div>`;
        html += `     </form>`;
        html += `   </div>`;
        html += `</div>`;

      }
    }
    $(html).appendTo("#editProductModal");

    //veri güncelleme işlemleri
    $("#editProductSave").on("click", () => {
      product_editModal.editSaveProduct(id);
    })
  },

  editSaveProduct: (id) => {
    editProductData = [{
      productId: parseInt(id),
      productName: $("#editproductName").val(),
      productImage: $("#editproductImage").val(),
      productPiece: parseInt($("#editproductPiece").val()),
      productPrice: parseInt($("#editproductPrice").val()),
      productCategoryName: $("#categorySelect").val()
    }]

    // veri tabınına yönlendirilmeden önce sorguya giriyor 
    //dönen değer true ise sunucuya gönderilip veri tabanı işlemleri yapılıyor 
    if (product_editModal.validator(editProductData) == true) {

      axios.post("http://localhost:3001/api/productManagement/edit", {
        editProductData: editProductData,
        id: id
      })

        .then((data) => {
          window.location = window.location.href;
          //kayıt başarılı popup ekle yada onun gibi bir şey
          //ekleme pencerini kapat
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },

  //gönderilecek veri sorgudan geçiyor
  validator: (editProductData) => {
    for (let i = 0; i < editProductData.length; i++) {

      if (typeof (editProductData[i].productId) != "number" ||
        typeof (editProductData[i].productName) != "string" ||
        typeof (editProductData[i].productImage) != "string" ||
        typeof (editProductData[i].productPrice) != "number" ||
        typeof (editProductData[i].productPiece) != "number") {

        return false;
      }

      if (editProductData[i].productId == NaN ||
        editProductData[i].productName.length < 3 ||
        editProductData[i].productImage.length < 3 ||
        editProductData[i].productPrice == NaN ||
        editProductData[i].productPiece == NaN) {
        
        return false;
      }

      else {
        
        return true;
      }

    }
  }
}