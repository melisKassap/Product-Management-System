let home = {

  productlastElementId: null,
  categorylastElementId: null,
  categoryList: [],
  selectedCategory: new Array(),
  productData: null,

  initEvents: (data) => {
    if (data == null) {
      //veri tabanında ürün yönetimi tablosu dolu mu kontrol ediliyor
      alert("not found data..");

    } else {

      home.getCategoryData();
      home.fields._productManagerField(data);

      $('.menu')

        .on("click", "#btnProductManager", (() => {
          //ürün yönetimi sayfasına yönlendiriyor, 
          //veri tabanından gelen ürün bilgilerini  yolluyor
          $("#template").empty();
          home.fields._productManagerField(data);

        }))

        .on("click", "#btnCategoryManager", (() => {
          //kategori yönetim sayfasına yönlendiriyor
          //kategori bilgilerini yolluyor

          $("#template").empty();
          home.fields._categoryManagerField(home.categoryList[0]);

        }))

        .on("click", "#btnProductView", ((e) => {
          //ürün görüntüleme sayfasına yönlendiriyor

          $("#template").empty();
          home.fields._productView();

          //kategori seçme filtremeleme işlemleri  için dropdown ayarları
          $('.ui.dropdown').dropdown({
            action: 'nothing'
          });
          $('.ui.checkbox').checkbox();

          //kategori seçme işlemleri fonksiyonunu çağırıyor
          home.listProductView();

        }))

      $("#template")
        .on("click", ".trash", ((e) => {
          //ürün yönetimi sayfasına veri silme işlemleri için
          //silinecek verinin id sini gönderip deleteModal çağrılıyor
          product_deleteModal.deleteProduct(e.target.id);
          $("#deleteProduct").modal("show");
        }))

        .on("click", ".edit", ((e) => {
          //ürün yönetimi sayfasına veri düzenleme işlemleri için
          //düzenlenecek verinin id sini gönderip ProductModal çağrılıyor
          //düzenlenecek verinin datası yollanıyor
          //düzenlerken kategori ayarı için kategori listesi yollanıyor
          product_editModal.editModal(data, e.target.id, home.categoryList[0]);
          $("#editProductModal").modal("show");
        }))

        .on("click", ".newProduct", (() => {
          //ürün yönetimi sayfasına yeni veri ekleme işlemleri için
          //eklenecek veri için tablodaki son elemanın id sini gönderip newProductModal çağrılıyor
          product_newAddModal.newProductModal(home.productlastElementId, home.categoryList[0]);
          $('#newProductModal').modal('show');
        }))

        .on("click", ".categoryTrash", ((e) => {
          //kategori yönetimi sayfasında veri silme işlemleri için
          //silinecek verinin id sini gönderip categoryDelete çağrılıyor
          category_deleteModal.categoryDelete(e.target.id);
          $("#deleteCategory").modal("show");
        }))

        .on("click", ".addCategory", (() => {
          //kategori yönetimi sayfasına yeni veri ekleme işlemleri için
          //eklenecek veri için tablodaki son elemanın id sini gönderip categoryAdd çağrılıyor
          category_newAddModal.categoryAdd(home.categorylastElementId);
          $("#newCategoryModal").modal("show");
        }))
    }
  },


  getCategoryData: () => {
    //güncel olarak kategori tablosundaki kategori verilerini categoryList değişkeninde tutuyor
    axios.get("http://localhost:3001/api/categories")
      .then((data) => {
        home.categoryList.push(data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  },

  listProductView: () => {
    $(".lists").click(function () {
      //dropdown da kategori seçilmişse selectedCategory içerisine atıyor
      $(".checkboxMenu input[type=checkbox]:checked").each(function () {
        home.selectedCategory.push(this.value);
      });

      //selectedCategory verisi varsa
      if (home.selectedCategory.length > 0) {
        var newSelectText = home.selectedCategory.join(",");

        //dropdown içerisine yazıyor
        $("span.selectedHeader").text(newSelectText);

        //ürün görüntüleme sayfasını çağırıyor
        //selectedCategory verisi dolu olacağı için filtreleme işlemi yapacak
        home.fields._productView();
      }
    });
  },



  fields: {
    _productManagerField: (d) => {

      //veri tabanından gelen ürün bilgilerine göre ürün yönetimi tablosunu oluşturuyor
      let data = d;

      let html = ``;
      html += `<div class="addProduct">`;
      html += `    <button class="ui button newProduct">New Product</button>`;
      html += `    <div class="ui modal test" id="newProductModal">`;

      html += `    </div>`;
      html += `</div>`;

      data.forEach(data => {

        html += `<div class="twelve wide stretched column" id="${data.productId}">`;
        html += `  <div class="ui segment">`;
        html += `    <table class="ui very basic collapsing celled table">`;
        html += `          <thead>`;
        html += `            <tr>`;
        html += `              <th>Product Id</th>`;
        html += `              <th>Product Name</th>`;
        html += `              <th>Product Image</th>`;
        html += `              <th>Product Price</th>`;
        html += `              <th>Product Piece</th>`;
        html += `              <th>Product Category Name</th>`;
        html += `            </tr>`;
        html += `          </thead>`;
        html += `          <tbody>`;
        html += `              <tr>`;
        html += `                  <td class="tdid">
                                    ${data.productId}
                                  </td>`;
        html += `                  <td class="tdname">
                                    ${data.productName}
                                  </td>`;
        html += `                  <td class="tdimage">`;
        html += `                      <h4 class="ui image header">
                                          <img src=${data.productImage}> 
                                      </h4>`;
        html += `                  </td>`;
        html += `                 <td class="tdPrice">
                                    ${data.productPrice}
                                   </td>`;
        html += `                  <td class="tdPiece">
                                    ${data.productPiece}
                                    </td>`;
        html += `                  <td class="tdCategory">
                                    ${data.productCategoryName}
                                    </td>`;
        html += `                  <td>`;
        html += `                    <i class="trash alternate icon" id="${data.productId}"></i>`;
        html += `                   <div class="ui modal" id="deleteProduct">`;

        html += `                      </div>`;
        html += `                  </td>`;
        html += `                  <td>`;
        html += `                    <i class="edit icon" id="${data.productId}"></i>`;
        html += `                  <div class="ui modal test" id="editProductModal">`;

        html += `                  </div>`;
        html += `                  </td>`;
        html += `              </tr>`;
        html += `          </tbody>`;
        html += `    </table>`;
        html += `  </div>`;
        html += `</div>
     `;
        //son ürünün elemanın id'sini tutuyor
        home.productlastElementId = data.productId;

      });



      $(html).appendTo("#template");


    },

    _categoryManagerField: (d = {}) => {

      //veri tabanından gelen kategori bilgilerine göre kategori yönetimi tablosu oluşturuyor
      let categoryData = d;

      let html = ``;

      html += `<div class="newCategory">`;
      html += `    <button class="ui button addCategory">New Category</button>`;
      html += `    <div class="ui modal test" id="newCategoryModal">`;

      html += `    </div>`;
      html += `</div>`;


      categoryData.forEach(data => {

        html += `<div class="twelve wide stretched column" id="${data.categorieId}">`;
        html += `  <div class="ui segment">`;
        html += `    <table class="ui very basic collapsing celled table">`;
        html += `    <thead>`;
        html += `      <tr>`;
        html += `        <th>Categorie Id</th>`;
        html += `        <th>Categorie Name</th>`;
        html += `      </tr>`;
        html += `    </thead>`;
        html += `      <tbody>`;
        html += `        <tr>`;
        html += `            <td class="tdid">
                              ${data.categorieId}
                          </td>`;
        html += `            <td class="tdname">
                              ${data.categorieName}
                          </td>`;
        html += `            <td>`;
        html += `              <i class="trash alternate icon categoryTrash" id="${data.categorieId}"></i>`;
        html += `                   <div class="ui modal" id="deleteCategory">`;

        html += `                   </div>`;
        html += `            </td>`;

        html += `        </tr>`;
        html += `      </tbody>`;
        html += `    </table>`;
        html += `  </div>`;
        html += `</div>`;

        //son kategori elemanın id'sini tutuyor
        home.categorylastElementId = data.categorieId;
      });
      $(html).appendTo("#template");
    },

    _productView: () => {

      //veri tabanından gelen kategori ve ürün bilgilerine göre 
      //ürün görüntüleme sayfası oluşturuyor
      var productDataList = home.productData; //ürün verileri
      var _categoryDataList = home.categoryList[0]; //kategori verileri

      let html = ``;
      html += `<div class="selectCategories">`;
      html += `   <div class="ui basic right labeled dropdown icon button">`;
      html += `       <i class="dropdown icon"></i>`;
      html += `       <span class="ui tiny header selectedHeader">Select Category</span>`;
      html += `       <div class="menu">`;
      html += `         <div class="ui icon search input">`;
      html += `           <i class="search icon"></i>`;
      html += `           <input type="text" name="Search" placeholder="Search&hellip;">`;
      html += `         </div>`;
      html += `       <div class="scrolling menu checkboxMenu">`;

      //kategori seçme işlemi için verileri döndürüyor
      _categoryDataList.forEach(category => {
        html += `      <div class="ui item checkbox" data-value="item1">`;
        html += `         <input type="checkbox" value="${category.categorieName}" name="item1" tabindex="${category.categorieId}">`;
        html += `         <label>${category.categorieName}</label>`;
        html += `      </div>`;
      })
      html += `   </div>`;
      html += `</div>`;

      html += `</div>`;
      html += `<button class="ui button lists">Lists</button>`;


      //eğer kategori seçilmişse

      if (home.selectedCategory.length > 0) {
        $("#template").empty();

        for (let i = 0; i < home.selectedCategory.length; i++) {

          for (let j = 0; j < productDataList.length; j++) {
            //filtreleme yapmak için kategori tablosundaki kategori ismi ve
            // ürün tablosundaki ürün ismi karşılaştırılıyor
            if (home.selectedCategory[i] == productDataList[j].productCategoryName) {

              //seçili olan isimlere göre tablo listeleniyor
              let html = ``;

              html += `<div class="twelve wide stretched column">`;
              html += `  <div class="ui segment">`;
              html += `    <table class="ui very basic collapsing celled table">`;
              html += `          <thead>`;
              html += `            <tr>`;
              html += `              <th>Ppoduct Id</th>`;
              html += `              <th>Ppoduct Name</th>`;
              html += `              <th>Ppoduct Image</th>`;
              html += `              <th>Product Price</th>`;
              html += `              <th>Product Piece</th>`;
              html += `              <th>Product Category Name</th>`;
              html += `            </tr>`;
              html += `          </thead>`;
              html += `          <tbody>`;
              html += `              <tr>`;
              html += `                  <td class="tdid">
                                      ${productDataList[j].productId}
                                    </td>`;
              html += `                  <td class="tdname">
                                      ${productDataList[j].productName}
                                    </td>`;

              html += `                  <td class="tdimage">`;
              html += `                      <h4 class="ui image header">
                                            <img src=${productDataList[j].productImage}> 
                                        </h4>`;
              html += `                  </td>`;
              html += `                  <td class="tdPrice">
                                      ${productDataList[j].productPrice}
                                     </td>`;
              html += `                  <td class="tdPiece">
                                      ${productDataList[j].productPiece}
                                     </td>`;
              html += `                  <td class="tdCategory">
                                     ${productDataList[j].productCategoryName}
                                     </td>`;
              html += `              </tr>`;
              html += `          </tbody>`;
              html += `    </table>`;
              html += `  </div>`;
              html += `</div>`;


              $(html).appendTo("#template");
            }
          }
        }
      } else {
        //eğer kategori seçilmişse tüm ürün bilgilerine göre tablo listeleniyor

        productDataList.forEach(product => {

          html += `<div class="twelve wide stretched column">`;
          html += `  <div class="ui segment">`;
          html += `    <table class="ui very basic collapsing celled table">`;
          html += `          <thead>`;
          html += `            <tr>`;
          html += `              <th>Ppoduct Id</th>`;
          html += `              <th>Ppoduct Name</th>`;
          html += `              <th>Ppoduct Image</th>`;
          html += `              <th>Product Price</th>`;
          html += `              <th>Product Piece</th>`;
          html += `              <th>Product Category Name</th>`;
          html += `            </tr>`;
          html += `          </thead>`;
          html += `          <tbody>`;
          html += `              <tr>`;
          html += `                  <td class="tdid">
                                      ${product.productId}
                                    </td>`;
          html += `                  <td class="tdname">
                                      ${product.productName}
                                    </td>`;

          html += `                  <td class="tdimage">`;
          html += `                      <h4 class="ui image header">
                                            <img src=${product.productImage}> 
                                        </h4>`;
          html += `                  </td>`;
          html += `                  <td class="tdPrice">
                                      ${product.productPrice}
                                     </td>`;
          html += `                  <td class="tdPiece">
                                      ${product.productPiece}
                                     </td>`;
          html += `                  <td class="tdCategory">
                                     ${product.productCategoryName}
                                     </td>`;
          html += `              </tr>`;
          html += `          </tbody>`;
          html += `    </table>`;
          html += `  </div>`;
          html += `</div>
       `;
        });


      }
      $(html).appendTo("#template");
    }

  }
};

$(document).ready(() => {
  var socket = io();


  home.initEvents(productTemplate);
  home.productData = productTemplate;
});