(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{783:function(t,d,e){var content=e(804);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(21).default)("c07970b8",content,!0,{sourceMap:!1})},803:function(t,d,e){"use strict";e(783)},804:function(t,d,e){var o=e(20)((function(i){return i[1]}));o.push([t.i,".btn-add{border-radius:5px;position:absolute;right:300px;top:50px}",""]),o.locals={},t.exports=o},956:function(t,d,e){"use strict";e.r(d);var o=e(748),n=e(79),l={components:{Table:o.default,Button:n.default},computed:{isEnglish:function(){return this.$store.state.isEnglish}},mounted:function(){var t=e(272);localStorage.getItem("token")&&(this.authority=t.decode(localStorage.getItem("token")).role[0].authority),"admin"!==this.authority&&this.$router.push("/error")},data:function(){return{hideModalAdd:!1,adminCheckProduct:"adminCheckProduct",hideModalEdit:!1,quantityEdit:1,costumeIdEdit:1,sizeEdit:"",authority:null}},methods:{addInvetery:function(){this.hideModalAdd=!0},openModalEdit:function(t,d,e){this.hideModalEdit=!0,this.quantityEdit=d,this.costumeIdEdit=t,this.sizeEdit=e}}},r=(e(803),e(47)),component=Object(r.a)(l,(function(){var t=this,d=t._self._c;return d("div",[d("div",{staticClass:"button__add"},[d("Button",{staticClass:"btn-add",attrs:{type:"nav"},on:{click:t.addInvetery}},[t.isEnglish?d("span",[t._v("Add")]):d("span",[t._v("Thêm")])])],1),t._v(" "),d("Table",{staticClass:"tbl",attrs:{type:t.adminCheckProduct},on:{hidemodaledit:t.openModalEdit}}),t._v(" "),t.hideModalAdd?d("Modal",{attrs:{type:"modal-add"}}):t._e(),t._v(" "),t.hideModalEdit?d("Modal",{attrs:{quantityEdit:t.quantityEdit,costumeIdEdit:t.costumeIdEdit,sizeEdit:t.sizeEdit,type:"modal-edit"}}):t._e()],1)}),[],!1,null,null,null);d.default=component.exports;installComponents(component,{Button:e(79).default,Table:e(748).default,Modal:e(749).default})}}]);