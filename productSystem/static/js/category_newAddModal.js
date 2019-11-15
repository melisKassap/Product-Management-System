let category_newAddModal = {
  id: null,

  //kategori yönetimine yeni veri ekleme işlemleri için açılan modal
  categoryAdd: (categorylastElementId) => {


    let html = ``;


    html += `<div class="ui middle aligned center aligned grid">`;
    html += `   <div class="column">`;
    html += `     <h2 class="ui blue image header">`;
    html += `         <div class="content">New Category Add</div>`;
    html += `     </h2>`;
    html += `     <form class="ui large form">`;
    html += `         <div class="ui  segment">`;
    html += `             <div class="field">`;
    html += `                 <label>Category Name</label>`;
    html += `                 <div class="ui left icon input">`;
    html += `                   <input id="categoryName" type="string" name="categoryName" placeholder="Category Name">`;
    html += `                 </div>`;
    html += `             </div>`;
    html += `            <div class="ui fluid large primary submit button" id="newCategorySave">Save</div>`;
    html += `         </div>`;
    html += `     </form>`;
    html += `   </div>`;
    html += `</div>`;



    $(html).appendTo(".newCategory #newCategoryModal");


    //kategori yönetimine yeni veri kaydetme işlemleri
    $("#newCategorySave").on("click", () => {

      //son kategori verisinin id'sini 1 artırıyor
      category_newAddModal.id = categorylastElementId + 1;

      //veri tabanı işlemlerini çağırıyor
      category_newAddModal.sendNewCategory(category_newAddModal.id);
    })

  },

  sendNewCategory: (id) => {

    newCategoryData = [{
      categorieId: parseInt(id),
      categorieName: $("#categoryName").val(),
    }]

    // veri tabınına yönlendirilmeden önce sorguya giriyor 
    //dönen değer true ise sunucuya gönderilip veri tabanı işlemleri yapılıyor   
    if (category_newAddModal.validator(newCategoryData) == true) {

      axios.post("http://localhost:3001/api/categoryManagement", {
        newCategoryData: newCategoryData
      })

        .then((data) => {

          console.log(data.data)
          console.log(data.status)

          window.location = window.location;

        })
        .catch((err) => {
          console.log(err);
        })
    }
  },

  //gönderilecek veri sorgudan geçiyor
  validator: (newCategoryData) => {
    for (let i = 0; i < newCategoryData.length; i++) {

      if (typeof (newCategoryData[i].categorieId) != "number" ||
        typeof (newCategoryData[i].categorieName) != "string") {

        console.log("type err");
        return false;
      }

      if (newCategoryData[i].categorieId == NaN ||
        newCategoryData[i].categorieName.length < 3) {
        console.log("null");
        return false;
      }

      else {
        console.log("true..")
        return true;
      }

    }
  }

}