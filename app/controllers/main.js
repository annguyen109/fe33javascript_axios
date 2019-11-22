function getEle(id){
    return document.getElementById(id);
}

var nguoiDungService = new NguoiDungService();
getListUser();

getEle("btnThemNguoiDung").addEventListener("click" ,function(){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";


    var footer = `
        <button class="btn btn-primary" onclick="AddNguoiDung()">Thêm</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});




//Them Nguoi Dung
function AddNguoiDung(){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    console.log(nguoiDung);
    nguoiDungService.ThemNguoiDung(nguoiDung)
    .then(function(result){
        // location.reload();
        getListUser();
        alert("Them thanh cong");
    })
    .catch(function(errors){
        console.log(errors);
    })

}


//Xoa nguoi dung
function Delete(id){
    nguoiDungService.Delete(id)
    .then(function(result){
        getListUser();
        alert("Xoa thanh cong");

    })
    .catch(function(erorrs){
        console.log(erorrs);
    })

};


//Sua nguoi dung
function Edit(id){
    console.log(id);
    document.getElementsByClassName("modal-title")[0].innerHTML = "Cập Nhật Người Dùng";
    var footer = `
        <button class="btn btn-primary" onclick="capNhatNguoiDung(${id})">Cập nhật</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    nguoiDungService.layThongTinND(id)
    .then(function(result){
        console.log(result.data);
        getEle("TaiKhoan").value = result.data.taiKhoan;
        getEle("HoTen").value = result.data.hoTen;
        getEle("MatKhau").value = result.data.matKhau;
        getEle("Email").value = result.data.email;
        getEle("SoDienThoai").value = result.data.soDT;
        getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;

    })
    .catch(function(errors){
        console.log(errors);
    });


}


//Cap nhat Nguoi dung
function capNhatNguoiDung(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var user = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    console.log(user);


    nguoiDungService.capNhatNguoiDung(id, user)
    .then(function(result){
        getListUser();
        alert("Cap nhat nguoi dung thanh cong!");

    })
    .catch(function(errors){
        console.log(errors);
    })
    ;

}


/**
 * Tim kiem nguoi dung
 */
getEle("txtSearch").addEventListener("keyup", function(){
    var chuoiTimKiem = getEle("txtSearch").value;

    var searchND = getLocalStorage();
    var mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, searchND);
    renderTable(mangTimKiem);
    



});


function setLocalStorage(dsNguoiDung){
    localStorage.setItem("DSND", JSON.stringify(dsNguoiDung));
}
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("DSND"));
}
//lay data
function getListUser(){
    nguoiDungService.layDSNguoiDung()
    
    .then(function(result){
        renderTable(result.data);

        //Luu danh sach xuong Local
        getLocalStorage(result.data);
    })
    .catch(function(errors){
        console.log(errors);
    });;
    
}



//tao bang hien thi
function renderTable(mangNguoiDung){
    var tbody = getEle("tblDanhSachNguoiDung");
    var contentHTML = "";

    mangNguoiDung.map(function(item, index){

        
        contentHTML += `<tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.soDT}</td>
            <td>${item.maLoaiNguoiDung}</td>
            <td>
                <button class="btn btn-info" onclick="Edit(${item.id})"data-toggle="modal" data-target="#myModal">Sửa</button>
                <button class="btn btn-danger" onclick="Delete(${item.id})">Xóa</button>

            
            </td>
        
        </tr>`
    });
    tbody.innerHTML = contentHTML;

}
