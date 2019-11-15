'use strict';
const express = require('express');
const router = express.Router();
const connectionUrl = "mongodb+srv://#######:#######@cluster0-lf0eb.mongodb.net/test?retryWrites=true&w=majority";

router
  .get('/', (req, res) => {
    try {

      //sayfa ilk yüklendiğinde IP:PORT/api/productManagement​ servisi geliyor
      let connection = req.connection;
      connection.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("productdatabase");

        dbo.collection("product").find({}).toArray((err, data) => {
        //veriler veri tabanından çekilip anasayfaya yönlendiriliyor
          if (err) throw err;
          res.status(200).render("pages/home", {
            data: data
          });
          db.close();

        })
      })
    } catch (ex) {

      console.log(ex);
      res.status(400).send({
        "status": "error",
        "msg": "home.js /get catch : " + ex
      });
    }

  })

  .get('/api/categories', (req, res) => {
    try {
      let connection = req.connection;
      //veri tabanından kategori tablosu çekiliyor
      connection.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("productdatabase");

        dbo.collection("categories").find({}).toArray((err, data) => {

          if (err) throw err;
          res.status(200).send(data);
          db.close();

        })
      })

    } catch (ex) {
      console.log(ex);
      res.status(400).send({
        "status": "error",
        "msg": "/api/categories /get catch : " + ex
      });
    }

  })

  .post('/api/categoryManagement', (req, res) => {
    try {

      //veri tabanında yeni kategori oluşturuluyor
      let connection = req.connection;
      connection.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) {
          console.log(err)
          throw err;
        }

        var dbo = db.db("productdatabase");
        var data = req.body.newCategoryData;

        dbo.collection("categories").insert(data, (err) => {
          if (err) throw err;
          console.log("categori veri eklendi");
          db.close();
        })
      })
      res.send("database veri eklendi")

    } catch (ex) {

      console.log(ex);
      res.status(400).send({
        "status": "error",
        "msg": "/api/productManagement /post catch : " + ex
      });
    }
  })

  .get('/api/categoryManagement/delete/:categoryId', (req, res) => {
    try {
      //veri tabanında kategori silme işlemi yapılıyor
      let connection = req.connection;
      let categoryId = parseInt((req.params.categoryId).trim());
      let deleteCategory = { categorieId: categoryId }
      connection.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("productdatabase");
        dbo.collection("categories").deleteOne(deleteCategory, (err) => {
          if (err) throw err;
          db.close();
        })
      })

      res.status(200).redirect("/");
    }
    catch (ex) {
      console.log(ex);
      res.status(400).send({
        "status": "error",
        "msg": "/api/productManagement/delete /get catch : " + ex
      });
    }
  })


  .post('/api/productManagement', (req, res) => {
    try {
      //ürün yönetimi sayfasına ürün ekleme işlemi veri tabanına kaydediliyor
      let connection = req.connection;
      connection.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("productdatabase");
        var data = req.body.newProductData;
        dbo.collection("product").insert(data, (err) => {
          if (err) throw err;
          db.close();
        })
      })
      res.send("database veri eklendi")

    } catch (ex) {
      console.log(ex);
      res.status(400).send({
        "status": "error",
        "msg": "/api/productManagement /post catch : " + ex
      });
    }


  })

  .post('/api/productManagement/edit', (req, res) => {
    try {
      //ürün yönetimi sayfasında ürün bilgileri düzenleme işlemi veri tabınına kaydediliyor
      let connection = req.connection;
      connection.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("productdatabase");
        var newData = {
          $set: {
            productName: req.body.editProductData[0].productName,
            productImage: req.body.editProductData[0].productImage,
            productPiece: req.body.editProductData[0].productPiece,
            productPrice: req.body.editProductData[0].productPrice,
            productCategoryName: req.body.editProductData[0].productCategoryName
          }
        };
        var id = (req.body.id).trim();
        dbo.collection("product").updateOne({ productId: parseInt(id) }, newData, (err) => {
          if (err) throw err;
          db.close();
        })
      })
      res.send("database veri eklendi")

    } catch (ex) {
      console.log(ex);
      res.status(400).send({
        "status": "error",
        "msg": "/api/productManagement /post catch : " + ex
      });
    }
  })

  .get('/api/productManagement/delete/:dataId', (req, res) => {
    try {
      //veri tabanında ürün silme işlemleri gerçekleştiriliyor
      let connection = req.connection;
      let productId = (req.params.dataId).trim();
      let deleteProduct = { productId: parseInt(productId) }
      connection.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("productdatabase");
        dbo.collection("product").deleteOne(deleteProduct, (err) => {
          if (err) throw err;
          db.close();
        })
      })

      res.status(200).redirect("/");
    }
    catch (ex) {
      console.log(ex);
      res.status(400).send({
        "status": "error",
        "msg": "/api/productManagement/delete /get catch : " + ex
      });
    }
  })



module.exports = router;