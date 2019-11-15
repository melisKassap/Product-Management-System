let product_newAddModal = {
  id: null,

  //ürün yönetimi sayfasında yeni ürün ekleme işlemleri için çağrılan modal
  newProductModal: (lastElementId, categoryName) => {
    let html = ``;


    html += `<div class="ui middle aligned center aligned grid">`;
    html += `   <div class="column">`;
    html += `     <h2 class="ui blue image header">`;
    html += `         <div class="content">New Product Add</div>`;
    html += `     </h2>`;
    html += `     <form class="ui large form">`;
    html += `         <div class="ui  segment">`;
    html += `             <div class="field">`;
    html += `                 <label>Product Name</label>`;
    html += `                 <div class="ui left icon input">`;
    html += `                   <input id="productName" type="string" name="productName" placeholder="Product Name">`;
    html += `                 </div>`;
    html += `             </div>`;
    html += `            <div class="field">`;
    html += `                 <label>Product Image Link</label>`;
    html += `                 <div class="ui left icon input">`;
    html += `                   <input id="productImage" type="string" name="productImage" placeholder="Product Image Link">`;
    html += `                 </div>`;
    html += `            </div>`;
    html += `            <div class="field">`;
    html += `                 <label>Product Price</label>`;
    html += `                 <div class="ui left icon input">`;
    html += `                   <input id="productPrice" type="number" name="productPrice" min="1" placeholder="Product Price">`;
    html += `                 </div>`;
    html += `            </div>`;
    html += `            <div class="field">`;
    html += `                 <label>Product Piece</label>`;
    html += `                 <div class="ui left icon input">`;
    html += `                   <input id="productPiece" type="number" name="productPiece"  min="0" placeholder="Product Piece">`;
    html += `                 </div>`;
    html += `            </div>`;

    html += `            <div class="field">`;
    html += `                 <label>Category</label>`;
    html += `               <select id="categorySelect">`;

    categoryName.forEach(category => {
      html += `                 <option value="${category.categorieName}">${category.categorieName}</option>`;
    })
    html += `               </select>`;
    html += `            </div>`;
    html += `            <div class="ui fluid large primary submit button" id="newProductSave">Save</div>`;
    html += `         </div>`;
    html += `     </form>`;
    html += `   </div>`;
    html += `</div>`;



    $(html).appendTo(".addProduct #newProductModal");

  //ürün yönetimine yeni veri kaydetme işlemleri
    $("#newProductSave").on("click", () => {
       //son ürün yoksa id 1 yapılıyor
      if(lastElementId == NaN || lastElementId == 0){
        product_newAddModal.id = 1;
        product_newAddModal.sendNewProduct(product_newAddModal.id);
      }
      else{
         //son ürün varsa id'sini 1 artırıyor
        product_newAddModal.id = lastElementId + 1;
        product_newAddModal.sendNewProduct(product_newAddModal.id);
      }
      
    })
  },

  sendNewProduct: (id) => {
    newProductData = [{
      productId: parseInt(id),
      productName: $("#productName").val(),
      productImage: $("#productImage").val(),
      productPrice: parseInt($("#productPrice").val()),
      productPiece: parseInt($("#productPiece").val()),
      productCategoryName: $("#categorySelect").val()
    }]

    // veri tabınına yönlendirilmeden önce sorguya giriyor 
    //dönen değer true ise sunucuya gönderilip veri tabanı işlemleri yapılıyor 
    if (product_newAddModal.validator(newProductData) == true) {

      axios.post("http://localhost:3001/api/productManagement", {
        newProductData: newProductData
      })

        .then((data) => {
          window.location = window.location.href;
         
        })
        .catch((err) => {
         
          console.log(err);
        })
    }



  },

  //gönderilecek veri sorgudan geçiyor
  validator: (newProductData) => {

    for (let i = 0; i < newProductData.length; i++) {

      if (typeof (newProductData[i].productId) != "number" ||
        typeof (newProductData[i].productName) != "string" ||
        typeof (newProductData[i].productImage) != "string" ||
        typeof (newProductData[i].productPrice) != "number" ||
        typeof (newProductData[i].productPiece) != "number") {

        return false;
      }

      if (newProductData[i].productId == NaN ||
        newProductData[i].productName.length < 3 ||
        newProductData[i].productImage.length < 3 ||
        newProductData[i].productPrice == NaN ||
        newProductData[i].productPiece == NaN) {
       
        return false;
      }

      else {
     
        return true;
      }

    }
  }

}